# Ethereal Expanse v19 Changelog

**Base:** ethereal-expanse-v15.html (canonical full build; v16–v18.html on GitHub were placeholders)  
**Date:** 2026-08-13  
**Type:** Web Audio SFX bed + soft day/night ambient (v15 was completely silent)

## Tester context

- v15 had **zero audio**. Combat, pickups, fire breath, escalation, vehicle, and resource actions produced no sound.
- This was the single highest-value remaining player problem: the world felt like a silent tech demo and was the most likely reason a new player would quit after a few minutes.

## Changes in v19

### 1. Gesture-unlocked Web Audio context
- `AudioContext` created on demand; resumes on first click or key (autoplay-safe).
- Master gain kept modest (~0.55) so SFX stay under the ambient bed.

### 2. Short oscillator / noise SFX (no external assets)
Wired at existing call sites:
- `sfx.shoot` — aether beam
- `sfx.hit` — Void Walker hit
- `sfx.pearl` / `sfx.gem` / `sfx.coin` — pickups
- `sfx.chop` / `sfx.dig` / `sfx.pond` / `sfx.camp` — resource actions
- `sfx.vehicle` — enter / exit car
- `sfx.fire` — dragon fire breath
- `sfx.reinforce` — Void Walker reinforcement wave
- `sfx.boss` — Wyrm / Abyssal Hunter spawn
- `sfx.damage` — player takes damage

### 3. Soft day/night ambient pad
- Dual sine (root + fifth) through a low-pass filter.
- Volume and brightness track sun height: quieter/darker at night, a touch brighter by day.
- Very low level (≈0.012–0.024) so it never competes with SFX.

### Preserved
All v14–v15 systems: water slow/bob/ripples + AI barriers, night Void Walker pressure, ramp readability, post-lap armor, minimap, dig-pond, camps, car/fuel, escalation tiers, dual dragons + fire breath, quality tiers (Q), cheats, save, progressive objective line.

## Validation
- `node --check` on extracted module script: clean.
- No systems removed; no new gameplay mechanics.
- Audio only starts after user gesture; oscillators are short-lived or continuous at low volume.

## Self-review scores (v19)

| Category        | Score | Notes |
|-----------------|-------|-------|
| Architecture    | 7     | Still monolithic; audio is a clean additive block. |
| Maintainability | 8     | SFX names centralized; easy to retune volumes. |
| Performance     | 8     | Event-only oscillators + 2 continuous ambient osc. |
| Readability     | 8     | Clear v19 markers; parallel to existing showToast style. |
| User Experience | 9     | World is no longer silent — biggest quit factor addressed. |
| Stability       | 8     | Guarded AudioContext + resume on gesture. |

**Biggest remaining weakness:** Mid-map open plains still thin on intermediate landmarks after the gem bias; single-file size (~129 KB); no positional/spatial audio.  
**Highest-value next improvement:** Lightweight mid-range path/landmark cues toward the eastern castle, **or** simple distance-based attenuation on combat SFX using the existing Web Audio helpers.

## Prompt for next manual iteration

```
Continue the self-improving loop on Ethereal Expanse.

1. Load ethereal-expanse-v19.html as canonical (full build >50KB).
2. Do NOT add brand-new gameplay systems.
3. Address the biggest remaining weakness only:
   - Lightweight mid-range landmarks / path visual cues toward the castle,
   OR simple positional attenuation on combat SFX using existing Web Audio helpers.
4. Keep all v14–v19 water, night-pressure, ramp, armor, minimap, dig, fuel, escalation, fire breath, SFX, ambient.
5. Output ethereal-expanse-v20.html + changelog.
6. Score, list next weakness, sync only new files to usabandit33/ethereal-expanse-play (no push if no changes).
```
