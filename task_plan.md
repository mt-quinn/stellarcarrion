# Task Plan: Stellar Carrion GDD + First Playable Slice

## Goal
Capture the current game concept in a low-fi GDD and deliver a first playable
portrait Three.js prototype that can validate movement, combat, looting, and
extraction pressure.

## Current Phase
Phase 4 - Verification & Handoff

## Phases

### Phase 1: Requirements & Discovery
- [x] Understand user intent
- [x] Identify baseline constraints
- [x] Capture current concept in findings.md
- [x] Resolve enough design holes to build a low-fi GDD and first slice
- **Status:** complete

### Phase 2: System Framing
- [x] Define the macro gameplay loop
- [x] Define combat, salvage, and ship-building loops
- [x] Define progression and loss/persistence rules
- **Status:** complete

### Phase 3: GDD + Prototype Build
- [x] Build the GDD outline
- [x] Draft the first pass of the game design document
- [x] Scaffold a portrait-first Three.js app shell
- [x] Implement a sparse random sector prototype with factions, cargo, and extraction
- [x] Stabilize touch controls and transient combat/effect handling
- **Status:** complete

### Phase 4: Review & Iteration
- [x] Identify contradictions and unresolved risks
- [x] Refine the document around player-facing decisions
- [x] Run install and production build verification
- **Status:** complete

### Phase 5: Delivery
- [x] Hand off the agreed GDD draft
- [x] Call out prototype priorities and next design questions
- **Status:** complete

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Discuss specifics before writing the GDD | The concept has several major system gaps that would make early documentation vague or misleading |
| Use low-fi discovery first | The goal is alignment on core systems before polishing prose |
| Treat the game as portrait and mobile-first from the start | Screen orientation and touch constraints will affect combat, readability, and UI architecture |
| Keep the game entirely ship-to-ship in space | Preserves focus and avoids splitting scope across space and interior gameplay |
| Use generous mid-run capacity but strict extraction capacity | Preserves smooth looting while creating meaningful end-of-run pressure |
| Lock ship building to between runs | Keeps runs propulsive and legible during combat/scavenging play |
| Make aiming and firing the same continuous action | Supports touch readability and propulsive twin-stick combat |
| Let extraction inventory management happen in real time | Turns extraction into a pressured decision scene instead of a safe menu |
| Always provide a free replacement chassis | Prevents total dead-end wipes while keeping ship loss meaningful |
| Use targetable physical hardpoints instead of abstract part health | Makes SPAZ-style ship disassembly a core readability and combat pillar |
| Balance ships through both hardpoints and reactor power budget | Creates broader build variety and stronger balancing levers |
| Use same-item combination to climb rarity | Keeps loot legible and supports a clear long-term relevance story |
| Ship the first slice with a sparse random map | Lets us test feel before overcommitting to authored topology |
| Use a low-resolution internal render size plus CSS pixelation | Achieves the prototype pixel-filter look with minimal pipeline complexity |
| Keep movement as a dynamic left-side touch stick and aiming as a fixed right-side pad | Preserves touch clarity in portrait while still supporting desktop inputs |

## Errors Encountered
| Error | Resolution |
|-------|------------|
| `npm install` could not be completed inside the default sandbox | Re-ran with escalated permissions and completed install successfully |
| Vite warned that the production JS bundle exceeds 500 kB | Accepted for the first slice and noted code-splitting as a follow-up optimization |
