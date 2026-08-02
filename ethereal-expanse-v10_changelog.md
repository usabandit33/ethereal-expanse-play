# Ethereal Expanse v10 Changelog

**Base:** ethereal-expanse-v9.html  
**Date:** 2026-08-02  
**Type:** Objective persistence + post-content acknowledgment (no new systems)

## Player problems addressed

1. **Objective line going soft / blank after content**  
   - `updateObjectiveProgress()` always writes a meaningful string.  
   - After lap completion: “✓ Vertical slice complete — explore · drive · hunt Void Walkers · C for cheats”.  
   - If a returning Wyrm is active after the lap: “Defeat the returning Abyssal Wyrm — free aim · then explore freely”.  
   - Safety fallback if `wyrmDefeated` but post-boss flags are inconsistent.

2. **No clear “you’re done with the vertical slice” signal**  
   - One-time delayed toast after first lap completion:  
     “✦ Vertical slice complete — explore freely · Void Walkers respawn · C for cheats”.  
   - Subsequent Wyrm defeats (when lap already done) toast “Wyrm down again — explore or hunt” and refresh the free-play objective.

3. **Preserved from v8/v9**  
   Fuel onboarding + critical toast, free-aim spawn pulse, biome contrast, castle minimap marker, Void Walker distance telegraphs (wander / approach / lunge), climb snap polish.

## Code / quality

- Added `gameState.sliceCompleteToast` (one-time).  
- Lap-complete path and returning-Wyrm path both call `updateObjectiveProgress()` so the line never drifts.  
- `defeatWyrm()` checks `postBossLapDone` before re-issuing the coin-lap objective.  
- No new features, no removed systems, no architecture changes.

## Validation

- Syntax: clean.  
- Objective line never cleared via empty `setObjective` after content paths.  
- Existing combat / vehicle / camps / Wyrm / save / cheats / quality tiers unchanged.  
- Performance: negligible.

## Self-review scores (v10)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 8     | Objective state still centralized in one function. |
| Maintainability   | 8     | Clear post-content branches. |
| Performance       | 8     | No regression. |
| Readability       | 8     | Objective logic self-documents end-of-slice. |
| User Experience   | 9     | Player always knows what to do (or that free play is intentional). |
| Stability         | 8     | Only messaging / state-flag changes. |

**Biggest remaining weakness:** The open map still has limited *spatial* guidance (no trail, no stronger landmark pull beyond minimap castle marker). Players who finish the slice may still wander without a soft “interesting direction.”  
**Highest-value next improvement (still no new systems):** Subtle, existing-asset cues only — e.g. stronger minimap pulse on remaining uncollected gems/coins, or a one-time directional toast toward the castle / car when the player has been idle far from content for a long time. No new UI systems.

## Prompt for next implementation

```
Continue the self-improving loop on Ethereal Expanse.

1. Load the newest file: ethereal-expanse-v10.html (or higher if present).
2. Do NOT add new features yet.
3. Fix remaining player friction with existing systems only:
   - Stronger minimap feedback for remaining gems/coins (size or pulse) so free exploration still has soft targets.
   - Optional one-time idle hint if the player stays far from car/castle/gems for an extended period (toast only, no new UI).
   - Preserve all v8–v10 feedback (fuel, aim, minimap legend, Void Walker telegraphs, climb, persistent objectives).
4. Output ethereal-expanse-v11.html + ethereal-expanse-v11_changelog.md.
5. Score the new version, list biggest remaining weakness + highest-value next fix.
6. Sync only the new version + changelog to the ethereal-expanse-play GitHub repo (no duplicates, no push if identical).
```

## Automation note (scheduled loop)

Once the full HTML is stably on the repo, the same prompt can be re-run on a timer. A minimal approach:

1. Keep this exact prompt in a file or pinned chat.
2. Re-run it after each playtest session (or daily).
3. Optional later: GitHub Action that opens an issue “Run Ethereal loop” on a schedule; you (or Grok) execute the prompt and push the next version.

No Action wired yet — ready when you want the YAML draft.
