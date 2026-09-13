# Chicken Fusion Simulator - Merge & Idle Tycoon

An addictive, high-polish chicken fusion simulator built with HTML5, CSS3, and modern JavaScript.

## Features

- **9x9 Farm Plot**: 81 interactive cells supporting smooth drag-and-drop merging and touch interactions.
- **Rich Chicken Tiers with Unique Visual Artwork**:
  - *Dirt Chicken* (Lvl 1)
  - *Eggshell Chicken* (Lvl 2)
  - *Cool Chicken* (Lvl 3, sunglasses & chain)
  - *Punk Rooster* (Lvl 4, mohawk & spikes)
  - *Golden Chicken* (Lvl 5, royal gold & crown)
  - *Skeleton Chicken* (Lvl 6, cyan glowing gaze & ribcage)
  - *Inferno Chicken* (Lvl 7, volcanic lava & flame crests)
  - *Cyber Mecha Chicken* (Lvl 8, titanium armor & laser visor)
  - *Void Cosmic Chicken* (Lvl 9, cosmic rings & stardust)
  - *Celestial God Chicken* (Lvl 10, divine angel wings & halo)
  - *Quantum Paradox Chicken* (Lvl 11)
  - *Phoenix Overlord* (Lvl 12)
  - + endless procedural tiers beyond!
- **Dynamic Economy & Bundles**:
  - Buy single chickens or bundles of **1, 5, 10, 20**.
  - Purchase cost increases exponentially per chicken.
- **Smart Auto-Fusion & Deadlock Refund Mechanism**:
  - When purchasing bundles, if the 9x9 plot fills up, the farm automatically detects and merges matching pairs to create room.
  - If the plot is completely full and no fuses remain possible, the farm automatically refunds the remaining undelivered chickens at:
    $$\text{Refund Amount} = \text{Remaining Chickens} \times \text{Current Single Chicken Price}$$
- **"⚡ Fuse All" Instant Action**:
  - Instantly cascade-merges all matching chickens on the board with explosive visual effects.
- **Petting Mechanic**:
  - Tap/click chickens directly to pet them for bonus coin bursts.
- **Web Audio FX & Particle Engine**:
  - Synthesized pops, fusion chords, clucks, and feather explosion particles.
- **Codex & Offline Idle Income**:
  - Track discovered chickens and collect earnings when returning to the game.

## How to Run

Launch the local HTTP server in PowerShell:

```powershell
python -m http.server 5179 --bind 127.0.0.1
```

Then open your browser to `http://127.0.0.1:5179/`.
