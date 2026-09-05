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
  const dirs = [root, join(root, 'versions', 'builds')];
  const out = [];
  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (!VERSION_RE.test(name)) continue;
      const path = join(dir, name);
      if (!statSync(path).isFile()) continue;
      out.push({
        name,
        path,
        bytes: statSync(path).size,
        version: parseVersion(name),
        rel: dir === root ? name : join('versions', 'builds', name).replace(/\\/g, '/'),
      });
    }
  }
  return out;
}

function changedVersionedHtml(all) {
  const fromEnv = (process.env.CHANGED_FILES || '')
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((p) => p.replace(/^\.\//, ''));
  if (fromEnv.length) {
    return all.filter((f) => fromEnv.includes(f.name) || fromEnv.includes(f.rel || f.name));
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
    return all.filter((f) => names.has(f.name) || names.has(f.rel || f.name));
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
  if (start < 0) return null;
  const end = html.indexOf('</script>', start);
  if (end < 0) return null;
  return html.slice(start + '<script type="module">'.length, end);
}

function smokeFile(file) {
  const html = readFileSync(file.path, 'utf8');
  const js = extractModuleJs(html);
  if (!js) {
    fail(`${file.rel || file.name}: no <script type="module"> block`);
    return;
  }
  const dir = mkdtempSync(join(tmpdir(), 'ee-smoke-'));
  const jsPath = join(dir, 'module.js');
  writeFileSync(jsPath, js);
  try {
    execSync(`node --check ${JSON.stringify(jsPath)}`, { stdio: 'pipe' });
  } catch (e) {
    fail(`${file.rel || file.name}: node --check failed`);
    return;
  }
  for (const token of REQUIRED_ALWAYS) {
    if (!js.includes(token) && !html.includes(token)) {
      fail(`${file.rel || file.name}: missing ${token}`);
    }
  }
  const ver = file.version ? file.version[0] : 0;
  if (ver >= 30 || js.includes('const sfx') || js.includes('applyLoadedSave')) {
    for (const token of REQUIRED_V30) {
      if (!js.includes(token)) {
        fail(`${file.rel || file.name}: v30+ missing ${token}`);
      }
    }
  }
  console.log(`OK smoke ${file.rel || file.name} (${file.bytes} bytes)`);
}

const all = listVersionedHtml();
if (!all.length) {
  console.log('No ethereal-expanse-vN.html files found (root or versions/builds).');
  process.exit(0);
}

const targets = onlyChanged ? changedVersionedHtml(all) : all;
for (const f of targets) {
  if (f.bytes < MIN_FULL_BYTES) {
    fail(`${f.rel || f.name}: ${f.bytes} bytes < ${MIN_FULL_BYTES} (placeholder shell)`);
  }
}

const full = all.filter((f) => f.bytes >= MIN_FULL_BYTES).sort((a, b) => cmpVer(a.version, b.version));
if (full.length) {
  const canonical = full[full.length - 1];
  console.log(`Canonical full build: ${canonical.rel || canonical.name}`);
  smokeFile(canonical);
} else {
  fail('No full build >50KB found in root or versions/builds');
}

if (process.exitCode) process.exit(process.exitCode);
console.log('Build gate passed.');
