# Build gate

Stops undersized `ethereal-expanse-vN.html` shells from landing as "builds".

## What fails a commit

- Adding or changing `ethereal-expanse-vN.html` under **50 KB** (root or `versions/builds/`)
- Canonical full build (highest N that is actually >50 KB) failing `node --check`
- Canonical build missing `THREE` / `gameState` / `animate`
- If that build is v30+ (or contains Load/SFX): missing `const sfx` or `function applyLoadedSave`

## Paths (after reorg)

- Preferred location for builds: `versions/builds/ethereal-expanse-vN.html`
- Preferred location for changelogs: `versions/changelogs/ethereal-expanse-vN_changelog.md`
- Root `index.html` remains the GitHub Pages entry

## Local

```bash
node scripts/check-builds.mjs
CHANGED_FILES=versions/builds/ethereal-expanse-v36.html node scripts/check-builds.mjs --changed
```

Playwright job is CI-only (downloads Chromium).
