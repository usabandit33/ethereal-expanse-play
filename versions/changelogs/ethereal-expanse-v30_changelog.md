# Ethereal Expanse v30 Changelog

**Base:** ethereal-expanse-v15.html (latest real full build >50KB)  
**Date:** 2026-08-27  
**Type:** Audio feedback + save/load loop (player problems)

## Player analysis (fresh tester lens on v15)

- **Confused me?** Tutorial and pause sheet are solid. Health “death” is actually a stun+recover — fine after the first time. Save Progress downloads a JSON file with **no way to load it back**. That is a broken promise.
- **Excited me?** Day/night sky, floating mountains, car boost, castle climb, dual dragons, camps that actually scare walkers, ponds as soft AI barriers.
- **Bored?** First minutes can wander if you miss the gem corridor. After the lap, “explore freely” is thin.
- **Want to continue?** Escalation, wyrm spectacle, reputation titles, building camps.
- **Would make me quit?** Completely silent world. Beams, hits, fire breath, coins, and the car all land with zero weight. Second quit-risk: I saved, closed the tab, and the game shrugged.
- **Graphics / environment:** Already ahead of the audio/UX debt. Instancing, vertex color biomes, quality tiers, emissive ramp. Polish here is not the bottleneck.

## Highest-value problem addressed

**Silent game** (v15/v29 changelogs both flagged this; v16–v29 HTML files in the repo are placeholders, so the SFX never actually shipped). Secondary but justified on the same UX loop: **save without load**.

## Changes (v30)

### 1. Lightweight Web Audio (no assets)
- `AudioContext` oscillators + short decaying noise bursts.
- Master gain ~0.22. Unlock on first pointer/key (autoplay policy).
- Muted on Low quality. Soft-fails if AudioContext is missing.
- Cues: shoot, walker hit, boss hit, gem/scale, coin, pearl, wood, dig, camp, player damage, fire breath, vehicle enter, reinforce wave, armor, load.

### 2. Load Progress in pause menu
- File input next to Save Progress (`accept=.json`).
- Restores pearls, rep, wood, scales, coins, fuel, health, campsBuilt flags, wyrm/post-boss flags, position, yaw.
- Reconstructs gem/coin visibility from counts (v15 save format has no per-item IDs).
- Re-applies dog (≥10 pearls), armor (post-lap), flying wyrm if it was mid-fight.
- Does not invent un-saved world edits (placed camps, dug ponds, chopped trees) — those were never in the JSON.

Save schema bumped to `version: 6` (still reads older v5 fields).

### Preserved
All v15 systems. Nothing removed.

## Validation
- Extracted module body: `node --check` clean.
- No broken DOM ids (`load-file`, `load-btn`, existing HUD).
- Audio optional. Load parse errors toast instead of throwing.

## Self-review scores (v30)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still one file; audio is an IIFE; load is one function. |
| Maintainability   | 8     | v30 markers; sfx.* one-liners. |
| Performance       | 8     | No samples, no engine loop; Low quality mutes SFX. |
| Readability       | 8     | Parallel to existing toast/hook style. |
| User Experience   | 9     | Combat has weight; save/load is a real loop now. |
| Stability         | 8     | Soft-fail audio + JSON parse guard. |

**Biggest remaining weakness:** Monolith + loaded saves cannot restore camps/ponds/chopped trees (schema gap). Early-game still leans on gem bias + objective text.

**Highest-value improvement for next iteration:** Extend the save schema with camp/pond/tree-chop arrays so Load restores the world you actually built — or a short ambient bed (wind/pad) gated by quality.

**Automation opportunity:** GitHub Action that fails CI if a new `ethereal-expanse-vN.html` is under 50KB. The loop kept committing empty shells and then claiming they were canonical. Headless smoke test (load HTML, assert `sfx`, `applyLoadedSave`, no console errors) would catch this class of failure.
