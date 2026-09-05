# Ethereal Expanse v11 Changelog

**Base:** ethereal-expanse-v7.html  
**Date:** 2026-08-03  
**Type:** Player-friction fixes from playtest (visible ramp, post-lap armor reward, minimap landmarks + dig water)

## Player problems addressed

1. **Castle climb float / slide + invisible ramp**  
   - Ramp material changed to warmer stone (`0x8a7a5a`) so it reads against the grey castle.  
   - Side rails + step markers added so the climb path is unmistakable from distance.  
   - `groundYAt` snap windows tightened further (0.55 below / 0.32 above).  
   - Stronger downward bias when hovering just above a floor (−4.8).

2. **Post-content objective felt finished / soft**  
   - Completing the coin lap now awards a permanent visual upgrade: helmet + visor + chest plate + shoulder pads.  
   - Objective line becomes: “✓ Vertical slice complete — armor earned · explore · dig ponds · hunt · C for cheats”.  
   - Toast: “🏁 Lap complete! Armor unlocked — explore freely”.

3. **Minimap missing castle + water**  
   - Castle marked as a gold/stone diamond with stroke (never lost on the open map).  
   - Car marker enlarged + ringed for clearer read.  
   - **G dig**: dig water holes; dig within ~2.75 of another hole to connect a pond (bridge strip).  
   - Water holes appear as cyan blobs on the minimap.  
   - Legend updated (Castle + Water). Controls / tutorial / pause text mention **G**.

## Code / quality

- New: `applyArmorUpgrade()`, `digHole()`, `waterHoles[]`, `digCooldown`.  
- No systems removed. Existing combat / vehicle / camps / Wyrm / save / cheats / quality tiers preserved.  
- Dig is intentionally minimal (visual ponds + minimap only; no Drake interaction yet).

## Validation

- Syntax: clean (module parse OK).  
- No duplicate logic beyond intentional shared water material.  
- Lap path still requires coins + full angle accumulate.  
- Performance: negligible (few extra meshes on dig, one minimap pass).

## Self-review scores (v11)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 8     | Still monolithic; dig + armor are localized. |
| Maintainability   | 8     | Clear section comments for v11 changes. |
| Performance       | 8     | No regression. |
| Readability       | 8     | Ramp geometry + minimap legend self-document. |
| User Experience   | 9     | Climb readable, post-slice reward tangible, map oriented. |
| Stability         | 8     | Conservative collision tightening only. |

**Biggest remaining weakness:** Dig ponds are visual only — no AI interaction (Ground Drake / walkers ignoring water) yet, so the moat fantasy from the v8.1 notes is incomplete.  
**Highest-value next improvement:** Make Void Walkers (and any future Ground Drake) treat filled water as impassable using the existing `waterHoles` list — no new systems, just a distance check in the AI loop.

## Prompt for next implementation

```
Continue the self-improving loop on Ethereal Expanse.

1. Load ethereal-expanse-v11.html.
2. Do NOT add brand-new systems.
3. Make existing AI respect player-dug water:
   - Void Walkers treat waterHoles (and connected bridges) as impassable / strongly repelling.
   - Optional: if a Ground Drake exists, block it the same way.
4. Keep all v11 feedback (visible ramp, armor upgrade, minimap castle/car/water).
5. Output ethereal-expanse-v12.html + changelog.
6. Score, list next weakness, sync only new files to ethereal-expanse-play.
```
