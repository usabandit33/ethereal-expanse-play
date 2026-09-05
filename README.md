# Ethereal Expanse — Live Play

Three.js browser combat + racing sandbox.

**Play (GitHub Pages):** https://usabandit33.github.io/ethereal-expanse-play/

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Stable / Pages |
| `develop` | Active development & WIP |

## Repo layout

```
index.html                 # Pages entry (current playable)
versions/
  builds/                  # Full ethereal-expanse-vN.html builds (>50KB)
  changelogs/              # ethereal-expanse-vN_changelog.md
scripts/                   # build-gate + smoke tests
public/                    # OG / banner assets
```

## Latest build

Prefer the highest `versions/builds/ethereal-expanse-vN.html` over **50 KB**.
As of the develop reorg, **v36** is the newest full build. Root `index.html` may lag until promoted from `develop` → `main`.

## Controls

WASD · LMB/F beam · E chop · T cube · B camp · G dig · **R capture** · **K craft sword** · V car · P pause · M legend · Q quality · C cheats

## CI

`.github/workflows/build-gate.yml` rejects versioned HTML under 50KB and smokes the canonical full build. See `BUILD-GATE.md`.

## Development

```bash
git clone https://github.com/usabandit33/ethereal-expanse-play.git
cd ethereal-expanse-play
git checkout develop
# edit versions/builds/ethereal-expanse-vN.html
# add versions/changelogs/ethereal-expanse-vN_changelog.md
```
