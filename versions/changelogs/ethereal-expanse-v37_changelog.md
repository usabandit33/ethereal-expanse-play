# Ethereal Expanse v37 Changelog

**Base:** ethereal-expanse-v36.html  
**Date:** 2026-09-08  
**Type:** Player-trust fix (builders no longer steal wood)

## Fresh-tester notes on v36

- **Confused me?** Builders spent 4 wood without asking. I was saving for the sword and a pen appeared. Also not obvious that Low quality mutes audio (already documented).
- **Excited me?** Horse shield, dog rock loop, sword craft, chicken dive at 10 companions.
- **Bored?** Mid-gather grind is still the same grassy bowl, but verbs are there.
- **Want to continue?** Crafting the sword and stacking companions.
- **Would make me quit?** Inventory disappearing to AI I did not hire.
- **Graphics:** Still boxy. Not this pass — consent is the quit-risk.

## Highest-value problem

**Builders silently deducted wood.** v36 flagged this. It competes with camps (5W), cubes (2W), and the sword (20W). README already listed **N** and reserved wood, but `versions/builds/ethereal-expanse-v37.html` was missing — this commit lands the actual build.

## Changes (v37 only)

- Builders still path to unpenned cows and stand ready.
- They **never** spend wood on their own.
- Press **N** to authorize one pen (4 wood). Prefers the cow a builder is already standing by, else nearest unpenned cow.
- Until the sword is forged, 20 wood is reserved (`woodAvailableForPen`). Pens refuse rather than strand you at 19/20.
- Toast explains reserve vs ready-to-pen (`penWoodBlockedReason` / `tryAuthorizePen`).
- Tutorial, pause sheet, and quality hint list **N**.

No new entities, no new combat, no removed systems.

## Validation

- Extracted module script: `node --check` clean.
- Brace / paren balance 0.
- `tryAuthorizePen`, `woodAvailableForPen`, `penWoodBlockedReason` present.
- Auto `buildPenAround` from the AI timer removed.

## Scores (v37)

| Category | Score |
|----------|-------|
| Architecture | 7 |
| Maintainability | 7 |
| Performance | 7 |
| Readability | 7 |
| User Experience | 8 |
| Stability | 8 |

**Biggest remaining weakness:** Boxy placeholder meshes / one giant HTML file.  
**Next:** Visual polish on animals/builders (cylinders + simple parts, not new systems), or a quiet volume slider. Do not add more AI spenders.
