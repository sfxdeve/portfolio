# Phase 2 SPEC Alignment

This ADR records the second consolidation pass: closing product and experience gaps named in SPEC §6, §10, §11–§12, and §16.

## Implemented

- **Display typography:** Fraunces Variable for headings and narrative statements; Geist Variable remains the supporting sans-serif.
- **About / Approach:** Homepage `#approach` section and primary nav link per SPEC §6.
- **Cinematic scroll motion:** GSAP ScrollTrigger reveals for homepage sections, case-study chapters, exploration signals, and contact. Desktop chapters with multiple evidence items pin the claim column while evidence sequences in.
- **MDX body styling:** Explicit `.mdx-body` styles replace inert Tailwind `prose` classes.
- **Evidence figures:** `sizes`, `decoding="async"`, and `fetchPriority` hints for layout stability.
- **Shadcn trim:** `card.tsx` exports reduced to components used by the app.

## Intentionally deferred

- Multi-width responsive srcset generation (requires build-time image pipeline).
- Full scroll-scrubbed evidence transitions and exploration diagram assembly (future motion increment).
- Dark mode theme toggle (tokens remain unused).

## Reduced motion

All ScrollTrigger and reveal motion respects `prefers-reduced-motion`. Content remains fully readable without animation.
