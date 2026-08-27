#!/usr/bin/env node
/**
 * Ethereal Expanse build gate.
 * 1) Reject undersized versioned HTML (the v16–v29 placeholder failure mode).
 * 2) Smoke the highest real full build (>50KB): syntax + required symbols.
 *
 * Usage:
 *   node scripts/check-builds.mjs
 *   node scripts/check-builds.mjs --changed   # only files listed in CHANGED_FILES or git diff
 */
import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const MIN_FULL_BYTES = 50 * 1024;
const VERSION_RE = /^ethereal-expanse-v(\d+(?:\.\d+)*)\.html$/i;
const REQUIRED_ALWAYS = ['THREE', 'gameState', 'function animate'];
const REQUIRED_V30 = ['const sfx', 'function applyLoadedSave', 'sfx.shoot', 'sfx.unlock'];

const root = process.cwd();
const onlyChanged = process.argv.includes('--changed');

function parseVersion(name) {
  const m = name.match(VERSION_RE);
  if (!m) return null;
  return m[1].split('.').map((n) => parseInt(n, 10));
}

function cmpVer(a, b) {
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const d = (a[i] || 0) - (b[i] || 0);
    if (d) return d;
  }
  return 0;
}

function listVersionedHtml() {
  return readdirSync(root)
    .filter((n) => VERSION_RE.test(n))
    .map((name) => ({
      name,
      path: join(root, name),
      bytes: statSync(join(root, name)).size,
      version: parseVersion(name),
    }));
}

function changedVersionedHtml(all) {
  const fromEnv = (process.env.CHANGED_FILES || '')
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((p) => p.replace(/^\.\//, ''));
  if (fromEnv.length) {
    return all.filter((f) => fromEnv.includes(f.name));
  }
  try {
    const base = process.env.GITHUB_BASE_REF
      ? `origin/${process.env.GITHUB_BASE_REF}`
      : 'HEAD~1';
    const out = execSync(`git diff --name-only --diff-filter=ACMR ${base}...HEAD`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const names = new Set(out.split('\n').map((s) => s.trim()).filter(Boolean));
    return all.filter((f) => names.has(f.name));
  } catch {
    return [];
  }
}

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exitCode = 1;
}

function extractModuleJs(html) {
  const start = html.indexOf('<script type="module">');
  const end = html.lastIndexOf('</script>');
  if (start < 0 || end < 0 || end <= start) return null;
  return html.slice(start + '<script type="module">'.length, end);
}

function syntaxCheck(js, label) {
  const stub = js.replace(/import\s+\*\s+as\s+THREE\s+from\s+['"][^'"]+['"]\s*;/, 'const THREE = {};');
  const dir = mkdtempSync(join(tmpdir(), 'ee-gate-'));
  const file = join(dir, 'module.js');
  writeFileSync(file, stub);
  try {
    execSync(`node --check ${JSON.stringify(file)}`, { stdio: 'pipe' });
    console.log(`OK syntax: ${label}`);
  } catch (err) {
    fail(`syntax error in ${label}: ${err.stderr?.toString() || err.message}`);
  }
}

function smokeSymbols(html, file) {
  const missingAlways = REQUIRED_ALWAYS.filter((s) => !html.includes(s));
  if (missingAlways.length) {
    fail(`${file.name} missing core symbols: ${missingAlways.join(', ')}`);
  } else {
    console.log(`OK core symbols: ${file.name}`);
  }

  const n = file.version[0];
  const needsV30 = n >= 30 || html.includes('function applyLoadedSave') || html.includes('WEB AUDIO SFX');
  if (needsV30) {
    const missing = REQUIRED_V30.filter((s) => !html.includes(s));
    if (missing.length) {
      fail(`${file.name} missing v30 smoke symbols: ${missing.join(', ')}`);
    } else {
      console.log(`OK v30 smoke symbols (sfx, applyLoadedSave): ${file.name}`);
    }
  } else {
    console.log(`SKIP v30 API smoke on ${file.name} (pre-v30 full build)`);
  }
}

const all = listVersionedHtml();
if (!all.length) {
  fail('no ethereal-expanse-vN.html files found');
}

console.log('Versioned HTML files:');
for (const f of all.sort((a, b) => cmpVer(a.version, b.version))) {
  const tag = f.bytes >= MIN_FULL_BYTES ? 'FULL' : 'STUB';
  console.log(`  ${tag.padEnd(4)} ${String(f.bytes).padStart(8)}  ${f.name}`);
}

const full = all.filter((f) => f.bytes >= MIN_FULL_BYTES);
if (!full.length) {
  fail(`no full build >${MIN_FULL_BYTES} bytes`);
}

const canonical = full.reduce((a, b) => (cmpVer(a.version, b.version) >= 0 ? a : b));
const highestAny = all.reduce((a, b) => (cmpVer(a.version, b.version) >= 0 ? a : b));

console.log(`Canonical full build: ${canonical.name} (${canonical.bytes} bytes)`);

if (cmpVer(highestAny.version, canonical.version) > 0 && highestAny.bytes < MIN_FULL_BYTES) {
  const msg =
    `${highestAny.name} is ${highestAny.bytes} bytes (<${MIN_FULL_BYTES}), newer than canonical ${canonical.name}. ` +
    `This is the v16–v29 placeholder bug.`;
  if (onlyChanged) fail(msg);
  else console.warn(`WARN: ${msg}`);
}

const touched = changedVersionedHtml(all);
const inspect = onlyChanged ? touched : touched.length ? touched : [];
if (onlyChanged && !inspect.length) {
  console.log('No versioned HTML changed in this commit.');
}
for (const f of inspect) {
  if (f.bytes < MIN_FULL_BYTES) {
    fail(`${f.name} is ${f.bytes} bytes (<${MIN_FULL_BYTES}). Do not commit placeholder HTML.`);
  }
}

const html = readFileSync(canonical.path, 'utf8');
if (html.includes('PLACEHOLDER_REPLACE') || html.trim().length < 1000) {
  fail(`${canonical.name} looks like a placeholder, not a game`);
}
smokeSymbols(html, canonical);
const js = extractModuleJs(html);
if (!js) fail(`${canonical.name} has no module script to check`);
else syntaxCheck(js, canonical.name);

if (existsSync(join(root, 'index.html'))) {
  const idx = readFileSync(join(root, 'index.html'), 'utf8');
  if (idx.includes(highestAny.name) && highestAny.bytes < MIN_FULL_BYTES) {
    fail(`index.html points at stub ${highestAny.name}`);
  }
}

if (process.exitCode) {
  console.error('\nBuild gate failed. Ship a real >50KB ethereal-expanse-vN.html or stop bumping the version number.');
  process.exit(process.exitCode);
}
console.log('\nBuild gate passed.');
