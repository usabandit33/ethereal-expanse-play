#!/usr/bin/env node
/**
 * Headless Chromium smoke. Run after `npm install playwright` + browser install.
 */
const { createServer } = require('node:http');
const { existsSync, readdirSync, readFileSync, statSync } = require('node:fs');
const { extname, join } = require('node:path');

const MIN_FULL_BYTES = 50 * 1024;
const VERSION_RE = /^ethereal-expanse-v(\d+(?:\.\d+)*)\.html$/i;
const root = process.cwd();

const files = readdirSync(root)
  .filter((n) => VERSION_RE.test(n))
  .map((name) => ({
    name,
    bytes: statSync(join(root, name)).size,
    n: parseInt(name.match(VERSION_RE)[1], 10),
  }))
  .filter((f) => f.bytes >= MIN_FULL_BYTES)
  .sort((a, b) => a.n - b.n);

if (!files.length) {
  console.error('FAIL: no full build >50KB');
  process.exit(1);
}

const file = files[files.length - 1];
const html = readFileSync(join(root, file.name), 'utf8');
const requireSfx = file.n >= 30 || html.includes('function applyLoadedSave');
console.log(`Headless target: ${file.name} (${file.bytes} bytes) requireSfx=${requireSfx}`);

if (requireSfx) {
  for (const s of ['const sfx', 'function applyLoadedSave']) {
    if (!html.includes(s)) {
      console.error(`FAIL: ${file.name} missing ${s}`);
      process.exit(1);
    }
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
};

const server = createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\//, '');
  const fp = join(root, rel);
  if (!fp.startsWith(root) || !existsSync(fp) || statSync(fp).isDirectory()) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[extname(fp)] || 'application/octet-stream' });
  res.end(readFileSync(fp));
});

server.listen(0, '127.0.0.1', async () => {
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}/${file.name}`;
  console.log(`Serving ${url}`);
  try {
    const { chromium } = require('playwright');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('#game-canvas', { timeout: 15000 });
    const info = await page.evaluate(() => ({
      title: document.title,
      canvas: !!document.getElementById('game-canvas'),
      hasSfxText:
        document.documentElement.innerHTML.includes('function applyLoadedSave') ||
        document.documentElement.innerHTML.includes('const sfx'),
    }));
    console.log(JSON.stringify({ ...info, pageErrors: errors.slice(0, 8) }));
    await browser.close();
    server.close();
    if (!info.canvas) process.exit(2);
    if (requireSfx && !info.hasSfxText) process.exit(3);
    console.log('Headless smoke passed.');
  } catch (err) {
    console.error(err);
    server.close();
    process.exit(4);
  }
});
