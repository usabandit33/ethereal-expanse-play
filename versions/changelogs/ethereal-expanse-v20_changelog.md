# Ethereal Expanse v20 Changelog

**Base:** ethereal-expanse-v15.html (canonical full build >50KB)  
**Date:** 2026-08-14  
**Type:** Audio feedback + night atmosphere polish (no new gameplay systems)

## Player analysis (fresh tester lens)

- **Confused:** Dense control surface (chop / dig / camp / drive / beam) even with tutorial + pause reference; fuel-to-car relationship takes one toast cycle to click.
- **Excited:** Auto-aim combat, fire-breath bosses, driveable car with boost, camp/pond tactical barriers, rank titles, armor payoff.
- **Bored:** Post-slice open sandbox can feel quiet when no walkers are near; silent world reduced punch of hits and pickups.
- **Continue:** Boss escalation, ground dragon chase, coin-lap objective, dog companion, rank climb.
- **Quit risks:** Flat sensory feedback (no audio), thin post-content direction, performance if uncapped entities.
- **Graphics / environment:** Terrain + floating rocks + orbs good; night was under-sold; dug water looked static.

## Highest-value problem addressed

Silent combat and pickups (called out in v15 self-review) plus weak night atmosphere. Both hurt immersion and make hits/escalation feel less consequential without inventing systems.

## Changes

### 1. Lightweight Web Audio bus (procedural, zero assets)
- `AudioBus` using Web Audio API oscillators + noise buffers.
- Events: shoot, walker hit, pearl, gem/coin collect, fire breath, reinforcement escalate, camp place, player damage, armor success, soft engine pulse while driving.
- Quality-aware volume (quieter on Low). Auto-unlocks on first pointer/keydown (browser policy).
- Fail-soft if AudioContext unavailable.

### 2. Stronger night atmosphere
- Fog density and color ramp with sun height (deeper blue-black at night).
- Ambient intensity dips further at night so camps and orbs read better.
- Time indicator now shows 🌙 NIGHT when sun is below horizon.

### 3. Water hole readability
- Subtle opacity + emissive pulse on player-dug water so ponds feel alive and remain visible at night.

### Preserved
- All v15 systems: escalating walkers (cap 18), flying Wyrm + ground Abyssal Hunter, fire breath, gem bias, camps, dig/ponds, car/fuel, armor, minimap, quality tiers, cheats, save, tutorial, objectives.

## Validation
- Extracted module script: `node --check` clean.
- No broken references; AudioBus is optional and gated.
- Existing features untouched; performance impact is a few short-lived AudioNodes per event (negligible vs Three.js work).
- File size ~128 KB (was ~123 KB).

## Self-review scores (v20)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still monolithic; AudioBus is a clean localized IIFE. |
| Maintainability   | 7     | Clear v20 markers; audio hooks are one-liners at event sites. |
| Performance       | 8     | No continuous audio graph; engine pulse rate-limited. |
| Readability       | 8     | Audio helpers named by intent. |
| User Experience   | 9     | Hits and fire finally land; night feels heavier. |
| Stability         | 8     | Audio fail-soft; no change to combat/physics paths. |

**Biggest remaining weakness:** Single-file size and still-thin post-slice directed goals (sandbox is capable but undirected after armor).  
**Highest-value improvement for next iteration:** Soft ambient “world reacts” feedback using existing systems only (e.g. more readable post-slice objective variants / ambient walker pressure cues) or lightweight music bed via same Web Audio path — still no new gameplay systems unless a concrete quit-risk appears.
