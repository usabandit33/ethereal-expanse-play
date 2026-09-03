# Ethereal Expanse v33 Changelog

**Base:** ethereal-expanse-v32.html (canonical full build >50KB)  
**Date:** 2026-09-03  
**Type:** Player-problem fix — early-game sparsity + silent world

## Tester analysis (fresh eyes on v32)

- **What confused me?** Coin placement *avoided* the spawn area, so the first minute felt empty despite the tutorial promising gems and coins. Objective line helps, but the world itself did not reinforce it.
- **What excited me?** Driveable car, stacking wood cubes, auto-aim beam, Abyssal Wyrm, and the eastern castle climb. Combat + sandbox toys in one file is still charming.
- **Where did I get bored?** Wandering the open plane with no nearby pickups and pure silence after SFX. The expanse felt more empty than ethereal.
- **What made me want to continue?** Finding a gem cluster toward the castle, chopping trees, and the post-boss coin-lap goal.
- **What would make me quit?** Another quiet, sparse first 90 seconds with nothing to collect near spawn.
- **Graphics / environment:** Terrain and sky shaders are fine; the missing piece was *presence* — audio bed and immediate visual rewards.

## Highest-value weakness addressed

Early-game sparsity (changelog leftover from v31/v32) + no ambient bed. Coins were explicitly excluded from a 12m radius around origin; that made the tutorial’s promises feel dishonest.

## Changes

### Starter pickup density (no new systems)
- **Gems:** First 4 of 25 placed in a ring 10–22m from origin. Castle-approach bias retained for the next slice; rest remain open-world.
- **Coins:** First 12 of 45 placed in a ring 8–24m from origin (visible fuel path to the car). Remaining coins still avoid the extreme center and castle footprint so the map does not feel farm-camped.
- Immediate, diegetic reinforcement of the tutorial goals without changing economy or mid/late balance.

### Quality-gated ambient bed
- Soft looping filtered noise (wind) + low sine pad (55 Hz) via existing Web Audio SFX module.
- Extremely low gain (~0.018 / 0.012) — atmosphere, not a soundtrack.
- Starts on first unlock (pointer/keydown); stops when quality is Low (Q cycle); restarts on Medium/High.
- Zero external assets; soft-fails if AudioContext unavailable.

## Preserved

All v32 systems: wood cubes (T), camps, dig ponds, car, bosses, escalation, armor lap, save schema v8, minimap legend, free-aim, SFX one-shots. Nothing removed.

## Validation

- Module script: `node --check` clean.
- No key binding changes.
- Pickup counts unchanged (25 gems / 45 coins); only spatial distribution for the first tranche.
- Ambient is opt-out via existing Q quality control.

## Self-review scores (v33)

| Category        | Score | Notes |
|-----------------|-------|-------|
| Architecture    | 7     | Still one file; ambient lives inside the SFX IIFE. |
| Maintainability | 8     | v33 markers on spawn + ambient; quality hook is one line. |
| Performance     | 8     | Ambient is two nodes; no per-frame cost. |
| Readability     | 8     | Spawn logic comments explain the sparsity fix. |
| User Experience | 9     | First minute now has something to do and something to hear. |
| Stability       | 8     | Soft-fail ambient; older saves unaffected. |

**Biggest remaining weakness:** Monolith HTML (~144KB) + no CI gate against empty placeholder vN.html files still in the repo.

**Highest-value next:** CI / build-gate that fails if a new `ethereal-expanse-vN.html` is under 50KB, or a modest visual pass on night lighting / fog so the ambient bed has matching atmosphere — not more systems.

**Automation opportunity:** Extend `scripts/check-builds.mjs` to reject sub-50KB HTML shells and to require changelog + version title match.
