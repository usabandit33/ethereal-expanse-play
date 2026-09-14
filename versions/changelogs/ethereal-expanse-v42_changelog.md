# Ethereal Expanse v42 Changelog

**Base:** ethereal-expanse-v36.html (canonical full build >50KB; v37–v41.html were stubs or changelog-only)  
**Date:** 2026-09-14  
**Type:** Player-trust fix — builders never spend wood unless you press **N**

## Fresh-tester notes on v36

- **What confused me?** Three NPCs walked up to a cow and four wood vanished while I was saving for the sword. Tutorial said they “use wood” but never asked me.
- **What excited me?** Horse contact shield, dogs fetching rocks, sword craft, chickens diving the Wyrm at 10 companions. SFX actually plays after a click.
- **Where did I get bored?** Long gather loops in the same grassy bowl. Verbs exist; the island still reads as one arena.
- **What made me want to continue?** Forging the sword and stacking a mixed pack.
- **What would make me quit?** Inventory disappearing to AI I did not hire. That is a trust break, not a feature.
- **Graphics / environment:** Animals are still boxes. Builders were boxes too — hard to tell them apart from props. Terrain/foliage instancing is already ahead of the characters.

## Highest-value weakness addressed

Silent / competing wood spend by pen builders (flagged in v36 changelog). Wood already has camps (5), cubes (2), and the sword (20). Auto-spend off-screen is the quit-driver.

## Changes (v42 only)

- Builders still path to unpenned cows and stand ready. They **never** call `buildPenAround` on a timer.
- Press **N** to authorize one pen (4 wood). Prefers the cow a nearby builder is already standing by, else the nearest unpenned cow within ~28 units.
- Until the sword is forged, 20 wood is reserved (`woodAvailableForPen`). Pens refuse rather than strand you at 19/20.
- Nearby ready-state toasts explain reserve vs “press N”; they do not spend.
- Tutorial / pause sheet / quality hint list **N**.
- Builder meshes: cylinder torso, sphere head, small hat — same cheap draw cost, easier to read as people you authorize.
- No new entities, no new combat loops, no removed systems (rocks, dogs, horses, chickens, sword, SFX, car, cubes, camps unchanged).

## Validation

- Extracted module: `node --check` clean.
- Brace / paren / bracket balance: 0.
- `tryAuthorizePen`, `woodAvailableForPen`, `penWoodBlockedReason` present.
- `buildPenAround` is only defined and called from `tryAuthorizePen`.

## Playtest checklist

1. Gather wood, walk far from cows → wood does not drop by itself.
2. Stand near a waiting builder + cow, press **N** with ≥24 wood and no sword → pen appears, wood −4, toast names cost.
3. Have 20–23 wood and no sword → **N** refuses with reserve message.
4. After **K** sword, reserve lifts; **N** works at 4 wood.
5. Prior v36 loops still work: dogs/rocks, horse shield, chicken dive, beams, car, camps, cubes.

## Scores (v42)

| Category          | Score |
|-------------------|-------|
| Architecture      | 7     |
| Maintainability   | 7     |
| Performance       | 7     |
| Readability       | 7.5   |
| User Experience   | 8.5   |
| Stability         | 8     |

**Biggest remaining weakness:** One giant HTML file; companion / player / walker / car meshes are still mostly boxes; no master-volume slider on the working gain node.

**Highest-value improvement for next iteration:** Quiet master-volume control on the existing AudioContext gain (no new systems), or a rounded-primitive pass on the most-seen animals (cow, horse, dog, chicken).

## Links

- Build: versions/builds/ethereal-expanse-v42.html
- Prior real build: versions/builds/ethereal-expanse-v36.html
- Repo: https://github.com/usabandit33/ethereal-expanse-play
