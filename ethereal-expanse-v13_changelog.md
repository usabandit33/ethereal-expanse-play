# Ethereal Expanse v13 Changelog

**Base:** ethereal-expanse-v9.html (v11 content) + v12 water-AI intent  
**Date:** 2026-08-04  
**Type:** Complete the one-sided dig fantasy — player feels water too

## Player problems addressed

1. **Dig ponds still one-sided after v12**  
   Void Walkers already repelled from waterHoles, but the player walked through at full speed with no feedback.  
   - Standing inside a waterHole (radius ~3.2) applies **0.6× movement speed**.  
   - Subtle vertical bob (`sin(ts * 0.008) * 0.06`) while in water.  
   - Occasional cyan ripple particles (more frequent when moving).  
   - Jump force slightly reduced in water (0.85×) for consistency.  
   - No swimming / drowning / new systems — just consistent tactile feedback.

2. **v12 AI water repulsion now present in the playable file**  
   Previous push left a PLACEHOLDER for v12.html. v13 includes the full Void Walker soft-barrier logic (holes + bridges) so the moat fantasy works both ways.

## Code / quality

- Changes localized to on-foot movement block + Void Walker AI camp-repulsion section.  
- All prior fixes preserved: visible ramp + rails/steps, post-lap armor, minimap Castle/Car/Water, dig, tighter groundYAt snap.  
- No systems removed. Combat / vehicle / camps / Wyrm / save / cheats / quality tiers unchanged.

## Validation

- Syntax: clean.  
- No duplicate logic.  
- Camp repulsion still works.  
- Performance: negligible (one O(holes) check per frame on foot; particle budget already capped).  
- Dig remains optional.

## Self-review scores (v13)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 8     | Still monolithic; water logic stays local. |
| Maintainability   | 8     | Clear v12/v13 comments. |
| Performance       | 8     | No regression. |
| Readability       | 8     | Parallel structure for AI + player water. |
| User Experience   | 9     | Dig now feels tactical both ways. |
| Stability         | 8     | Soft multipliers only. |

**Biggest remaining weakness:** Monolithic single-file; open plains still light on mid-game pressure after the vertical slice.  
**Highest-value next improvement:** Light post-slice pressure — e.g. occasional night Void Walker ambush or a single respawn-rate bump after armor is earned — without adding a new system.

## Prompt for next implementation

```
Continue the self-improving loop on Ethereal Expanse.

1. Load ethereal-expanse-v13.html.
2. Do NOT add brand-new systems.
3. Add light post-slice pressure only:
   - After postBossLapDone / armor earned, slightly increase Void Walker respawn aggressiveness or approach range at night.
   - Keep all prior water / ramp / armor / minimap / dig behavior.
4. Output ethereal-expanse-v14.html + changelog.
5. Score, list next weakness, sync only new files to ethereal-expanse-play.
```
