# Stellar Carrion

Prototype workspace for a portrait-oriented Three.js extraction shooter with
pixelated 3D visuals, sparse procedural space maps, and touch-first controls.

## Current Slice

The first playable slice focuses on feel, not completeness:

- Portrait full-screen playfield
- Touch-first twin-stick controls, plus mouse/keyboard and controller support
- Sparse random space map with Carrion, enemies, asteroids, and extraction zones
- Ship-to-ship shooting with targetable component hardpoints
- Loot pickups, cargo management, FTL-safe storage, and real-time extraction
- Warp Demon pressure with manual trigger for faster testing

## Commands

```bash
npm install
npm run dev
```

Then open the local Vite URL in a browser.

## Files

- `docs/GDD.md` - low-fi game design document
- `src/main.js` - current prototype implementation
- `src/styles.css` - HUD, cargo UI, and mobile presentation
- `task_plan.md`, `findings.md`, `progress.md` - working memory for planning

## Prototype Notes

- The map is intentionally sparse and procedurally random for now.
- Extraction and cargo rules are implemented as a feel prototype, not as a
  complete economy.
- The base-building and long-term crafting loop is documented but only lightly
  represented in this slice.

