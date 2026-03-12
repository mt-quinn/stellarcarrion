# Findings & Decisions

## Requirements
- Game title: Stellar Carrion
- Platform/tech: full-screen web game using three.js with 3D assets and a pixel-art filter treatment
- Camera/play style: portrait-oriented top-down twin-stick space shooter
- Core references: Space Pirates and Zombies for combat feel, Dead Cells for art-tech vibe, Event Horizon for thematic tone
- Structure: single-player roguelike extraction shooter
- Fantasy: the player is a scavenger harvesting ships whose crews died to FTL Demons
- Threats: FTL Demons, rival scavengers, pirates, and law enforcement
- Progression fantasy: build and rebuild the ship from salvaged field parts
- Economy/system goal: salvaged parts should stay relevant by combining into stronger components over time
- Run structure: the player spawns into a large space zone with derelicts, hazards, enemies, and extraction zones at the edges
- Extraction loop: collect as much as possible, survive, then reach an edge extraction zone and escape
- Carry-capacity twist: mid-run carrying is generous, but extraction requires meeting a stricter FTL jump limit, forcing late pressure decisions
- Controls: touch-first phone game, with support for mouse/keyboard and controller
- Touch controls: dedicated thumbstick for directional shooting on one side, dynamic drag-anywhere movement control elsewhere
- Combat/salvage model: all salvage is acquired by shooting ships apart from inside the player ship; no boarding or interior exploration
- Mid-run ship changes: the player cannot modify the ship during a run; decisions happen through loot selection and extraction choice
- Between-run rebuilding: the player repairs and upgrades at base between runs
- Part categories: engines, shields, generator, cargo capacity, FTL drive, scanners, hull armor/integrity
- Hardpoints: ship chassis define weapon hardpoints, but weapon slots are intentionally broad and legible rather than highly technical
- FTL drive upgrade axes: extraction capacity and extraction wait-time speed can vary independently
- FTL Demons role: an unavoidable escalating threat analogous to a zone collapse/ghost pressure system; they destroy ships and leave behind high-value salvage opportunities
- Death penalty: lose the current ship chassis, attached components, and all loot gathered that outing
- Persistent assets: keep stored chassis/components at base plus longer-term reputation and possibly overall level
- Weapons fire continuously while the aim control is held; aiming and firing are the same action
- Initial weapon families:
  - Constant-fire laser beams
  - Rapid-fire lasers and machine guns
  - Medium and low rate-of-fire machine guns
  - Fast, medium, and low rate-of-fire rockets with no tracking
  - Fast, medium, and low rate-of-fire missiles with limited-range tracking
- Combat target feel: SPAZ-style component destruction with larger ships losing systems over time
- Ship destruction vectors:
  - Hull integrity: reduced by unshielded damage anywhere on the ship
  - Reactor core: specific ship part whose destruction instantly kills the ship
- Extraction sequence: reach a small extraction zone, activate FTL, and remain in the zone for a timed charge-up
- Extraction management is real-time and diegetic: the player opens cargo UI while the world continues around them
- In-field extraction management actions:
  - Combine items into higher-quality versions
  - Grind items into resources/currency
- New ship component class needed: salvage processor/refinery that controls in-field processing speed and efficiency
- If FTL completes while the ship is inside the zone, the player extracts even with excess cargo; anything outside FTL-safe storage is auto-jettisoned
- Enemies do not cancel extraction, but can kill the player before the jump completes
- Base processing is more efficient than field processing, and both can be improved
- Loot categories:
  - Whole ship components with role-specific design variation and rarity variation
  - Resource currencies: Scrap, Tech, Biomass, Credits
  - Blueprints for chassis and ship components; one blueprint grants infinite crafting of that recipe
  - Mods that push component stats further along their procedural axes
- Pirate behavior: always hostile and loot-motivated
- Scavenger behavior: neutral unless competing for the same salvage; then disposition determines flee vs attack
- Law Enforcement behavior:
  - Always attacks pirates
  - Neutral to player/scavengers unless carrion is being actively salvaged
  - Helps the player against pirates
  - Attacks everyone involved when scavengers and player are fighting
  - Gains temporary faction-wide hostility if attacked by the player
- Free replacement chassis system:
  - Player always has a default free chassis after a wipe
  - A blueprint can be permanently assigned to the free-replacement slot at high cost
  - Chassis come with baseline Corroded components that function but have no economic value
- Chassis identity:
  - Similar core handling/play style across chassis
  - Primary differentiation through hardpoints and stat packages
  - Secondary differences through speed, structural integrity, and hardpoint layout
- FTL Demon presentation: digital visual horror with Teleglitch-like aesthetic influence
- FTL Demon mechanical behavior: they approach ships, attach, instantly kill organic life, and leave behind intact derelicts as high-value salvage
- Ship topology: ships are physically assembled from discrete, targetable hardpoint objects that can be individually destroyed by location
- Reactor power: each ship has a reactor component that sets a total power budget; a build is invalid if total component draw exceeds reactor support
- Power is a deliberate balance axis: strong items can be balanced through high power draw, letting weaker low-draw items stay relevant
- Ammo model: no ammunition tracking; combat tuning should focus on rate of fire and cooldowns
- Successful run target: 5-15 minutes
- Demon cadence: no demons at run start; spawn a new roaming Warp Demon every 5 minutes
- Item upgrading rule: same item plus same item upgrades into a better version of itself
- Crafting baseline: crafting produces baseline rarity items which must then be combined up the rarity ladder
- Rarity ladder:
  - Corroded
  - Common
  - Rare
  - Epic
  - Legendary
