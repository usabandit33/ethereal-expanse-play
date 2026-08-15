# Ethereal Expanse v21 Changelog

**Base:** ethereal-expanse-v15.html (canonical full build >50KB; higher numbered files in repo were placeholders)  
**Date:** 2026-08-15  
**Type:** Audio feedback + night atmosphere polish (no new gameplay systems)

## Player analysis (fresh tester lens)

- **Confused:** Dense control surface (chop / dig / camp / drive / beam) even with tutorial + pause reference; fuel-to-car relationship still needs one toast cycle to click for brand-new players.
- **Excited:** Auto-aim combat, fire-breath bosses, driveable car with boost, camp/pond tactical barriers, rank titles, armor payoff after coin lap.
- **Bored:** Post-slice open sandbox can feel quiet when no walkers are near; previously silent world reduced the punch of hits, fire, and pickups.
- **Continue:** Boss escalation, ground dragon chase, coin-lap objective, dog companion, rank climb.
- **Quit risks:** Flat sensory feedback (no audio), thin post-content direction, performance if uncapped entities (already capped).
- **Graphics / environment:** Terrain + floating rocks + orbs solid; night was under-sold (fog/ambient too mild); dug water looked static.

## Highest-value problem addressed

Silent combat and pickups (explicitly called out in v15 self-review) plus weak night atmosphere. Both hurt immersion and make hits / fire / reinforcement feel less consequential — fixed without inventing new gameplay systems.

## Changes

### 1. Lightweight Web Audio bus (procedural, zero assets)
- `AudioBus` IIFE using Web Audio API oscillators + short noise buffers.
- Events: shoot, walker hit, pearl, gem, coin, fire breath, reinforcement escalate, camp place, player damage, armor unlock, vehicle enter, soft engine pulse while driving.
- Quality-aware volume (quieter on Low/Medium). Auto-unlocks on first keydown / tutorial dismiss (browser autoplay policy).
- Fail-soft if AudioContext unavailable; no continuous graph — only short-lived nodes per event.

### 2. Stronger night atmosphere
- Fog density and color ramp with sun height (deeper cooler blue-black at night).
- Ambient + hemisphere intensity dip further at night so camps, orbs, and fire read better.
- Time indicator now shows 🌙 NIGHT when sun is below horizon (was missing true night label).

### 3. Water hole readability
- Subtle opacity + emissive pulse on player-dug water holes and pond bridges so they feel alive and remain visible at night.

### Preserved
- All v15 systems: escalating walkers (cap 18), flying Wyrm + ground Abyssal Hunter, fire breath, gem bias toward castle, camps, dig/ponds, car/fuel, post-slice armor, minimap landmarks, quality tiers, cheats, save, tutorial, objectives, night walker pressure.

## Validation
- Module script parse-checked (imports stripped for `new Function` test): clean.
- No broken references; AudioBus is optional and gated behind unlock.
- Existing features untouched; performance impact is a few short-lived AudioNodes per event (negligible vs Three.js work).
- File size ~128 KB (was ~123 KB).

## Self-review scores (v21)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still monolithic; AudioBus is a clean localized IIFE. |
| Maintainability   | 7     | Clear v21 markers; audio hooks are one-liners at event sites. |
| Performance       | 8     | No continuous audio graph; engine pulse rate-limited. |
| Readability       | 8     | Audio helpers named by intent. |
| User Experience   | 9     | Hits and fire finally land; night feels heavier. |
| Stability         | 8     | Audio fail-soft; no change to combat/physics paths. |

**Biggest remaining weakness:** Single-file size and still-thin post-slice directed goals (sandbox is capable but undirected after armor).  
**Highest-value improvement for next iteration:** Soft ambient “world reacts” feedback using existing systems only (e.g. more readable post-slice objective variants / ambient walker pressure cues) or a very light music bed via the same Web Audio path — still no new gameplay systems unless a concrete quit-risk appears.
