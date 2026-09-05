# Ethereal Expanse v36 Changelog

**Base:** ethereal-expanse-v35.html  
**Date:** 2026-09-05  
**Type:** Companions combat roles + rocks/sword + SFX fix + pen NPCs

## Requested features

- Chickens fly and attack the dragon after **10 companions** captured  
- Horses circle the player and **block Void Walker attacks**  
- Dogs gather **rocks** (like beavers gather wood)  
- **10 rocks** unlock dog capture; dog leaders recruit more dogs that also gather rocks  
- **20 rocks + 20 wood** → craft a **sword** (stronger beams)  
- Friendly **NPC builders** spend wood to **pen cows**  
- **Sound not working** — fixed

## Changes

### SFX fix (critical)
- AudioContext is always created (no longer blocked when quality is Low).
- Mute is applied via master gain, not by refusing to open the context.
- Unlock/resume on **every** pointer/key/touch (browsers suspend aggressively; `once: true` was a common failure mode).
- Master gain raised (~0.38). Quality toggle still silences on Low.

### Rocks
- 36 collectible rocks on the map (HUD).
- Player picks up by walking near them.
- Soft respawn far from the player.
- **10 rocks** → dog capture unlocked.

### Dogs
- 3 wild dogs on the map.
- Capture gated on `dogUnlocked` (10 rocks) — same pattern as beaver/trees.
- Captured dogs path to rocks and deliver them to your inventory on a timer.

### Horses
- Captured horses **orbit** the player.
- Walker contact damage is **fully blocked** while any horse companion is active.
- Fire breath still hurts (horses don’t stop dragon fire).

### Chickens
- When `companions.length >= 10` and the Wyrm is active, chickens **fly** at it and peck for damage.
- One-time toast when the assault begins.

### Sword (K)
- Costs **20 rocks + 20 wood**.
- HUD sword panel appears.
- Beam damage vs walkers: 2 instead of 1; vs Wyrm/Hunter: 4 instead of 2.

### Pen builders (3 NPCs)
- Friendly humanoids seek unpenned cows.
- If you have ≥4 wood, they build a post-and-rail pen and deduct wood.
- Penned cows stay near the pen center.

### Save
- Additive fields: `rocks`, `dogUnlocked`, `hasSword` (plus existing companion list).

## Validation
- `node --check` clean on extracted module.
- Brace/paren balance 0.

## Playtest checklist
1. Click/keys → hear SFX (raise quality with **Q** if muted).  
2. Pick up 10 rocks → capture a dog → dogs fetch more rocks.  
3. Capture a horse → walkers should not damage you on contact.  
4. Get to 10 companions with Wyrm up → chickens dive.  
5. Gather 20R+20W → **K** craft sword → stronger beams.  
6. Leave wood in inventory → builders pen a cow.

## Scores (v36)

| Category | Score |
|----------|-------|
| Architecture | 7 |
| Maintainability | 7 |
| Performance | 7 |
| Readability | 7 |
| UX | 8 |
| Stability | 7 |

**Biggest remaining weakness:** Boxy meshes; builders silently compete for player wood (may surprise).  
**Next:** SFX volume slider, or confirm pen cost is paid only with player consent if that feels wrong in playtest.
