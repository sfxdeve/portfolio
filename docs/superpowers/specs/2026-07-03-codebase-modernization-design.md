# Codebase Modernization Design

## Purpose

Modernize and standardize the portfolio codebase without rewriting the app or changing the portfolio's identity. The cleanup should make the current stack feel intentional, align implementation with `SPEC.md`, and keep dependency usage close to current official documentation.

The modernization may include visible polish when it improves consistency or restores spec-aligned behavior. Small dependency additions or removals are allowed only after explicit user approval.

## Current Stack

- TanStack Start and TanStack Router own app shell, file-based routes, route loaders, metadata, not-found behavior, scroll restoration, and navigation.
- MDX frontmatter and typed content helpers own public portfolio content.
- Tailwind CSS v4 owns styling tokens and utility composition.
- shadcn-style primitives and Base UI own low-level UI behavior where appropriate.
- TanStack Form and Zod own contact form state and validation.
- GSAP owns intentional narrative motion.
- Vitest, Playwright, axe, and Sharp own verification.

## Principles

- One source of truth for public portfolio content: MDX frontmatter and typed content helpers.
- Route behavior must match the information architecture in `SPEC.md`.
- UI primitives stay generic; portfolio-specific visuals live in portfolio components.
- Motion is opt-in, scoped, cleanup-safe, and reduced-motion aware.
- Tests protect content boundaries, route behavior, accessibility, layout, and focused logic.
- Dependency changes are proposed before implementation.

## Lane 1: Routes And Content Model

Standardize content helpers around explicit public document collections:

- `publicDocuments`: every public MDX document.
- `publicShippedWorkDocuments`: public documents where `kind === 'shipped-work'`.
- `publicExplorationDocuments`: public documents where `kind === 'exploration'`.

Route behavior should be explicit:

- `/` reads public shipped work for Selected Work and public exploration content for the exploration interlude.
- `/work/$slug` renders public shipped work and public explorations.
- Draft documents remain unavailable publicly.
- Unknown slugs throw TanStack Router `notFound()` and render the shared not-found component.

Adjacent navigation remains scoped to shipped work. Explorations get no previous/next pager unless the portfolio later has multiple public exploration pages and a specific exploration navigation model.

This restores the Fraud Detection System as a public exploration detail page while keeping it clearly separate from shipped work.

## Lane 2: Component And Layout System

Introduce a small portfolio layout layer:

- `PageSection` for common section padding, max width, IDs, and labels.
- `SectionIntro` for chip, heading, and supporting paragraph spacing.
- An evidence layout component for claim/evidence pairing in case-study pages.
- A shared page hero component only if it removes real duplication without flattening distinct page needs.

Keep generic UI primitives in `src/components/ui`:

- `Button`
- `Card`
- `Field`
- `Input`
- `Textarea`
- `Separator`
- `Empty`
- `AspectRatio`

These primitives should remain close to shadcn/Base UI conventions and avoid portfolio-specific language. Portfolio visual treatments such as orbit styling can be exposed as consistent variants or wrappers, but should not spread one-off class strings across pages.

Standardize typography through repeated component patterns:

- Hero headline
- Section headline
- Case-study chapter headline
- Body lead
- Muted body
- Caption

The goal is not abstraction for its own sake. The goal is that each hero, section, card, form, and evidence figure follows an identifiable pattern.

## Lane 3: Motion And Visual Polish

Keep the cinematic direction but make motion predictable:

- `useReducedMotion` remains the accessibility gate.
- `useOrbitReveal` may become a general `useRevealMotion` if the same reveal pattern is reused.
- GSAP is reserved for coordinated narrative animation, not simple hover or CSS-only transitions.
- Every GSAP hook is scoped to a ref and follows the official `useGSAP` cleanup pattern.
- Reduced motion leaves content visible and avoids hidden initial states.

Visual polish should focus on consistency:

- Case-study hero heading scale stays aligned with the Selected Work heading scale.
- Cards use consistent radius, padding, border, and shadow rules.
- Evidence images keep predictable aspect handling and avoid accidental cropping where inspectability matters.
- Orbit assets stay behind orbit components instead of leaking into page components.
- The exploration interlude uses conceptual evidence that feels intentionally different from shipped screenshot evidence.

Avoid adding new motion until the existing motion vocabulary is standardized.

## Lane 4: Tests And Quality Gates

Keep four verification layers:

- Content unit tests validate MDX metadata, duplicate slugs, draft/public filtering, shipped vs exploration separation, public-safe metadata, and evidence dimensions.
- Route e2e tests verify homepage sections, shipped work routes, exploration route, draft/unknown 404s, metadata, and adjacent navigation.
- Accessibility and layout e2e tests run axe checks and no-horizontal-overflow checks on representative desktop and mobile viewports.
- Focused logic tests cover orbit geometry and route/content helper behavior where browser testing is unnecessary.

Tests should describe product contracts rather than component internals. Remove or loosen tests that freeze incidental wording or implementation details unless the wording is part of the public spec.

The full gate remains:

```bash
pnpm check
```

During implementation, narrower checks can run after each lane:

```bash
pnpm test:unit
pnpm exec playwright test tests/e2e/work-routes.spec.ts
pnpm exec playwright test tests/e2e/home.spec.ts
pnpm build
```

## Implementation Order

1. Restore and standardize the route/content model.
2. Extract layout and section patterns where they remove repetition.
3. Standardize visual and motion patterns.
4. Update tests to protect the final product contract.
5. Run the full verification gate.

This order keeps the public portfolio contract clear before polishing components around it.
