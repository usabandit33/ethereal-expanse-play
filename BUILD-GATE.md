# Build gate

Stops the v16–v29 failure mode: a new `ethereal-expanse-vN.html` that is not a real game.

## What fails a commit

- Adding or changing `ethereal-expanse-vN.html` under **50 KB**
- Canonical full build (highest N that is actually >50 KB) failing `node --check`
- Canonical build missing `THREE` / `gameState` / `animate`
- If that build is v30+ (or contains Load/SFX): missing `const sfx` or `function applyLoadedSave`

## Headless job

Serves the repo and opens the canonical HTML in Chromium. Asserts `#game-canvas` exists. If the build is v30+, also asserts SFX/load source is in the page.

## Local

```bash
node scripts/check-builds.mjs
CHANGED_FILES=ethereal-expanse-v31.html node scripts/check-builds.mjs --changed
```

Playwright job is CI-only (downloads Chromium).
