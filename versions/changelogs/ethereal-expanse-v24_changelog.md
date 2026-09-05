# Ethereal Expanse v24 Changelog

**Base:** ethereal-expanse-v15.html (latest full build >50 KB)  
**Date:** 2026-08-19  
**Type:** UX / feedback polish — procedural audio

## Player problem addressed

The game was completely silent. Combat hits, collectibles, vehicle, fire breath, and boss spawns produced zero audio feedback. For a combat + racing sandbox this is a major immersion killer and a common “why does this feel weightless / empty?” reason to quit. No new gameplay systems were added.

## Changes

### Lightweight Web Audio SFX (procedural, zero assets)
- Unlock on first key / click / tutorial dismiss (standard autoplay policy).
- `sfx.shoot` — short square + noise on aether beam.
- `sfx.hit` — walker / dragon projectile impact.
- `sfx.collect` / `sfx.pearl` — gems, coins, scales, pearls.
- `sfx.wood` / `sfx.camp` / `sfx.dig` — resource actions.
- `sfx.damage` — player takes damage.
- `sfx.fire` — dragon fire-breath bolts.
- `sfx.boss` — Abyssal Wyrm / Hunter spawn sting.
- Engine loop (sawtooth, speed-mapped pitch/volume) while driving; stops cleanly on exit / out-of-fuel.

Master gain kept low (~0.35) so it never overpowers. All synthesis is short-lived oscillators / noise buffers; no external files, no continuous ambient track.

### Preserved
- Full v15 systems: escalating Void Walkers, dual dragons + fire breath, gem bias, camps, dig/ponds, car/fuel, armor, minimap, quality tiers, day cycle, cheats, save, post-boss lap, night pressure, etc.
- No systems removed or broken.

## Validation
- Module script passes `node --check`.
- No broken references.
- Existing features still function; audio is additive and fails soft if AudioContext is blocked.
- Performance: negligible (a handful of short-lived nodes per event).

## Self-review scores (v24)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still monolithic; audio is a self-contained block. |
| Maintainability   | 8     | Clear `sfx` object + `ensureAudio` / `unlockAudio`. |
| Performance       | 8     | Procedural, short-lived; no asset decode cost. |
| Readability       | 8     | v24 markers and comments. |
| User Experience   | 9     | Silent world → readable combat/drive feedback. |
| Stability         | 8     | Soft-fail on restricted contexts; engine cleaned on exit. |

**Biggest remaining weakness:** Single-file size (~129 KB) and open-area visual sparsity after local collectibles are gone.  
**Highest-value next improvement:** Modest environment density / night atmosphere polish (still no new systems) or soft post-slice optional goal only if testing still shows boredom in the open world.
