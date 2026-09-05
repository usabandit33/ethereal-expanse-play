# Version history

All playable builds and changelogs live here so the repo root stays clean.

## Layout

| Path | Purpose |
|------|---------|
| `versions/builds/` | Full game HTML (`ethereal-expanse-vN.html`, only real builds >50KB) |
| `versions/changelogs/` | One markdown changelog per version |
| `index.html` (repo root) | GitHub Pages entry — current playable build |

## Canonical / latest

- **Latest full build:** highest `versions/builds/ethereal-expanse-vN.html` that is >50KB (v36+)
- **Pages:** root `index.html` is what https://usabandit33.github.io/ethereal-expanse-play/ serves

## Branching

| Branch | Use |
|--------|-----|
| `main` | Stable / Pages |
| `develop` | Active development, reorg, and WIP builds |

Work on `develop`, open a PR into `main` when a build is playtest-approved.

## Placeholders

Empty or tiny `vN.html` shells (<50KB) are **not** real builds. CI build-gate rejects them.
