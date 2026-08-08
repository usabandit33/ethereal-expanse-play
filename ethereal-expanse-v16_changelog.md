# Ethereal Expanse v16 Changelog

**Base:** ethereal-expanse-v15.html  
**Date:** 2026-08-08  
**Type:** Audio feedback for combat & escalation (player problem: silent world)

## Player problems addressed

1. **Silent combat / escalation felt hollow**  
   Fire breath, Void Walker reinforcements, gem pickups, player hits, camp placement, vehicle enter, and boss spawns had visual toasts/particles only.  
   - Added a zero-asset Web Audio tone system (`playTone` + small SFX helpers).  
   - Cues fire on: fire breath, reinforce wave, gem collect, takeDamage, camp place, vehicle enter, Wyrm awaken, Hunter spawn.  
   - Audio unlocks on first pointer/key gesture (autoplay policy safe).  
   - No external files, no music loop — lightweight beeps only.

## Preserved

- All v15 systems: escalating Void Walkers, ground Abyssal Hunter, dual fire breath, castle gem bias, water, dig, camps, car/fuel, night pressure, quality tiers, minimap, cheats, save.

## Code / quality

- Audio block localized near quality init; call sites marked `// v16`.  
- No new systems or UI chrome.  
- Performance: oscillators are short-lived; no allocation in hot path beyond event moments.

## Validation

- JS syntax: clean (`node --check` on extracted script).  
- SFX helpers present and wired (fire, reinforce, gem, hit, camp, vehicle, boss).  
- No systems removed.  
- Existing features unchanged.

## Self-review scores (v16)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still monolithic; audio is a clean additive block. |
| Maintainability   | 8     | Clear v16 markers; SFX helpers centralized. |
| Performance       | 8     | Negligible cost; short tones only. |
| Readability       | 8     | Parallel to prior additive style. |
| User Experience   | 9     | Combat & escalation now have sonic punch. |
| Stability         | 8     | Guarded AudioContext + resume on gesture. |

**Biggest remaining weakness:** Single-file size (~125 KB) and no real spatial/positional audio or music bed; open plains still light on mid-game variety beyond gem bias; pause menu still a wall of text.  
**Highest-value next improvement:** Progressive first-use toasts (dig / chop / car) so the pause menu can shrink, OR a single very-low-volume ambient day/night pad using the existing Web Audio helpers.

## Prompt for next implementation

```
Continue the self-improving loop on Ethereal Expanse.

1. Load ethereal-expanse-v16.html as canonical.
2. Do NOT add brand-new gameplay systems.
3. Address the biggest remaining weakness only:
   - Either: progressive first-use toasts (dig / chop / car / dig-pond) so the pause menu can be shortened, OR a single very-low-volume ambient day/night pad using the existing Web Audio helpers.
4. Keep all v14–v16 water, night-pressure, ramp, armor, minimap, dig, fuel, escalation, fire breath, SFX.
5. Output ethereal-expanse-v17.html + changelog.
6. Score, list next weakness, sync only new files to ethereal-expanse-play (no push if no changes).
```
