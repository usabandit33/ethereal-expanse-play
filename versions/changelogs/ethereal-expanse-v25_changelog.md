# Ethereal Expanse v25 Changelog

**Base:** ethereal-expanse-v15.html (latest full build >50KB)  
**Date:** 2026-08-22  
**Type:** Audio feedback / immersion polish (player problem)

## Player analysis (fresh tester lens)

- **Confused me?** Tutorial + pause cover controls well. Health recovers after stun instead of a hard death — clear once it happens, but the first stun can feel abrupt. Save downloads JSON with no in-game load path (known incomplete loop).
- **Excited me?** Floating mountains, day/night sky, car + boost, escalating Void Walkers, dual dragons with fire breath, castle ramp climb, armor unlock, dog companion, dig ponds + camps that actually affect AI.
- **Bored?** Early open-world wandering is long if you miss the gem bias corridor; post-lap “explore freely” can feel directionless once armor is earned.
- **Want to continue?** Escalation pressure, boss spectacle, reputation titles, collecting scales/wood for camps.
- **Would make me quit?** Completely silent world — shots, hits, collects, fire breath, and vehicle all had zero audio feedback. Immersion collapsed; combat felt weightless.
- **Graphics / environment:** Already strong (instanced trees/rocks/grass, vertex-colored terrain, sky shader, quality tiers). Night pressure and emissive ramp help. Further gains are secondary to feedback.

## Highest-value problem addressed

**Silent game / missing audio feedback.** Prior changelog already flagged “no audio feedback for fire/escalation.” This is the single biggest remaining player-facing weakness: every action felt muted.

## Changes (v25)

### Lightweight Web Audio (no external assets)
- Pure `AudioContext` oscillators + short noise buffers.
- Global master gain (~0.22) so SFX never drown the experience.
- Auto-resume on first key / click / tutorial dismiss (browser autoplay policy).
- Distinct short cues:
  - **shoot** — square + noise whoosh
  - **hit / bossHit** — low saw + noise impact
  - **collect / coin / pearl** — bright sine / triangle chimes
  - **wood / dig / camp** — earthy noise + soft tones
  - **damage** — deeper hurt saw
  - **fire** — bandpassed noise + low roar
  - **vehicle** — enter/exit blip
  - **toast** — soft ping (kept quiet)

Hooks placed only on existing success paths (shootBeam, takeDamage, walker/boss hits, gem/coin/scale/wood collect, placeCamp, digHole, enter/exit vehicle, fire breath). No new gameplay systems.

### Preserved
- All v15 systems: escalation walkers, ground dragon, fire breath, gem bias, water, camps, car/fuel, armor, minimap, quality tiers, cheats, save download, day/night, tutorial, objectives.

## Validation
- JS syntax: clean (`node --check` on extracted module).
- No systems removed; existing features intact.
- Audio is optional / fails soft if AudioContext unavailable.
- File size ~127 KB (was ~123 KB) — modest increase for high UX return.
- Performance: short-lived oscillators only; no continuous engine loop or sample loading.

## Self-review scores (v25)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still monolithic; audio is a self-contained block with named `sfx.*` helpers. |
| Maintainability   | 8     | Clear v25 markers; cues are one-liners at call sites. |
| Performance       | 8     | Negligible cost; quality tiers already gate particles. |
| Readability       | 8     | Audio helpers documented; hooks obvious. |
| User Experience   | 9     | Combat and collect now have weight; biggest silent-world complaint fixed. |
| Stability         | 8     | Soft-fail AudioContext; resume-on-gesture only. |

**Biggest remaining weakness:** Single-file monolith (~127 KB) + save without in-game load (download-only). Early-game direction still relies on gem bias + objective text.  

**Highest-value improvement for next iteration:** Add a simple “Load progress” file-input in the pause menu that restores the saved JSON state (pos, pearls, gems, fuel, etc.), or a lightweight ambient bed (wind / soft pad) that respects quality tiers.  

**Automation opportunity:** A small test harness that loads the HTML in headless Chromium and asserts key functions exist + no console errors would catch regressions across iterations. Also: a GitHub Action that rejects commits of tiny placeholder `.html` files so the “highest N full build” rule stays clean.
