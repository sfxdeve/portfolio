# Phase 1 Repository Consolidation

After multiple agent runs built the portfolio, this ADR records the first consolidation pass. Phase 2 (SPEC alignment: cinematic motion, display typography) is deferred.

## Phase 1 scope (this pass)

**Dev hygiene**

- Remove unused `tw-animate-css` dependency
- Add `routes:gen` script for TanStack Router codegen
- Cross-link macOS/Mise and Cloud VM setup docs
- Document evidence asset conventions in README
- Fix shadcn `components.json` hooks alias

**Code architecture**

- Consolidate motion hooks under `src/components/motion/`
- Extract shared layout primitives: claim/evidence grid, story route link, hero orbit backdrop
- Standardize OrbitChip tone on document `kind`
- Export and reuse `AdjacentPublicDocument` type from content layer
- Pass case-study document through route loader (single lookup)
- Render validated `hero.role`, `hero.summary`, and `hero.outcome` on case-study pages
- Standardize "case study" terminology in 404 and route metadata
- Simplify contact form to JS-only mailto submission

## Phase 2 scope (completed in ADR 0003)

See [0003-phase-2-spec-alignment.md](./0003-phase-2-spec-alignment.md).
