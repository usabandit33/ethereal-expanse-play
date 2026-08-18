# Ethereal Expanse v23 Changelog

**Base:** ethereal-expanse-v22 (full local audio build)  
**Date:** 2026-08-18  
**Type:** Second companion (cat) after ground dragon — post-slice combat assist

## Player problem addressed

Post-armor / post-second-boss stretch can feel empty. The dog already exists as a companion; adding a second companion that actually helps fight Void Walkers gives a clear reward for finishing the Abyssal Hunter and softens late escalation pressure without inventing a whole new system.

## Changes

### Cat companion
- Spawns when the ground dragon (Abyssal Hunter) is defeated.
- Blocky orange-tabby style that matches the existing Steve-like aesthetic.
- Follows the player (offset from the dog so they don’t stack).
- Every ~2.4–3.2 s, if a Void Walker is within ~11.5 units, the cat claws it for 1 damage + particles + soft SFX.
- Can finish off walkers and award the normal pearl/reputation (with “cat assist” toast).
- Hides while driving the car (same as the dog).
- Toast: “🐈 A shadow cat joins the hunt”

### Preserved
- All prior systems: audio SFX, escalating walkers, dual dragons + fire breath, camps, dig, car/fuel, armor, minimap, quality, cheats, save, dog, night pressure, etc.

## Validation
- Module script passes `node --check`.
- No systems removed.
- Cat attack reuses existing walker death / pearl / respawn paths so economy stays consistent.

## Self-review scores (v23)

| Category          | Score | Notes |
|-------------------|-------|-------|
| Architecture      | 7     | Still monolithic; cat mirrors dog pattern cleanly. |
| Maintainability   | 8     | Parallel to dog; attack logic localized. |
| Performance       | 8     | One extra mesh group + light AI tick. |
| Readability       | 8     | Clear v23 markers. |
| User Experience   | 9     | Real post-boss reward that helps with combat. |
| Stability         | 8     | Same visibility / vehicle rules as dog. |

**Biggest remaining weakness:** Single-file size + environment still a bit sparse in open areas.  
**Highest-value next:** Modest density/polish pass (grass clusters, rock variety, or night atmosphere) or a soft post-slice optional goal — only if testing still shows boredom.
