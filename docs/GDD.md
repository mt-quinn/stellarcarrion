# Stellar Carrion

## Premise

`Stellar Carrion` is a portrait-oriented web extraction shooter built with
Three.js. The player is a scavenger operating in a high-risk profession:
harvesting the remains of ships whose crews have been wiped out by Warp Demons.
Runs take place in large, sparse sectors of space filled with Carrion, pirates,
scavengers, law enforcement, hazards, and extraction zones at the edges of the
map.

The game aims for a propulsive top-down twin-stick feel in the lineage of
`Space Pirates and Zombies`, with a pixel-filtered 3D presentation that evokes
the technical eeriness of `Dead Cells`, `Teleglitch`, and `Event Horizon`.

## Pillars

1. **Propulsive ship-to-ship combat**
   The game should feel immediate and readable on a phone screen. Aiming and
   firing are the same action. Enemy ships break apart component by component.

2. **High-risk extraction decisions**
   Mid-run looting is generous, but extraction is strict. The player can carry
   a lot while exploring, then must decide what actually makes it into FTL-safe
   storage before the jump finishes.

3. **Loot stays relevant**
   Components can be combined with matching duplicates to climb the rarity
   ladder. Unwanted items can be processed into currencies. Blueprints and mods
   turn even failed runs into future value.

4. **Persistent ship rebuilding**
   Runs are disposable, but the hangar is not. The player repairs, rebuilds,
   crafts, and tunes their ship between expeditions.

5. **Digital sci-fi horror**
   Warp Demons are not conventional enemies. They are a roaming macro-threat
   that transforms the map into a field of temptation and dread.

## Target Experience

- **Session length:** 5-15 minutes
- **Primary platform:** touch-first phone play
- **Secondary support:** mouse/keyboard and controller
- **View:** portrait, full-screen, top-down
- **Map generation:** sparse, random, and prototype-friendly for now, with soft
  center-weighting for richer Carrion and more dangerous encounters

## Core Run Loop

1. Launch into a large sector of space.
2. Explore Carrion fields, hazards, and enemy territory.
3. Break apart derelicts and hostile ships to gather loot.
4. Balance greed against ship damage and increasing Warp Demon pressure.
5. Reach an extraction zone at the edge of the map.
6. Activate FTL and manage cargo in real time during the countdown.
7. Extract what fits in FTL-safe storage. Anything else is lost or processed.
8. Return to base to rebuild, craft, and prepare for the next run.

## Combat Model

- Aiming and firing are unified.
- Weapon behavior varies by weapon family and fire cadence.
- Ships are built from **discrete hardpoint objects** that can be individually
  destroyed by hitting specific physical locations.
- Ships are destroyed in one of two ways:
  - **Hull integrity loss** from sustained unshielded damage
  - **Reactor core destruction**, which kills the ship immediately

### Weapon Families

- Constant-fire beam lasers
- Rapid-fire lasers and machine guns
- Medium and low rate-of-fire machine guns
- Fast, medium, and slow rockets (unguided)
- Fast, medium, and slow missiles (limited tracking after launch)

### Ship Systems

- Reactor
- Shields
- Engine
- Hull / armor
- Scanners
- Cargo
- FTL drive
- Salvage processor / refinery
- Weapon hardpoints

## Build Rules

- Hardpoints determine what categories of equipment can be mounted.
- Weapon hardpoints are intentionally broad rather than over-specialized.
- Reactor output is a separate budget from physical slots.
- A loadout is invalid if total power draw exceeds reactor capacity.
- This makes power consumption an important balancing tool and a meaningful
  build axis.

## Extraction Loop

- Extraction happens at small zones near the edge of the map.
- The player activates the FTL drive and must stay inside the zone while a
  timer counts down.
- During that timer, the game continues in real time.
- The player can open cargo UI and:
  - Mark items for FTL-safe storage
  - Combine matching items into higher-rarity versions
  - Grind items down into resources
- If the timer completes while the player is still in-zone:
  - The player jumps away
  - Anything outside FTL-safe storage is auto-jettisoned
- Enemies do not cancel the timer, but can still kill the player before the
  jump completes.

## Loot Model

### Loot Types

- Whole ship components
- Currency-style resources: Scrap, Tech, Biomass, Credits
- Blueprints for chassis and components
- Mods for stat-specific enhancement

### Rarity Ladder

- Corroded
- Common
- Rare
- Epic
- Legendary

Crafting produces baseline items. Better items are created by combining matching
duplicates:

- Same item + same item -> improved version of itself
- Higher rarity means better stat roll ranges, more inherent beneficial traits,
  and more user-facing mod slots

### Mod Slots by Rarity

- Corroded: 0
- Common: 1
- Rare: 2
- Epic: 3
- Legendary: 4

Mods are removable, socketable, and simple: they enhance stats that already
exist on the item.

## Factions

### Pirates

- Always hostile
- Seek to kill and loot

### Scavengers

- Neutral by default
- May flee or fight when competing for the same salvage

### Law Enforcement

- Attacks pirates on sight
- Neutral to player until Carrion is being broken up in view
- Helps against pirates
- Escalates if the player attacks them

### Warp Demons

- Roaming macro-threat
- Spawn after the run begins and continue arriving over time
- Approach ships, attach, kill organic life, and leave intact derelicts
- Function as moving risk/reward pressure rather than a fair combatant

## Between-Run Loop

- Repair and rebuild the ship at base
- Craft components from resources and blueprints
- Tune builds with mods
- Store chassis and spare components
- Recover from wipes with a free baseline chassis

### Free Replacement Chassis

- The player always has access to a free fallback chassis
- It comes with functional but economically worthless Corroded components
- Players can invest heavily to assign a better blueprint as the permanent free
  replacement chassis

## Chassis Philosophy

- Chassis should feel readable and meaningfully different without turning the
  game into spreadsheet optimization
- Main differentiators:
  - Hardpoint layout
  - Speed
  - Structural integrity
  - Stat profile

They should not feel like entirely different genres of ship.

## Visual Direction

- Simple 3D forms rendered through a low-resolution pixel filter
- Strong silhouette readability
- CRT/digital-horror distortion language
- Color palette that distinguishes factions and loot quickly on mobile
- Warp Demons should feel like corrupted signal intrusions rather than monsters

## Prototype-First Assumptions

The first playable slice should favor immediacy over completeness:

- Sparse random map generation
- Soft clustering instead of authored zones
- Limited enemy roster
- One or two chassis profiles represented visually
- Simplified base economy
- Enough cargo/extraction interaction to test pressure and legibility

## Open Questions

- Final map topology and long-term risk-band structure beyond the sparse
  prototype map
- Launch enemy roster and faction ship classes
- Exact post-run economy pacing
- Chassis count and launch archetypes
- Portrait combat readability for subsystem targeting
- Concrete horror events beyond Warp Demon presence

## First Prototype Goals

1. Make moving, aiming, and shooting feel good on a phone screen.
2. Confirm that sparse map traversal is still tense and interesting.
3. Test whether the extraction cargo decision feels dramatic in real time.
4. Validate that component-level ship destruction is readable.
5. Learn whether Warp Demon pressure creates exciting salvage choices.