- Rarity meaning: higher rarity improves stat roll bands, grants more inherent beneficial random mods, and adds more user-accessible mod slots
- Item identity rule: a Legendary component is the best version of itself, but not necessarily optimal in every build or situation
- User mod behavior:
  - Mods are socketable and removable
  - Mods are simple numeric improvements to existing stats on valid component classes
  - Weapon mods only apply to weapons, shield mods to shields, etc.
- User mod slot counts by rarity:
  - Corroded: 0
  - Common: 1
  - Rare: 2
  - Epic: 3
  - Legendary: 4
- Randomly generated inherent modifiers do not consume user mod slots
- Map structure remains intentionally open for now, but should include distinct higher-risk/higher-reward regions plus extraction zones
- Horror delivery direction: consistent digital/glitch horror treatment across the experience, not just on demon encounters

## Research Findings
- The concept is strong at the fantasy/pillars level but still has major holes in system definition.
- The largest unresolved areas are:
  - Map structure and navigation: how regions, points of interest, and extraction zones should evolve beyond the initial sparse random sector
  - Enemy roster: what concrete enemy ship classes exist, and how faction combat differs tactically
  - Between-run economy: crafting costs, repair costs, blueprint acquisition pace, and what a normal post-run rebuild looks like
  - Ship/chassis roster: how many chassis archetypes exist at launch and what they practically change for the player
  - Combat readability in portrait: ship scale, zoom, hit readability, UI load, and handling of component destruction on a small screen
  - Horror event design: how dread manifests through signals, UI corruption, audio, and world events beyond the demons
- These holes no longer block a first playable slice, but they do remain the
  highest-value design questions after the initial prototype.

## Prototype Decisions
- The first playable build should use sparse random sector generation rather
  than authored map topology.
- Carrion should be softly biased toward the center of the map to create a
  simple early risk/reward gradient.
- Extraction zones should remain fixed near the map edges for now so the core
  run loop stays readable.
- The prototype should prioritize movement, aiming, combat readability, cargo
  decisions, and demon pressure over long-term metagame depth.
- The visual target for the first slice should be low-resolution rendering,
  pixelated presentation, and light CRT/glitch horror treatment instead of a
  full post-processing stack.

## Technical Findings
- A low internal renderer resolution with CSS `image-rendering: pixelated` is a
  fast way to approximate the intended pixel-filter aesthetic in the prototype.
- The touch control model is workable as:
  - Dynamic drag-anywhere movement control
  - Fixed right-side aim/fire pad
- Transient VFX must be kept separate from live damaging projectiles; otherwise
  explosion or shield visuals can accidentally participate in collision logic.
- The movement indicator logic needed to be simplified to a single CSS-driven
  knob offset to stay debuggable and predictable on touch devices.
- A production build succeeds with the current scaffold, but the bundled JS is
  still large enough for Vite to warn about chunk size.
- The current runtime already has a good cargo manifest interaction model, so
  the hangar should reuse that slot-based clarity rather than introduce a
  separate abstract inventory language.
- The new hangar layer needs to derive run values from the active ship build:
  hull, shield, speed, cargo capacity, FTL-safe storage, extraction spool time,
  processing yield, and scanner radius all want to come from persistent chassis
  and component data instead of fixed config constants.
- The old end-of-run overlay is now the biggest architectural mismatch in the
  prototype because it bypasses the intended between-runs economy loop.
- A practical first hangar slice works well as a full-screen overlay rather
  than a separate 3D base scene, because it connects the meta loop immediately
  without forcing more scene/rendering complexity before the ship systems are proven.
- Seeding the hangar with a little starting salvage and one alternate chassis
  is useful for prototype evaluation because it lets the user feel repairs,
  swapping, and fabrication right away instead of grinding from zero.
- The right abstraction for this phase is an `activeShip` build that derives
  run-time cargo, FTL-safe storage, extraction spool, minimap range, power
  budget, and hull/shield values from chassis + equipped components.

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Start with a discovery interview instead of direct documentation | Avoids producing a shallow or contradictory GDD |
| Prioritize the highest-leverage questions first | The concept spans multiple intertwined systems and needs top-down clarification |
| Reuse the existing Three.js playfield and build the hangar as an overlay layer first | Lets the prototype gain meta-loop functionality without pausing for a full 3D base scene |
| Treat the hangar as the default state on boot after this phase | Makes the run and repair/crafting loops legibly connected |
| Keep weapons fixed in this hangar pass and focus progression on chassis plus non-weapon ship systems | Delivers the between-runs loop now without exploding the scope of ship-layout logic |
| Auto-archive extracted blueprint items into permanent unlocks when returning to hangar | Keeps the stash readable and turns blueprints into immediate metagame progress |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| The first draft of the movement indicator logic ballooned into redundant inline style writes | Replaced it with a single knob element driven by `--knob-x` and `--knob-y` |
| Effect meshes were sharing projectile-like lifecycle logic | Introduced a separate timed effect path and cleanup flow |
| Dependency installation required network access beyond the default sandbox | Re-ran install with escalated permissions |

## Resources
- planning-with-files
- writing-specs-designs
- mobile-design
