# Ethereal Expanse v15 Changelog

**Base:** ethereal-expanse-v14.html (full local build)  
**Date:** 2026-08-05  
**Type:** Escalation combat + mid-slice guidance

## Changes

### 1. Escalating Void Walkers
- Toughness tiers (0–3) scale with play time, pearls, and post-slice state.
- HP: 4 → up to 7; slight visual scale + purple halo at tier ≥ 2.
- Periodic reinforcement waves: every ~45s (28s post-slice) after 60s play, 1–2 extra walkers spawn (capped at 18 alive).
- Toast when a tougher wave arrives.

### 2. Ground dragon (Abyssal Hunter)
- Spawns ~2.2s after the flying Abyssal Wyrm is defeated.
- Pursues the player on terrain (uses groundYAt), contact damage, fire breath.
- Boss HP bar switches to "ABYSSAL HUNTER" (orange gradient).
- Defeating it drops scales + reputation; restores purple bar style.
- Appears on minimap as red marker.

### 3. Fire breath (both dragons)
- Flying Wyrm and ground dragon periodically fire orange bolts toward the player.
- Bolts damage on contact; particles for readability.
- Shared `fireProjectiles` pool; cooldown ~2.4s (slightly faster for ground dragon).

### 4. Mid-slice guidance (player problem)
- ~40% of Resonance Gems biased into a corridor west of the eastern castle plateau so the climb path is a natural attractor without new UI.

### Preserved (v13/v14)
- Water slow/bob/ripples for player + AI soft barriers on ponds/bridges  
- Post-slice night Void Walker pressure  
- Ramp emissive + rails, post-lap armor, minimap landmarks, dig, camps, car/fuel pulse, quality tiers, cheats, save  

## Validation
- JS syntax: clean (`node --check`).  
- No systems removed.  
- Alive-walker hard cap prevents runaway density.  
- Fire breath + ground AI only active when respective dragons exist.

## Self-review scores (v15)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still monolithic; dragons + fire are additive blocks. |
| Maintainability   | 7     | Clear v15 markers; escalation helpers localized. |
| Performance       | 7     | Cap at 18 walkers; fire bolts short-lived. |
| Readability       | 8     | Parallel structure for flying vs ground. |
| User Experience   | 9     | Real mid/late combat pressure + castle pull. |
| Stability         | 8     | Soft multipliers + caps. |

**Biggest remaining weakness:** Single-file size (~123 KB) and no audio feedback for fire/escalation.  
**Highest-value next improvement:** Lightweight audio cues (Web Audio beeps) for fire breath + reinforcement toast, or split the monolithic file into modules if the build pipeline allows.
