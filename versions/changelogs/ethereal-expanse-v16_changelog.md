# Ethereal Expanse v16 Changelog

**Base:** ethereal-expanse-v15.html (canonical full build >50 KB)  
**Date:** 2026-08-21  
**Type:** Audio feedback (player problem fix)

## Player problem addressed
Silent combat and escalation. Hits, fire breath, reinforcements, pickups, and vehicle had no sonic feedback — the world felt hollow even when visuals were strong.

## Changes

### Lightweight zero-asset Web Audio SFX
- `AudioContext` unlocks on first key/pointer gesture (browser autoplay-safe).
- Synthesized short tones (no external files) for:
  - beam fire, walker hit, player damage
  - gem / coin / pearl / wood / scale pickups
  - camp place, vehicle enter, soft engine pulse while driving
  - fire breath, Void Walker reinforcement, boss spawn, armor unlock
- Volume scales with graphics quality: High full, Medium ~55%, **Low muted** (keeps Low tier truly light).
- Failures are silent (restricted environments still run the game).

### Preserved
- All v15 systems: escalating Void Walkers, ground Abyssal Hunter, fire breath, mid-slice gem bias, water/ponds, camps, car/fuel, night pressure, quality tiers, cheats, save, tutorial, minimap, armor reward.

## Validation
- Extracted module script: `node --check` clean.
- No systems removed; no new gameplay systems.
- Audio is opt-in after gesture; does not block load or pause.
- File size ~127 KB (still a single full build).

## Self-review scores (v16)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Audio is a small additive block; still monolithic. |
| Maintainability   | 8     | Clear `sfx(kind)` switch; easy to extend. |
| Performance       | 8     | Short oscillators, no continuous streams; muted on Low. |
| Readability       | 8     | v16 markers; call sites obvious. |
| User Experience   | 9     | Combat and escalation finally have ears. |
| Stability         | 8     | try/catch + unlock-on-gesture; quality gate. |

**Biggest remaining weakness:** Still a single monolithic HTML (~127 KB); post-slice "explore freely" lacks a tighter mid/late loop.  
**Highest-value improvement for next iteration:** Either (a) a short directed post-slice micro-objective that reuses existing systems, or (b) mild night fog/ambient boost so camps and fire read harder after the slice (visual + the new audio). No new systems required.
