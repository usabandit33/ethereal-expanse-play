# Ethereal Expanse v9 Changelog

**Base:** ethereal-expanse-v8.html  
**Date:** 2026-08-02  
**Type:** Combat readability + climb polish (no new systems)

## Player problems addressed

1. **Void Walker behavior hard to read**  
   Three existing distance bands are now visually distinct at a glance:  
   - **Far wander (>32)**: dim magenta eyes, normal scale, gentle bob.  
   - **Medium approach (11–32)**: cyan eye glow + light scale pulse, steady approach.  
   - **Close lunge (<11)**: strong red body flash, eye intensity spike (red), larger scale surge, faster bob.  
   One-time toast on the player’s first-ever lunge: “Void Walker lunging — dodge or fire!”

2. **Castle climb float / slide**  
   - `groundYAt` snap windows tightened further (narrower upward pull, stronger settle).  
   - On-foot downward bias when hovering just above a castle floor increased (−4.2).  
   - Ramp acceptance from v8 kept; no expansion of collision volume beyond what the geometry suggests.

3. **Preserved from v8**  
   Fuel onboarding + critical toast, free-aim spawn pulse, stronger terrain biome contrast, castle minimap marker + legend.

## Code / quality

- Added `gameState.firstLungeSeen` (one-time).  
- Walker `userData.behavior` string (`wander` | `approach` | `lunge`) for clear branching.  
- Initial spawn walkers now carry the same lunge/behavior fields as respawned ones.  
- No new features, no removed systems, no architecture changes.

## Validation

- Syntax: clean.  
- No duplicate logic.  
- Existing combat / vehicle / camps / Wyrm / post-boss lap / save / cheats / quality tiers unchanged in core behavior.  
- Performance: negligible (per-walker eye loop already existed; intensity writes are cheap).

## Self-review scores (v9)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 8     | Still monolithic; behavior flag keeps AI readable. |
| Maintainability   | 8     | Clearer AI section comments + named behavior states. |
| Performance       | 8     | No regression. |
| Readability       | 8     | AI block now self-documents the three bands. |
| User Experience   | 8.5   | Combat telegraphs finally readable; climb more trustworthy. |
| Stability         | 8     | Conservative collision changes only. |

**Biggest remaining weakness:** After the first Wyrm and coin lap the open map still lacks a strong “what next?” signal beyond gem/coin busywork.  
**Highest-value next improvement (still no new systems):** Stronger post-lap / post-Wyrm objective persistence + a short “you’re done for now — explore or replay” toast, plus ensuring the objective line never goes blank.

## Prompt for next implementation

```
Continue the self-improving loop on Ethereal Expanse.

1. Load the newest file: ethereal-expanse-v9.html (or higher if present).
2. Do NOT add new features yet.
3. Fix remaining player friction:
   - Keep objective line always meaningful after Wyrm defeat and after lap completion (never blank).
   - One clear post-content toast that acknowledges the vertical slice is complete and invites free exploration / replay via cheats or respawned walkers.
   - Preserve all v8/v9 feedback (fuel, aim, minimap, Void Walker telegraphs, climb).
4. Output ethereal-expanse-v10.html + ethereal-expanse-v10_changelog.md.
5. Score the new version, list biggest remaining weakness + highest-value next fix.
6. Sync only the new version + changelog to the ethereal-expanse-play GitHub repo (no duplicates, no push if identical).
```
