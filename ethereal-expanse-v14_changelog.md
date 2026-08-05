# Ethereal Expanse v14 Changelog

**Base:** ethereal-expanse-v13.html  
**Date:** 2026-08-05  
**Type:** Soft post-slice pressure + early objective clarity + fuel discoverability (no new systems)

## Player problems addressed

1. **Post-slice boredom / lack of pressure**  
   After armor is earned the open world felt empty.  
   - When `postBossLapDone` **and** night (`sunAngle` sin < 0.25):  
     - Void Walker lunge range 11 → 14.5  
     - Approach range 32 → 40  
     - Lunge cooldown shorter (≈2.6–3.8 s vs 3.8–5.3 s)  
     - Respawn delay shorter (≈1.6–3.0 s vs 2.5–4.5 s)  
   - Same AI shape, same enemies, no new systems. Daytime remains calm.

2. **Early-game objective soft-focus**  
   Objective line now always shows the primary gem/pearl goal from the first frame after tutorial. Post-slice objective text updated to mention night pressure.

3. **Car fuel discoverability**  
   - Detection radius for car prompt 6 → 8.  
   - When fuel ≤ 0 and near the car: fuel bar pulse + car underglow intensity oscillates.  
   - No new UI elements.

4. **Ramp readability (graphics)**  
   Ramp deck + side rails given faint emissive so the climb path reads better from mid-distance.

## Code / quality

- Changes localized: Void Walker AI block, near-car block, ramp materials, objective strings, respawn timer.  
- All prior systems preserved.  
- No duplicate logic.  
- Performance: negligible.

## Validation

- Syntax: clean.  
- No broken references.  
- Existing features still function.  
- Night-only post-slice multipliers only.

## Self-review scores (v14)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 8     | Still monolithic; pressure is data-driven flags. |
| Maintainability   | 8     | Clear v14 comments at change sites. |
| Performance       | 8     | No regression. |
| Readability       | 8     | Parallel postSliceNight flag. |
| User Experience   | 9     | Early goal + post-slice bite + fuel cue. |
| Stability         | 8     | Soft multipliers only. |

**Biggest remaining weakness:** Monolithic single-file; open plains still light on *mid*-slice variety (between first pearls and Wyrm).  
**Highest-value next improvement:** One lightweight mid-game cue (e.g. slight gem bias toward eastern castle approach) without adding systems.

## Prompt for next implementation

```
Continue the self-improving loop on Ethereal Expanse.

1. Load ethereal-expanse-v14.html.
2. Do NOT add brand-new systems.
3. Address the biggest remaining weakness only:
   - Light mid-slice (pre-Wyrm) guidance: slightly bias a few Resonance Gems toward the eastern castle approach so the plateau is a natural attractor, OR add a single ambient audio-free visual cue (e.g. faint particle stream from castle at dusk) that draws the eye without new UI.
4. Keep all v13/v14 water, night-pressure, ramp, armor, minimap, dig, fuel behavior.
5. Output ethereal-expanse-v15.html + changelog.
6. Score, list next weakness, sync only new files to ethereal-expanse-play (no push if no changes).
```
