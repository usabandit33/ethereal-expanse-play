# Ethereal Expanse v39 Changelog

**Base:** ethereal-expanse-v36.html (canonical full build >50KB; v37.html is an 11-byte stub; v38.html was never shipped)  
**Date:** 2026-09-11  
**Type:** Player-trust fix — builders no longer spend wood

## Fresh-tester notes on v36

- **Confused me?** Three NPCs walked up to a cow and a pen appeared. Four wood vanished while I was saving for the sword. Tutorial never mentioned **N**.
- **Excited me?** Horse contact shield, dog rock loop, sword craft, chicken dive at 10 companions. SFX actually plays after a click.
- **Bored?** Same grassy bowl during the gather loop. Verbs exist; the island still feels like one arena.
- **Want to continue?** Forging the sword and stacking a mixed pack.
- **Would make me quit?** Inventory disappearing to AI I did not hire. That is a trust break, not a feature.
- **Graphics:** Animals and builders are still boxes. Not this pass — consent is the quit-risk.

## Highest-value problem

**Builders silently deducted 4 wood** and competed with camps (5W), cubes (2W), and the sword (20W). v36 flagged it. v37/v38 changelogs described the fix but no real build landed.

## Changes (v39 only)

- Builders still path to unpenned cows and stand ready.
- They **never** call `buildPenAround` on a timer.
- Press **N** to authorize one pen (4 wood). Prefers the cow a builder is already standing by, else nearest unpenned cow.
- Until the sword is forged, 20 wood is reserved (`woodAvailableForPen`). Pens refuse rather than strand you at 19/20.
- Toast explains reserve vs ready-to-pen.
- Tutorial, pause sheet, and quality hint list **N**.

No new entities, no new combat, no removed systems. Meshes unchanged on purpose.

## Validation

- Extracted module script: `node --check` clean.
- Brace / paren / bracket balance 0.
- `tryAuthorizePen`, `woodAvailableForPen`, `penWoodBlockedReason` present.
- Auto spend on the builder timer removed.

## Scores (v39)

| Category | Score |
|----------|-------|
| Architecture | 7 |
| Maintainability | 7 |
| Performance | 7 |
| Readability | 7 |
| User Experience | 8 |
| Stability | 8 |

**Biggest remaining weakness:** One giant HTML file; companion / player / walker / car meshes are still boxes; no volume slider.

**Next:** Quiet master-volume slider on the existing gain node, or a rounded-primitive pass on companions (no new spenders, no new verbs).
