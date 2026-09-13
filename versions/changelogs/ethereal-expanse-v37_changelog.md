# Ethereal Expanse v37 Changelog

**Base:** ethereal-expanse-v36.html  
**Date:** 2026-09-13  
**Type:** UX fix — builder wood consent / proximity gate (no silent distant spends)

## Player problem addressed

From v36 self-review: "builders silently compete for player wood (may surprise)."

As a fresh tester, unexpected resource loss while exploring far from the action is a classic quit-driver. Wood is already contested (camps, cubes, sword, beaver economy). Auto-spend without the player present felt like the game was stealing.

## Changes

### Pen builders (v37)
- Builders still path to unpenned cows and attempt to build after their timer.
- **New gate:** wood is only deducted and the pen only appears if the player is within ~22 units of the cow or the builder.
- If ready but player is far: occasional soft toast “Builder waiting near a cow — come closer (needs 4 wood)”.
- Toast on successful pen now explicitly names the cost and reminds the player to stay nearby.
- Pause-panel / help text updated: “Friendly builders pen cows when you are nearby (4 wood).”
- Existing functionality preserved (pens still form, cows still stay in pens, reputation still granted, SFX still plays).

### No other systems touched
- Rocks, dogs, horses, chickens, sword, SFX unlock, save schema, combat, car, cubes, camps all unchanged.
- No new gameplay systems introduced.

## Validation
- Brace / paren / bracket balance: 0.
- File size ~182 KB (full build).
- Logic is additive and fails closed (no spend if far or low wood).

## Playtest checklist
1. Gather ≥4 wood, leave a cow unpenned, walk far away → builders approach but should **not** spend wood.
2. Walk near the waiting builder/cow → pen appears and wood drops with clear toast.
3. Confirm other wood sinks (T cubes, B camp, K sword) still work.
4. Existing companion / combat / drive loops still function.

## Scores (v37)

| Category        | Score |
|-----------------|-------|
| Architecture    | 7     |
| Maintainability | 7     |
| Performance     | 7     |
| Readability     | 7     |
| User Experience | 8.5   |
| Stability       | 7     |

**Biggest remaining weakness:** Boxy primitive meshes across player, animals, and builders (visual identity still “programmer art”).  
**Highest-value next improvement:** Light visual polish on key characters (player + 1–2 companion species) or a simple volume slider for the already-working SFX, without adding new systems.

## Links
- Build: versions/builds/ethereal-expanse-v37.html  
- Prior: versions/builds/ethereal-expanse-v36.html  
- Repo: https://github.com/usabandit33/ethereal-expanse-play
