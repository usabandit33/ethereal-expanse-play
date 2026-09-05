# Ethereal Expanse v17 Changelog

**Base:** ethereal-expanse-v15.html (canonical full build; v16.html was an empty placeholder)  
**Date:** 2026-08-12  
**Type:** Audio feedback for combat & escalation (player problem: silent world)

## Tester analysis (v15 as first-time player)

- **What confused me?** Auto-aim vs free-aim switch during boss; dense pause menu; early open plains direction until gem bias kicks in.
- **What excited me?** Climbing the eastern castle, driveable car + fuel loop, dual dragons with fire breath, dig-pond + camp systems, escalating Void Walkers.
- **Where did I get bored?** Long walks across empty mid-map stretches before gem bias / escalation.
- **What made me want to continue?** Pearl → Wyrm pipeline, post-boss coin lap + armor reward, night pressure.
- **What would make me quit?** Completely silent combat (hits, fire, reinforcements had zero sonic feedback); feeling of “pretty screensaver.”
- **Graphics / environment:** Solid sky, instanced trees/grass/rocks, day cycle. Could still use more mid-range landmark contrast and light particle polish (not this pass).

## Highest-value problem fixed

**Silent world.** Fire breath, player hits, gem/pearl pickups, tree chops, camp placement, vehicle enter, boss spawns, and Void Walker reinforcement waves now have short Web Audio tones. Zero external assets, autoplay-safe (unlocks on first pointer/key).

## Changes

1. **Web Audio SFX block** (`ensureAudio`, `playTone`, helpers: `sfxFire`, `sfxHit`, `sfxGem`, `sfxPearl`, `sfxReinforce`, `sfxBoss`, `sfxCamp`, `sfxVehicle`, `sfxChop`).
2. **Call sites** wired at: `spawnFireBreath`, `takeDamage`, gem collect, pearl drop, `tryEscalationSpawn`, `spawnWyrm`, `spawnGroundDragon`, `placeCamp`, `enterVehicle`, `chopNearestTree`.
3. Title / header comments updated to v17; all v15 systems preserved (escalation, ground dragon, fire breath, gem bias, water, dig, camps, car, night pressure, quality, minimap, cheats, save).

## Validation

- Extracted module script: `node --check` clean.
- No systems removed; no new gameplay systems.
- Performance: oscillators are short-lived event tones only.
- File size ~126 KB (was ~123 KB).

## Self-review scores (v17)

| Category        | Score | Notes |
|-----------------|-------|-------|
| Architecture    | 7     | Still monolithic; audio is a clean additive block. |
| Maintainability | 8     | Clear v17 markers; SFX helpers centralized. |
| Performance     | 8     | Negligible cost; short tones only. |
| Readability     | 8     | Parallel to prior additive style. |
| User Experience | 9     | Combat & escalation now have sonic punch. |
| Stability       | 8     | Guarded AudioContext + resume on gesture. |

**Biggest remaining weakness:** Single-file size; pause menu is still a wall of text; open plains mid-game variety is thin beyond gem bias; no ambient pad / spatial audio.  
**Highest-value improvement for next iteration:** Progressive first-use toasts (dig / chop / car / pond) so the pause menu can be shortened, **or** a single very-low-volume ambient day/night pad reusing the existing Web Audio helpers.

## Prompt for next manual iteration

```
Continue the self-improving loop on Ethereal Expanse.

1. Load ethereal-expanse-v17.html as canonical (full build).
2. Do NOT add brand-new gameplay systems.
3. Address the biggest remaining weakness only:
   - Progressive first-use toasts (dig / chop / car / dig-pond) so the pause menu can be shortened,
   OR a single very-low-volume ambient day/night pad using the existing Web Audio helpers.
4. Keep all v14–v17 water, night-pressure, ramp, armor, minimap, dig, fuel, escalation, fire breath, SFX.
5. Output ethereal-expanse-v18.html + changelog.
6. Score, list next weakness, sync only new files to usabandit33/ethereal-expanse-play (no push if no changes).
```
