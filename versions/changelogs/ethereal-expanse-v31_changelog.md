# Ethereal Expanse v31 Changelog

**Base:** ethereal-expanse-v30.html (canonical full build >50KB)  
**Date:** 2026-08-28  
**Type:** Save/load world fidelity (player problem)

## Player analysis (fresh tester lens on v30)

- **Confused me?** Controls are covered by tutorial + pause sheet. Stun-as-death is clear after one hit. Load Progress works for stats — then I noticed my camps, ponds, and missing trees were gone. The world I built evaporated.
- **Excited me?** SFX finally give combat and pickups weight. Dual dragons, car, day cycle, camps that actually push walkers back.
- **Bored?** Early open stretches still lean on gem bias + objective text. After the armor lap, free-roam is the same thin loop.
- **Want to continue?** Building a small outpost of camps + connected ponds and coming back to it. Escalation + reputation titles.
- **Would make me quit?** Save that only remembers numbers, not the sandbox I actually shaped. That is a broken promise for a build-and-explore game.
- **Graphics / environment:** Still not the bottleneck. Instancing, biomes, quality tiers, emissive ramp are solid.

## Highest-value problem addressed

**Loaded saves discard player world edits** (v30 changelog: “Monolith + loaded saves cannot restore camps/ponds/chopped trees”). Core stats load; the sandbox does not.

## Changes (v31)

### 1. Save schema version 7 — world edits
- `camps`: array of `{x,y,z}` (final mesh positions).
- `waterHoles`: array of `{x,z}` (hole centers; bridges recomputed on load).
- `choppedTrees`: array of tree instance indices that were zero-scaled.

### 2. Restore on Load
- `clearPlayerWorldEdits()` removes existing camps/holes/bridges and un-chops all trees (dispose-safe).
- `spawnCampAt` / `spawnWaterHoleAt` rebuild meshes without cost/toast side-effects.
- Chopped indices re-hide via existing `hideTreeInstance`.
- Older saves (v6 and below) still load stats; missing arrays are skipped (no crash).

### Preserved
All v30 systems (SFX, quality mute, load parse guards, combat, car, bosses). Nothing removed.

## Validation
- Module body: `node --check` clean.
- No new DOM ids; no broken references to `camps` / `waterHoles` / `treeInstances`.
- Dispose path on clear avoids leaking geometries/materials when reloading repeatedly.
- Performance: restore is O(camps + holes + trees) once on load; no per-frame cost.

## Self-review scores (v31)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still one file; helpers are small and local. |
| Maintainability   | 8     | v31 markers; clear/spawn pair mirrors place/dig. |
| Performance       | 8     | One-shot restore; dispose on clear. |
| Readability       | 8     | Parallel to existing save/load style. |
| User Experience   | 9     | The sandbox you built comes back. |
| Stability         | 8     | Older JSON still loads; arrays guarded. |

**Biggest remaining weakness:** Monolith file + early-game sparsity (gem bias + objective text still carry the first minutes). Ambient bed still absent.

**Highest-value improvement for next iteration:** Short ambient pad/wind (quality-gated, same Web Audio style) or denser early attractors without inventing a new system — e.g. tighter gem spawn near spawn + one stronger toast chain.

**Automation opportunity:** GitHub Action that fails if any new `ethereal-expanse-vN.html` is under 50KB (the loop kept shipping empty shells). Headless smoke: load HTML, assert `clearPlayerWorldEdits` + `spawnCampAt` exist, no console errors.
