# Ethereal Expanse v38 Changelog

**Base:** ethereal-expanse-v36.html (canonical full build; v37.html was an 11-byte stub)  
**Date:** 2026-09-10  
**Type:** Player-trust (pen consent) + visual polish on companions/builders

## Fresh-tester notes on v36

- **Confused me?** Builders spent 4 wood without asking. I was saving for the sword and a pen appeared. Low quality still mutes audio (documented).
- **Excited me?** Horse shield, dog rock loop, sword craft, chicken dive at 10 companions.
- **Bored?** Mid-gather grind in the same grassy bowl — verbs exist, silhouettes did not.
- **Want to continue?** Crafting the sword and stacking companions.
- **Would make me quit?** Inventory disappearing to AI I did not hire; everything looking like crates with legs.
- **Graphics:** Boxy placeholder animals were the next quit-risk after consent.

## Highest-value problem

1. **Builders silently deducted wood** (v36 changelog + v37 notes). v37.html never shipped a real build.
2. **Boxy companion / builder meshes** — same changelog "next" item.

## Changes (v38)

### Pen consent (the v37 patch, actually landed)
- Builders still path to unpenned cows and stand ready.
- They **never** spend wood on their own.
- Press **N** to authorize one pen (4 wood). Prefers the cow a builder is already standing by, else nearest unpenned cow.
- Until the sword is forged, 20 wood is reserved (`woodAvailableForPen`). Pens refuse rather than strand you at 19/20.
- Toast explains reserve vs ready-to-pen.
- Tutorial, pause sheet, and quality hint list **N**.

### Visual polish (no new systems)
- Companions use capsules / spheres / cylinders / cones instead of boxes (wolf, dog, cat, beaver, cow, chicken, horse).
- Builder NPCs use cylinder torso + sphere head + cylinder legs.
- Same footprints, same AI, same capture/pen/combat hooks.

No new entities, no new combat loops, no removed systems.

## Validation

- Extracted module script: `node --check` clean.
- Brace / paren / bracket balance 0.
- `tryAuthorizePen`, `woodAvailableForPen`, `penWoodBlockedReason` present.
- Auto `buildPenAround` from the AI timer removed.

## Scores (v38)

| Category | Score |
|----------|-------|
| Architecture | 7 |
| Maintainability | 7 |
| Performance | 7 |
| Readability | 7 |
| User Experience | 8 |
| Stability | 8 |

**Biggest remaining weakness:** One giant HTML file; player avatar / walkers / car still boxy; no volume slider.

**Next:** Quiet master-volume slider (SFX already has a gain node), or the same rounded-primitive pass on the player and Void Walkers. Do not add more AI spenders.
