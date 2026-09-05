# Ethereal Expanse

A browser game you can play right now — no install, no account.

Explore a floating island world, fight Void Walkers, drive a car, chop trees, capture animal companions, and take on dragons. Built with Three.js as a single-page sandbox.

### [▶ Play now](https://usabandit33.github.io/ethereal-expanse-play/)

---

## What you can do

- **Explore** hills, a castle, ponds, and a day/night sky
- **Fight** Void Walkers and larger bosses (Wyrm / Hunter)
- **Gather** wood, rocks, gems, coins, and pearls
- **Build** camps, dig water holes, place wood cubes
- **Drive** a car (coins become fuel)
- **Capture companions** — wolves, cats, dogs, beavers, cows, chickens, horses
- **Craft** a sword when you have enough rocks and wood

---

## Controls

| Key | Action |
|-----|--------|
| **WASD** | Move |
| **Shift** | Run / boost (in car) |
| **Space** | Jump / handbrake |
| **F** or **LMB** | Energy beam |
| **E** | Chop nearest tree |
| **B** | Build camp (5 wood) |
| **G** | Dig a water hole |
| **T** | Place a wood cube |
| **R** | Capture a nearby animal |
| **K** | Craft sword (20 rocks + 20 wood) |
| **V** | Enter / exit the car |
| **P** or **Esc** | Pause |
| **M** | Minimap legend |
| **Q** | Graphics quality |
| **C** | Cheat console |

Tip: click the game once so sound can unlock in the browser.

---

## Companions (quick guide)

| Animal | How to unlock | What they do |
|--------|---------------|--------------|
| **Dog** | Collect 10 rocks, then **R** | Gathers more rocks |
| **Beaver** | Chop 10 trees, then **R** | Chops trees for wood |
| **Horse** | Capture with **R** | Circles you and blocks walker attacks |
| **Chicken** | Capture with **R** | At 10 companions, dive the Wyrm |
| **Wolf / cat / cow** | Capture with **R** | First of each kind recruits more |

Friendly builders may spend a little of your wood to pen cows.

---

## Save / load

Use **P** → **Save Progress** to download a JSON save.  
**Load Progress** restores it later (including camps, holes, and companions).

---

## For contributors

| Branch | Use |
|--------|-----|
| `main` | Stable build + GitHub Pages |
| `develop` | Work-in-progress |

```
index.html                 # What Pages serves
versions/builds/           # Historical full builds
versions/changelogs/       # Per-version notes
scripts/                   # CI build-gate checks
```

Only commit full builds over **50 KB**. Tiny placeholder HTML files are rejected by CI.

---

Made for fun in the browser. Click **Play now** and enjoy the island.
