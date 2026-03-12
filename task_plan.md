# Task Plan: Stellar Carrion Prototype Expansion

## Goal
Refine the between-runs hangar into a cleaner, more game-native command
interface that is tabbed, portrait-efficient, and focused on fast player
actions instead of long-form scrolling.

## Current Phase
Phase 4 - Handoff

## Phases

### Phase 1: UI Audit
- [x] Audit the current hangar layout against portrait-mobile usability
- [x] Identify the highest-friction problems in information hierarchy and action flow
- [x] Record the redesign plan in planning files
- **Status:** complete

### Phase 2: Tabbed Command Layout
- [x] Replace the stacked hangar page with a compact command deck + tabbed panes
- [x] Preserve all current hangar actions while reducing persistent vertical footprint
- [x] Keep launch readiness and primary actions visible without scrolling
- **Status:** complete

### Phase 3: Wiring & Verification
- [x] Add hangar tab state and pane switching behavior in runtime code
- [x] Revalidate craft/install/repair/deploy flows in the new layout
- [x] Run production build verification
- **Status:** complete

### Phase 4: Handoff
- [x] Record the redesign decisions and remaining UI gaps
- **Status:** complete

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| The hangar needs to behave like a command surface, not a webpage | Portrait mobile space is too limited for stacked document sections |
| One active pane at a time is preferable to showing all hangar systems at once | The highest-frequency actions should be immediate and the rest should be a tab away |
| Launch readiness and deploy must remain visible regardless of active pane | The player should never have to scroll to start the next run |

## Errors Encountered
| Error | Resolution |
|-------|------------|
| The first hangar pass still reads as a long document on portrait phones | Reworking it into a tabbed command layout |
| Nested scroll regions inside the first hangar pass would have felt clumsy on mobile | Moved to a single active pane with one scroll context at a time |
