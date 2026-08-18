# Ethereal Expanse v22 Changelog

**Base:** ethereal-expanse-v15.html (last full >50 KB build)  
**Date:** 2026-08-18  
**Type:** Audio feedback polish (player problem: silent combat & actions)

## Player analysis (fresh tester)

- **Confused me:** Sudden free-aim switch on boss, dense early systems (gems/pearls/coins/wood/dig/car), but tutorial + objective line + minimap help.
- **Excited me:** Atmosphere, car + shooting, dual dragons with fire breath, camps that actually repel AI, dig-pond barriers, rank-ups, dog companion.
- **Bored:** Sparse stretches before escalation kicks in; post-armor sandbox can feel directionless.
- **Wanted to continue:** Clear pearl → Wyrm → Hunter → coin-lap → armor loop; shiny collectibles; readable feedback.
- **Would quit:** Repeated stun/fire without sonic warning; silent world feels hollow; performance if uncapped.
- **Graphics/env:** Solid sky/fog/orbs/floating rocks; terrain still somewhat uniform; ramp readability improved in prior versions.

## Highest-value player problem addressed

**Complete lack of audio feedback.** Combat threats (fire breath, hits, walker waves), pickups, chopping, building, vehicle entry, and boss events were silent. This hurt threat readability, immersion, and the dopamine of collection/actions.

## Changes

### 1. Zero-asset Web Audio SFX
- Lightweight `AudioContext` synth (oscillators + short noise bursts). No external files.
- Unlocks on first gesture (tutorial dismiss or canvas click) — browser autoplay safe.
- Quality-aware: full volume High, reduced Medium, muted Low (keeps Low clean for performance).
- Cues:
  - `sfxShoot` — beam fire
  - `sfxHit` — player damage
  - `sfxPickup` — gem / coin / pearl / scale
  - `sfxChop` — tree chop
  - `sfxCamp` — camp placement
  - `sfxDig` — water hole
  - `sfxFireBreath` — dragon fire bolts (threat warning)
  - `sfxReinforce` — Void Walker wave
  - `sfxBoss` — Wyrm / Hunter spawn & defeat
  - `sfxVehicle` — enter car
  - `sfxArmor` — post-lap armor unlock

### Preserved
- All v15 systems: escalating walkers, ground dragon, fire breath, gem bias, water/camps/dig/car/fuel, night pressure, minimap, quality, cheats, save, armor, dog, day/night, etc.
- No gameplay systems removed or replaced.

## Validation
- Extracted module script passes `node --check`.
- No broken references; SFX calls are fire-and-forget and fail silently if AudioContext unavailable.
- Existing features intact; performance path on Low quality mutes audio.
- File size ~127 KB (still single-file, full build).

## Self-review scores (v22)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still monolithic; audio is a clean additive block. |
| Maintainability   | 8     | Named sfx* helpers; easy to extend or mute. |
| Performance       | 8     | Short one-shots, muted on Low, no allocation storms. |
| Readability       | 8     | Parallel to existing particle/toast patterns. |
| User Experience   | 9     | Threats and rewards now have sonic weight. |
| Stability         | 8     | try/catch around AudioContext; unlock gated. |

**Biggest remaining weakness:** Single-file size + post-armor retention (sandbox can still feel aimless after the vertical slice).  
**Highest-value improvement for next iteration:** Soft post-slice goal loop (e.g. optional scale collection milestone or night-only event) *or* modest environment density pass (more grass clusters / rock variety) without new systems — only if a clear player boredom signal persists.
