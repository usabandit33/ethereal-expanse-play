# Ethereal Expanse — Live Play

**Playable on GitHub Pages: v15** (~123 KB full build).
**Latest loop work: v30** (SFX + Load Progress) — full HTML lives in the iteration artifacts; do not treat tiny placeholder `vN.html` files as builds.

**Play:** https://usabandit33.github.io/ethereal-expanse-play/

Open the highest `ethereal-expanse-vN.html` that is actually >50 KB (currently **v15** on this repo).

## CI — Build gate
`.github/workflows/build-gate.yml` fails any commit that adds/changes an `ethereal-expanse-vN.html` under 50 KB. It also smokes the highest real full build (`node --check`, `THREE` / `gameState` / `animate`, and `sfx` + `applyLoadedSave` once the canonical file is v30+). Headless Chromium job opens that HTML and asserts `#game-canvas`. See `BUILD-GATE.md`.

## v30 (this iteration, source in changelog + artifacts)
- Web Audio SFX (shoot, hits, fire, pickups, camp, dig, vehicle, armor, load)
- Pause menu Load Progress for the existing Save JSON
- Built from v15; v16–v29 HTML files in history were stubs — ignored

## v15 (what Pages serves today)
Escalating Void Walkers · Abyssal Hunter · fire breath · castle gem bias · water / night / car / dig / camps / armor

## Controls
WASD · LMB/F beam · E chop · B camp · **G dig** · V car · P pause · M legend · Q quality · C cheats

Cheats: `abysswyrm` · `100pearls` · `fullrep` · `allgems` · `fuelup` · `undying`
