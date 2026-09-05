# Ethereal Expanse v34 Changelog

**Base:** ethereal-expanse-v33.html (canonical full build >50KB)  
**Date:** 2026-09-05  
**Type:** Late-game objective refresh (player problem)

## Player analysis (fresh tester lens on v33)

- **Confused me?** Controls and early goals are fine. Tutorial + pause sheet still do their job.
- **Excited me?** Ambient wind, near-spawn gems/coins, stacking cubes, dual dragons, the car lap.
- **Bored?** The moment the castle lap finishes. Armor pops, toast fires, then the objective line becomes a static “you’re done — wander.” Night walkers get meaner, but nothing *asks* me to do anything.
- **Want to continue?** Building, digging, driving — if I invent my own reasons.
- **Would make me quit?** Beating the intended loop and getting a participation ribbon instead of a next task.
- **Graphics / environment:** Not the bottleneck this pass. Atmosphere from v33 is enough.

## Highest-value problem addressed

**Post-armor dead end.** v33 (and v32 notes) flagged limited late-game variety after the armor lap. The world still has verbs (chop, camp, dig, cube, hunt, drive, collect). The HUD stopped using them.

## Changes (v34)

### Post-lap wanderer contracts
- After `postBossLapDone`, the objective line rotates through **soft contracts** that only wrap existing systems:
  - chop wood, place a camp, dig holes, stack a cube, collect leftover gems/coins, hunt walkers, drive N meters.
- Completing a contract: +2 REP, toast, next contract (avoids immediately repeating the same type when possible).
- Pool is state-aware (won’t ask for a 4th camp, or gems that are already gone).
- Drive contract tracks distance already traveled in the car — no new vehicle stats.
- Saved optionally (`wanderType/Need/Have/Done`) inside existing save v8 payload. Older saves still load; a contract is picked on first objective refresh.

### Preserved
All v33 systems: ambient bed, near-spawn attractors, cubes, world-edit save v8, quality tiers, bosses, camps, dig, escalation, armor lap. No new keys, no new entities, no new combat loop.

## Validation
- Extracted gameplay script: `node --check` clean.
- Brace/paren balance 0.
- Save version remains 8; new fields are additive and default-safe.
- Contracts never run before the armor lap.

## Self-review scores (v34)

| Category        | Score | Notes |
|-----------------|-------|-------|
| Architecture    | 7     | Still one file; contracts sit next to `updateObjectiveProgress`. |
| Maintainability | 8     | Clear v34 markers; one `noteWander` hook site per verb. |
| Performance     | 8     | Drive check is a few adds per vehicle frame. |
| Readability     | 8     | Labels table + pick/note/update trio. |
| User Experience | 9     | Late game has a living next-step again. |
| Stability       | 8     | Old saves ignore unknown fields; functions are hoisted. |

**Biggest remaining weakness:** Monolith single-file architecture + environment still reads as a large grassy bowl with a castle.

**Highest-value improvement for next iteration:** Subtle visual polish on terrain/lighting (no new gameplay), or begin extracting modules before the file grows further.

**Automation opportunity:** Build-gate should reject HTML shells <50KB *and* assert `noteWander` / `pickWanderContract` exist so this loop cannot ship another empty vN.html.
