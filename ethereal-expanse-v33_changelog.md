# Ethereal Expanse v33 Changelog

**Base:** ethereal-expanse-v32.html (canonical full build >50KB)  
**Date:** 2026-09-04  
**Type:** Atmosphere + early-game density (player problem)

## Player analysis (fresh tester lens on v32)

- **Confused me?** Controls and goals are clear (tutorial + pause sheet). Nothing broke.
- **Excited me?** Stackable wood cubes, dual dragons, car, day cycle, save that keeps my camps and ponds.
- **Bored?** The first 60–90 seconds still feel sparse: walk into open grass, hear silence, hope a gem or coin is nearby. The world looks fine; it just feels empty until you hit the castle corridor.
- **Want to continue?** Building outposts, stacking cubes, hunting the Wyrm, driving.
- **Would make me quit?** Prolonged quiet + empty first minutes. Atmosphere was missing; SFX only fire on actions.
- **Graphics / environment:** Solid. Quality tiers work. Not the bottleneck.

## Highest-value problem addressed

**No ambient bed + early-game sparsity** (v31/v32 changelogs). Action SFX exist; the world itself was silent. Near-spawn attractors were weak.

## Changes (v33)

### 1. Quality-gated ambient wind + ethereal drone
- Soft looping filtered noise (bandpass + lowpass) + low sine drone (62 Hz).
- Starts after first pointer/key unlock (same as other SFX).
- Fades in over ~2.8 s, stays very quiet (~0.045 gain).
- Fully muted on Low quality (`Q` cycle); restarts / unmutes on Medium/High.
- Zero assets, same Web Audio style as v30 SFX. Soft-fails if AudioContext unavailable.

### 2. First-minute attractor density
- **Gems:** first 5 spawn in a ring 8–22 m from origin (player start). Remaining bias + scatter unchanged.
- **Coins:** first 10 spawn in a ring 10–28 m from origin so fuel goal is reachable without a long empty walk. Rest still avoid spawn core and castle plateau.

### Preserved
All v32 systems: wood cubes (T), world-edit save v8, SFX, quality tiers, car, bosses, camps, dig, escalation, armor lap. Nothing removed.

## Validation
- Extracted module: `node --check` clean.
- Ambient only runs when quality ≥ 1; no extra per-frame cost.
- Spawn changes are pure position bias; counts, collection, save/load unchanged.
- No new keys, DOM ids, or broken references.

## Self-review scores (v33)

| Category        | Score | Notes |
|-----------------|-------|-------|
| Architecture    | 7     | Still one file; ambient lives inside existing sfx IIFE. |
| Maintainability | 8     | Clear v33 markers; setAmbientMuted pairs with quality toggle. |
| Performance     | 8     | One-time buffer + two nodes; muted on Low. |
| Readability     | 8     | Same style as existing tone/noise helpers. |
| User Experience | 9     | World no longer silent; first minute has visible goals. |
| Stability       | 8     | Soft-fail paths; older saves untouched. |

**Biggest remaining weakness:** Monolith single-file architecture + limited late-game variety after armor lap / bosses.

**Highest-value improvement for next iteration:** Light post-boss objective refresh or subtle visual polish on existing systems (no new gameplay loops). Or begin extracting modules if the file keeps growing.

**Automation opportunity:** CI already has build-gate; extend to assert ambient helpers exist and file size >50KB so empty shells never land on main again.
