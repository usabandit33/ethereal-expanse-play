# Ethereal Expanse v39 Changelog

**Base:** ethereal-expanse-v36.html (canonical full build >50KB; v37.html and v38.html are 11-byte stubs)  
**Date:** 2026-09-12  
**Type:** Player-trust fix — builders no longer spend wood without N

## Fresh-tester notes on v36

- **Confused me?** Three NPCs walked up to a cow and a pen appeared. Four wood vanished while I was saving for the sword. Tutorial never mentioned N.
- **Excited me?** Horse contact shield, dog rock loop, sword craft, chicken dive at 10 companions. SFX actually plays after a click.
- **Bored?** Same grassy bowl during the gather loop. Verbs exist; the island still feels like one arena.
- **Want to continue?** Forging the sword and stacking a mixed pack.
- **Would make me quit?** Inventory disappearing to AI I did not hire. That is a trust break, not a feature.
- **Graphics:** Animals are still boxes. Builders were boxes too — hard to tell them apart from props.

## Highest-value problem

**Builders silently deducted 4 wood** and competed with camps (5W), cubes (2W), and the sword (20W). v36 flagged it. v37/v38 changelogs described the fix but no real build landed. GitHub Pages `index.html` was also still an older snapshot.

## Changes (v39 only)

- Builders still path to unpenned cows and stand ready.
- They **never** call `buildPenAround` on a timer.
- Press **N** to authorize one pen (4 wood). Prefers the cow a builder is already standing by, else nearest unpenned cow (must be within ~28 units).
- Until the sword is forged, 20 wood is reserved (`woodAvailableForPen`). Pens refuse rather than strand you at 19/20.
- Toast explains reserve vs ready-to-pen.
- Tutorial, pause sheet, and quality hint list **N**.
- Builder meshes: cylinder torso, sphere head, small hat — same cheap draw cost, easier to recognize as people you can authorize.
- Playable `index.html` synced to this build.

No new entities, no new combat, no removed systems.

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
| User Experience | 8.5 |
| Stability | 8 |

**Biggest remaining weakness:** One giant HTML file; companion / player / walker / car meshes are still boxes; no volume slider.

**Next:** Quiet master-volume slider on the existing gain node, or a rounded-primitive pass on companions (no new spenders, no new verbs).
