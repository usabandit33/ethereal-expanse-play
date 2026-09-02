# Ethereal Expanse v33 Changelog

**Base:** ethereal-expanse-v32.html (canonical full build >50KB)  
**Date:** 2026-09-02  
**Type:** Player-problem polish — ambient bed + early-game sparsity

## Tester analysis (fresh eyes on v32)

- **Confused:** Key density is high (E/T/B/G/V/F + quality/cheats). Tutorial + pause sheet cover it, but first minutes still feel like “what do I do next?” if coins/gems are far.
- **Excited:** Atmosphere, floating rocks, day/night, boss pipeline, driveable car, stackable cubes, camp/pond sandbox.
- **Bored:** Long quiet stretches before first fuel or first pearl if RNG scatters collectibles.
- **Continue:** Clear objective line, auto-aim feedback, reputation titles, post-boss lap → armor.
- **Quit:** Silence (no ambient) + early wandering with empty HUD; performance cliff if particles + many cubes pile up.
- **Graphics / environment:** Solid instancing and sky shader. Static water, no ambient bed, terrain variation already present but world can feel “dead” without sound.

## Highest-value problem addressed

**Biggest remaining weakness (from v32 changelog + analysis):** early-game sparsity + no ambient bed.

## Changes (only those that fix the weakness)

### Ambient pad / wind (quality-gated)
- Soft looping sine + LFO low-pass “wind pad” starts after first pointer/key unlock.
- Volume ~0.035, fades in over 2.5 s so it never competes with SFX.
- Fully muted on Low quality (same gate as existing SFX).
- `cycleQuality()` starts/stops ambient so Q toggle stays consistent.
- Zero external assets; pure Web Audio, same soft-fail path as v30 SFX.

### First-minute coin clustering
- ~30 % of the 45 coins now spawn in a 14–32 unit ring around origin.
- Remaining 70 % keep the previous wide scatter (avoiding origin core + castle).
- Goal: player finds fuel within the first minute without changing any systems or balances.

## Preserved

All v32 systems: stackable wood cubes (T), walker bounce / dragon smash, world-edit save (camps, ponds, trees, cubes), SFX, quality tiers, car, gems, bosses, escalation, armor lap. Nothing removed. No new gameplay systems.

## Validation

- Manual syntax pass on edited sections (SFX IIFE, cycleQuality, coin loop).
- Ambient only runs when quality ≥ 1 and AudioContext is available.
- Coin loop still respects try-limit and exclusion zones.
- Existing features and key bindings untouched.

## Self-review scores (v33)

| Category        | Score | Notes |
|-----------------|-------|-------|
| Architecture    | 7     | Still one file; ambient lives inside existing SFX module. |
| Maintainability | 8     | Clear v33 markers; ambient start/stop pair mirrors quality gate. |
| Performance     | 8     | One extra oscillator + LFO only on Med/High; no extra meshes. |
| Readability     | 8     | Same style as prior SFX helpers. |
| User Experience | 8     | Silence fixed; first-minute fuel less RNG-hostile. |
| Stability       | 8     | Soft-fail on AudioContext; older saves unchanged. |

**Biggest remaining weakness:** Monolith file size + static water / limited environmental reactivity.

**Highest-value improvement for next iteration:** Subtle animated water normals or cheap ripple on dig holes (still no new systems), or split the monolith if CI/size becomes painful.

**Automation opportunity:** CI gate that fails any new `ethereal-expanse-vN.html` under 50 KB (repo still carries empty shells for older versions). Also consider a headless smoke that asserts ambient unlock path does not throw.
