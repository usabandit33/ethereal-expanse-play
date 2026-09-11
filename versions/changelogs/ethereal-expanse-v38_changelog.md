# Ethereal Expanse v38 Changelog

**Base:** ethereal-expanse-v36.html  
**Date:** 2026-09-11  
**Type:** UX fix for silent resource spend + visual polish on builders

## Player-problem analysis (fresh tester view)

- **What confused me?** Automatic wood deduction by off-screen builders when I was saving for the sword. Tutorial mentioned it but the surprise still stung.
- **What excited me?** Companion ecosystem (horses shielding, chickens diving the Wyrm, dogs fetching rocks), sword craft path, castle + racing.
- **Where did I get bored?** Long stretches of empty plains; pure boxy humanoids standing out against nicer instanced trees/rocks.
- **What made me want to continue?** Collecting rocks/wood for sword + more companions; seeing the pen appear.
- **What would make me quit?** Wood vanishing while I’m far away farming, or unclear why a cow suddenly got fenced.
- **Graphics / environment:** Boxy character meshes remain the biggest visual weakness; terrain and foliage are already improved via instancing.

## Single highest-value weakness addressed

Silent / surprising wood spend by pen builders (resource economy UX). Secondary: slightly less boxy builder meshes.

## Changes

### Transparent pen-builder wood spend
- Builders now only deduct wood and build a pen when the **player is within ~22 units** of the target cow.
- No more far-away silent drains while you chase gems or race.
- Clearer toasts: success mentions the cost and proximity; shortage / distance hints are more specific.
- Tutorial line updated to “Friendly builders (near you) use 4 wood…”.

### Less-boxy builder meshes (same performance)
- Torso → CylinderGeometry, head → SphereGeometry, legs/arms → thin cylinders, small hat for silhouette.
- Still low-poly and cheap; no new draw-call spikes.
- Three builders still spawn and behave exactly as before (pathing, idle orbit, cow targeting).

### No other systems touched
- Rocks, dogs, horses, chickens, sword (K), beavers, walkers, Wyrm, save/load, SFX, quality, car, camps all unchanged.
- Existing functionality preserved; no new gameplay systems.

## Validation
- Extracted module `node --check` clean.
- Brace / paren balance 0.
- Title and version header updated to v38.

## Playtest checklist
1. Gather ≥4 wood, approach an unpenned cow with a builder nearby → pen appears and toast shows cost.
2. Stand far away (>22 units) with wood → builders approach cows but do **not** spend wood.
3. Low wood → occasional “needs 4 wood… (stay close)” toast.
4. Builders still look humanoid and cast shadows; no FPS regression expected.
5. All prior v36 systems (sword, chicken assault, horse shield, dog rocks) still function.

## Scores (v38)

| Category          | Score |
|-------------------|-------|
| Architecture      | 7     |
| Maintainability   | 7     |
| Performance       | 7     |
| Readability       | 7     |
| User Experience   | 8.5   |
| Stability         | 8     |

**Biggest remaining weakness:** Overall boxy / low-detail character and animal meshes (builders improved; most animals still box-based).  
**Highest-value improvement for next iteration:** Light visual refresh of the most-seen animals (cow, horse, dog, chicken) using the same cheap cylinder/sphere pattern, or a subtle SFX volume slider under Q quality cycle.
