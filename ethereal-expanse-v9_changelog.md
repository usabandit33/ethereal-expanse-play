# Ethereal Expanse v9 Changelog

**Base:** ethereal-expanse-v7.html  
**Date:** 2026-08-03  
**Type:** Player-friction fixes from playtest (visible ramp, post-lap armor reward, minimap landmarks + dig water)

## Player problems addressed

1. **Castle climb float / slide + invisible ramp**  
   - Ramp material changed to warmer stone so it reads against the grey castle.  
   - Side rails + step markers so the climb path is clear from a distance.  
   - `groundYAt` snap windows tightened; stronger downward bias when hovering above a floor.

2. **Post-content objective felt finished / soft**  
   - Completing the coin lap awards helmet + visor + chest plate + shoulder pads.  
   - Objective: "✓ Vertical slice complete — armor earned · explore · dig ponds · hunt · C for cheats".  
   - Toast acknowledges free play.

3. **Minimap missing castle + water**  
   - Castle = gold/stone diamond.  
   - Car = larger ringed blue marker.  
   - **G dig**: water holes; dig near another hole to connect a pond.  
   - Water shown as cyan on minimap; legend updated.

## Code / quality

- New: `applyArmorUpgrade()`, `digHole()`, `waterHoles[]`, `digCooldown`.  
- No systems removed. Existing combat / vehicle / camps / Wyrm / save / cheats / quality tiers preserved.

## Validation

- Syntax: clean.  
- Lap path still requires coins + full circuit.  
- Performance: no regression.

## Self-review scores (v9)

| Category        | Score | Notes |
|-----------------|-------|-------|
| Architecture    | 8     | Monolithic; dig + armor localized |
| Maintainability | 8     | Section comments for changes |
| Performance     | 8     | No regression |
| Readability     | 8     | Ramp + legend self-document |
| User Experience | 9     | Climb, reward, map orientation |
| Stability       | 8     | Conservative collision only |

**Biggest remaining weakness:** Dig ponds are visual only — AI does not treat water as impassable yet.  
**Highest-value next:** Void Walkers (and Ground Drake if present) treat `waterHoles` as impassable.
