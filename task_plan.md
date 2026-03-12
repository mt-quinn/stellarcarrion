# Task Plan: Stellar Carrion Prototype Expansion

## Goal
Expand the portrait Three.js prototype beyond the core run loop by adding a
between-runs hangar layer that supports ship persistence, repairs, crafting,
and equipment changes.

## Current Phase
Phase 4 - Verification & Handoff

## Phases

### Phase 1: Hangar Framing
- [x] Audit the current run flow and identify where the hangar layer should hook in
- [x] Define the initial persistent progression model for chassis, components, blueprints, and stash items
- [x] Record the implementation plan in planning files
- **Status:** complete

### Phase 2: Hangar UI & Flow
- [x] Replace the old run summary overlay with a real hangar layer
- [x] Add ship bay, stash, and fabricator surfaces that work in portrait
- [x] Route launch/extraction/death through the hangar instead of auto-restarting runs
- **Status:** complete

### Phase 3: Persistence & Equipment Systems
- [x] Make an active ship build persist between runs
- [x] Carry extraction damage home for repairs
- [x] Restore the player to a free replacement chassis on death
- [x] Support crafting and installing components/chassis from blueprints and stash
- **Status:** complete

### Phase 4: Verification & Handoff
- [x] Run production build verification
- [x] Record the new system behavior, gaps, and follow-up priorities
- **Status:** complete

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| The hangar should replace the old run summary popup rather than stack on top of it | The prototype needs a real between-runs layer, not another modal |
| The first hangar pass should focus on persistence and feel, not final economy tuning | The user wants to start feeling the larger game loop now |
| Extraction should carry hull damage home while death should force a free replacement build | This preserves the stated loss model without blocking quick iteration |
| Runs should launch from an active ship build assembled in the hangar | The prototype needs a visible connection between salvage, crafting, and combat |

## Errors Encountered
| Error | Resolution |
|-------|------------|
| The current prototype still assumes fixed cargo/extraction/scanner stats in several runtime paths | The hangar work will centralize these as derived ship-build values |
| The hangar messages would have rendered behind the new overlay | Raised the message log above the hangar layer so repair/craft/install feedback remains visible |
