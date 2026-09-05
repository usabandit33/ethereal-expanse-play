# Ethereal Expanse v8 Changelog

**Base:** ethereal-expanse-v7.html  
**Date:** 2026-08-02  
**Type:** Clarity / friction / visual orientation pass (no new systems)

## Player problems addressed

1. **Fuel / car onboarding confusion**  
   - First proximity toast now explicitly says “Collect gold coins first — then V to drive” when fuel is 0.  
   - One-time “Fuel low / Fuel critical” toast when fuel first drops below 15 (on foot near car or while driving).

2. **Castle climb friction**  
   - West-side ramp acceptance widened slightly (xMin/xMax/zTol) so the solid-looking ramp matches the collision volume more closely and reduces edge falls.

3. **Aim mode clarity when Wyrm spawns**  
   - FREE AIM hint scales up briefly on spawn so the mode switch is harder to miss while the dragon is already moving.

4. **Visual / spatial orientation**  
   - Terrain vertex colors: stronger plateau (cooler stone), plains (warmer grass), outer-ring (dusk blue) contrast.  
   - Minimap now shows a distinct castle marker + legend entry.

## Code / quality

- Added `gameState.lowFuelWarned` flag (one-time).  
- No new features, no removed systems, no architecture changes.  
- All existing loops (combat, vehicle, camps, post-boss lap, save, cheats, quality tiers) preserved.

## Validation

- Syntax: clean (single-file HTML module).  
- No duplicate logic introduced.  
- Existing features (beam, auto-aim, vehicle, camps, Wyrm, dog, save download) untouched in behavior except the feedback improvements above.  
- Performance: negligible (one extra minimap draw + a couple of flag checks).

## Self-review scores (v8)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 8     | Still monolithic but well-sectioned; tunables at top. |
| Maintainability   | 7     | Comments + named constants help; still one large file. |
| Performance       | 8     | Instancing + quality tiers already solid. |
| Readability       | 8     | Clear section headers; recent feedback code is local. |
| User Experience   | 8     | Biggest gains this iteration (fuel, climb, aim, map). |
| Stability         | 8     | No intentional breaking changes. |

**Biggest remaining weakness:** Combat loop variety after the first few Void Walker kills still plateaus; the sandbox starts to feel samey once the Wyrm and lap are done.  
**Highest-value next improvement:** Light attack-pattern variety or telegraph clarity for Void Walkers (still no new systems—just readable differentiation of the three distance behaviors already coded).

## Prompt for next implementation (copy-paste)

```
Continue the self-improving loop on Ethereal Expanse.

1. Load the newest file: ethereal-expanse-v8.html (or higher if present).
2. Do NOT add new features yet.
3. Fix the remaining player friction identified in the v8 self-review:
   - Make the three existing Void Walker behaviors (far wander / medium approach / close telegraphed lunge) more visually distinct so the player can read them at a glance (color flash intensity, scale pulse, eye glow, or short toast only on first lunge).
   - Ensure the castle ramp and upper floors never leave the player floating or sliding; keep collision conservative.
   - Keep fuel / aim / minimap feedback from v8.
4. Output ethereal-expanse-v9.html + ethereal-expanse-v9_changelog.md.
5. Score the new version, list biggest remaining weakness + highest-value next fix.
6. Sync only the new version + changelog to the ethereal-expanse-play GitHub repo (no duplicates, no push if identical).
```
