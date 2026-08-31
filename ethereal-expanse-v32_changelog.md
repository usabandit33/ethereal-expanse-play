# Ethereal Expanse v32 Changelog

**Base:** ethereal-expanse-v31.html (canonical full build >50KB)  
**Date:** 2026-08-31  
**Type:** Requested player feature — stackable wood cubes

## Player request

Collecting wood can also make wooden cubes that stack. 2 wood per cube. Key must not collide with the current plan. Void Walkers cannot destroy cubes; dragons can.

## Why T

Existing keys: WASD, Shift, Space, P/Esc, C, Q, M, E, B, G, V, F, LMB.  
**T** = timber / place cube. Not used. Does not steal chop (E), camp (B), dig (G), drive (V), or fire (F).

## Changes

### Place & stack
- **T** (on foot) spends **2 Wood** and places a 1.2m cube in front of the player.
- Cubes snap to a grid and stack on the highest cube in that cell (or terrain / castle floor).
- Player can stand on cubes (`groundYAt` includes cube tops).
- Cap: 48 cubes. No placing on the castle plateau.
- Cooldown 0.28s so you cannot machine-gun the stack.

### Combat rules
- Void Walkers **bounce off** cubes (repulsion). They never subtract cube HP.
- **Abyssal Wyrm** body proximity and fire breath damage cubes.
- **Abyssal Hunter** contact and fire breath damage cubes (2 hits to smash).
- Smash spawns wood-chip particles.

### Persistence
- Save schema **version 8** adds `woodCubes: [{x,y,z}]`.
- Load rebuilds cubes after `clearPlayerWorldEdits()`.
- Older saves still load (missing array skipped).

### UX
- Tutorial + pause sheet + footer hint mention T.
- Minimap brown squares + legend "Cubes".
- Toast: need 2 wood / limit / stacked / castle block.

## Preserved

All v31 systems: world-edit save (camps, ponds, chopped trees), SFX, quality mute, car, gems, coins, bosses, escalation, armor lap. Nothing removed.

## Validation

- Extracted module: `node --check` clean.
- Key T does not override existing bindings.
- Cube helpers reuse existing particle / toast / terrain APIs.
- Restore is one-shot on load; no per-frame leak beyond the 48-mesh cap.

## Self-review scores (v32)

| Category        | Score | Notes |
|-----------------|-------|-------|
| Architecture    | 7     | Still one file; cube helpers sit next to camp/dig. |
| Maintainability | 8     | v32 markers; spawn/clear pair matches camps. |
| Performance     | 8     | Hard cap 48 shared geometry. |
| Readability     | 8     | Same style as placeCamp / digHole. |
| User Experience | 8     | Requested sandbox block; T is discoverable. |
| Stability       | 8     | Older JSON still loads; alive flags on smash. |

**Biggest remaining weakness:** Monolith file + early-game sparsity + no ambient bed.

**Highest-value next:** Quality-gated ambient wind/pad, or first-minute gem/coin clustering (v31 changelog leftover) — not more systems.

**Automation opportunity:** CI fail if a new `ethereal-expanse-vN.html` is under 50KB (the repo still has empty shells for v16–v29).
