# Ethereal Expanse v18 Changelog

**Base:** ethereal-expanse-v15.html (canonical full build; v16/v17.html on GitHub were placeholders)  
**Date:** 2026-08-12  
**Type:** Background soundtrack + progressive first-use toasts + full combat SFX bed

## Tester context (carried from v17 analysis)

- Silent world was the highest-friction issue; combat felt like a pretty screensaver.
- Pause menu was a wall of text that new players skip.
- First-use of dig / chop / car / pond needed contextual teaching without permanent chrome.

## Changes in v18

### 1. Background soundtrack (playful, not monotone)
- Soft triangle arpeggio bed on a C-major walk (C–E–G–C–G–E–D–B) with slight timing variation.
- Volume ~0.012 — present but non-distracting under combat and movement.
- Starts after first pointer/key unlock (autoplay-safe).

### 2. Ambient day/night pad
- Dual sine pad (root + fifth) with slow LFO and low-pass filter.
- Volume and brightness track sun angle: darker/quieter at night, brighter by day.
- Master gain ~0.014–0.022 so it never competes with SFX.

### 3. Full Web Audio combat SFX (v17 intent completed on real build)
- `sfxFire`, `sfxHit`, `sfxGem`, `sfxPearl`, `sfxReinforce`, `sfxBoss`, `sfxCamp`, `sfxVehicle`, `sfxChop`, `sfxDig`, `sfxPond`.
- Wired at: fire breath, player damage, gem/pearl collect, escalation waves, Wyrm/Hunter spawn, camp place, vehicle enter, tree chop, dig/pond.

### 4. Progressive first-use toasts
- Chop miss → “Stand closer to a tree…”
- First wood → camp build tip
- First dig → pond connection tip
- First pond connect → moat / Ground Drake tip
- First drive → boost / brake / fuel tip
- Pause menu shortened; long control dump replaced by compact lines + “First-use tips appear as toasts.”

### Preserved
All v14–v15 systems: water both ways, night pressure, ramp, armor, minimap, dig-pond, fuel, escalation, dual fire breath, quality tiers, cheats, save.

## Validation
- `node --check` on extracted module script: clean.
- No systems removed.
- Audio unlocks only after gesture; oscillators are short-lived or low-volume continuous.

## Self-review scores (v18)

| Category        | Score | Notes |
|-----------------|-------|-------|
| Architecture    | 7     | Still monolithic; audio is a clean additive block. |
| Maintainability | 8     | Clear v18 markers; SFX + ambient centralized. |
| Performance     | 8     | Ambient is two oscillators + one filter; SFX event-only. |
| Readability     | 8     | Parallel additive style. |
| User Experience | 9     | World no longer silent; onboarding lighter. |
| Stability       | 8     | Guarded AudioContext + resume on gesture. |

**Biggest remaining weakness:** Mid-map open plains still thin on landmark variety after gem bias; single-file size (~130 KB); no positional/spatial audio.  
**Highest-value next improvement:** Lightweight mid-range landmarks / path visual cues toward the castle, **or** simple positional attenuation on combat SFX using existing Web Audio helpers.

## Prompt for next manual iteration

```
Continue the self-improving loop on Ethereal Expanse.

1. Load ethereal-expanse-v18.html as canonical (full build).
2. Do NOT add brand-new gameplay systems.
3. Address the biggest remaining weakness only:
   - Lightweight mid-range landmarks / path visual cues toward the castle,
   OR simple positional attenuation on combat SFX using existing Web Audio helpers.
4. Keep all v14–v18 water, night-pressure, ramp, armor, minimap, dig, fuel, escalation, fire breath, SFX, ambient, progressive toasts.
5. Output ethereal-expanse-v19.html + changelog.
6. Score, list next weakness, sync only new files to usabandit33/ethereal-expanse-play (no push if no changes).
```
