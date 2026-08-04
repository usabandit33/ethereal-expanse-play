# Ethereal Expanse v12 Changelog

**Base:** ethereal-expanse-v9.html (content labeled v11)  
**Date:** 2026-08-04  
**Type:** Highest-value player-friction fix from v11 self-review — AI respects dug water

## Player problems addressed

1. **Dig ponds felt cosmetic / pointless**  
   Void Walkers previously ignored waterHoles entirely. Digging was visual + minimap only, so the moat / barrier fantasy never paid off in combat.  
   - Void Walkers now treat each water hole (radius ~3.4) and connected bridge strips (radius ~2.6) as strongly repelling soft barriers.  
   - Force scales with proximity; sets `repelled = true` so lunges and approach AI are suppressed while near water.  
   - No new systems; reuses existing `waterHoles` list and camp-repulsion pattern.

## Code / quality

- Localized change inside the existing Void Walker AI loop only.  
- All v11 feedback preserved (visible ramp, armor upgrade, minimap castle/car/water, dig).  
- No systems removed. Combat / vehicle / camps / Wyrm / save / cheats / quality tiers unchanged.

## Validation

- Syntax: clean.  
- No duplicate logic.  
- Existing camp repulsion still works.  
- Performance: negligible (O(walkers × holes); holes stay few).  
- Dig remains optional and non-destructive.

## Self-review scores (v12)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 8     | Still monolithic; water AI is a tight extension of camp logic. |
| Maintainability   | 8     | Clear v12 comment block. |
| Performance       | 8     | No regression. |
| Readability       | 8     | Parallel structure to camp repulsion. |
| User Experience   | 9     | Dig now has combat meaning — ponds become tactical. |
| Stability         | 8     | Soft forces only; no hard collision edge cases introduced. |

**Biggest remaining weakness:** Monolithic single-file structure + no Ground Drake yet; water still has no depth/swim/death interaction for the player.  
**Highest-value next improvement:** Give the player a light slip / slow or visual ripple when standing in a waterHole so the barrier feels consistent both ways, still without adding a full swimming system.

## Prompt for next implementation

```
Continue the self-improving loop on Ethereal Expanse.

1. Load ethereal-expanse-v12.html (or the latest sequential file).
2. Do NOT add brand-new systems.
3. Improve consistency of dug water:
   - When the player stands inside a waterHole radius, apply mild movement slow + subtle vertical bob / ripple particles.
   - Keep Void Walker repulsion from v12.
4. Preserve all prior feedback (ramp, armor, minimap, dig, AI water respect).
5. Output ethereal-expanse-v13.html + changelog.
6. Score, list next weakness, sync only new files to ethereal-expanse-play.
```
