# Codebase Modernization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize the portfolio codebase across routes/content, components/layout, motion/visual polish, and tests while keeping the current stack and restoring spec-aligned public behavior.

**Architecture:** MDX frontmatter remains the content source of truth, with typed document collections exposing public shipped work and public explorations separately. Routes consume those collections explicitly, layout components standardize repeated section patterns, and motion stays scoped behind reduced-motion-aware hooks.

**Tech Stack:** TanStack Start, TanStack Router, TanStack Form, MDX Rollup, Tailwind CSS v4, shadcn-style UI primitives, Base UI, GSAP React, Zod, Vitest, Playwright, axe, Sharp.

---

## File Structure

- Modify `src/content/documents.ts`: expose explicit public document collections and lookup helpers for all public detail documents.
- Modify `tests/content/documents.test.ts`: protect the shipped/exploration collections, public lookup behavior, and adjacent shipped-work behavior.
- Modify `src/routes/work/$slug.tsx`: render both public shipped work and public explorations; keep draft/unknown slugs as not found.
- Modify `tests/e2e/work-routes.spec.ts`: assert the Fraud Detection System route is public, drafts/unknowns still 404, and shipped-work adjacent navigation remains scoped.
- Modify `src/components/home/home-page.tsx`: consume explicit document collections rather than filtering inline.
- Create `src/components/layout/page-section.tsx`: shared section shell for repeated padding/max-width behavior.
- Create `src/components/layout/section-intro.tsx`: shared chip/heading/description pattern.
- Modify `src/components/home/selected-work-section.tsx`, `src/components/home/exploration-interlude.tsx`, `src/components/home/contact-section.tsx`, and `src/components/case-study/case-study-page.tsx`: adopt layout primitives where they reduce repetition.
- Create `src/components/motion/use-reveal-motion.ts`: generalized reveal hook that follows the existing GSAP + reduced-motion pattern.
- Modify `src/components/orbit/use-orbit-reveal.ts`: either delegate to the generalized hook or remove after callers migrate.
- Modify `src/components/home/hero-orbit-section.tsx`: use the generalized reveal hook.
- Modify `tests/e2e/home.spec.ts`: protect the exploration link and any standardized navigation or section behavior.
- Run full verification with `pnpm check`.

No dependency additions or removals are part of this baseline plan. If implementation reveals a real need, pause and ask the user before changing `package.json` or `pnpm-lock.yaml`.

---

### Task 1: Standardize Public Document Collections

**Files:**
- Modify: `src/content/documents.ts`
- Modify: `tests/content/documents.test.ts`

- [ ] **Step 1: Write failing content-helper tests**

Add `publicShippedWorkDocuments`, `publicExplorationDocuments`, and `getPublicDocumentBySlug` to the import from `@/content/documents` in `tests/content/documents.test.ts`:

```ts
import {
  documents,
  filterPublicDocuments,
  getAdjacentPublicWorkDocuments,
  getPublicDocumentBySlug,
  getPublicWorkDocumentBySlug,
  publicExplorationDocuments,
  publicShippedWorkDocuments,
  validateDocuments,
} from '@/content/documents'
```

Replace the test named `looks up only public shipped work documents by slug for detail routes` with:

```ts
it('looks up public detail documents while keeping shipped-work lookup scoped', () => {
  expect(getPublicDocumentBySlug('ecobuiltconnect')?.metadata.title).toBe('EcoBuiltConnect')
  expect(getPublicDocumentBySlug('fraud-detection-system')?.metadata.kind).toBe('exploration')
  expect(getPublicDocumentBySlug('foundation-smoke-test')).toBeUndefined()
  expect(getPublicDocumentBySlug('missing-work')).toBeUndefined()

  expect(getPublicWorkDocumentBySlug('ecobuiltconnect')?.metadata.title).toBe('EcoBuiltConnect')
  expect(getPublicWorkDocumentBySlug('fraud-detection-system')).toBeUndefined()
  expect(getPublicWorkDocumentBySlug('foundation-smoke-test')).toBeUndefined()
  expect(getPublicWorkDocumentBySlug('missing-work')).toBeUndefined()
})
```

Replace the test named `keeps explorations separate from shipped work` with:

```ts
it('keeps public shipped work and public explorations in explicit collections', () => {
  expect(publicShippedWorkDocuments.map(({ metadata }) => metadata.slug)).toEqual([
    'ecobuiltconnect',
    'artisanconnect',
    'rushuploads',
  ])
  expect(publicExplorationDocuments.map(({ metadata }) => metadata.slug)).toEqual([
    'fraud-detection-system',
  ])
  expect(publicExplorationDocuments[0]?.metadata.statusLabel).toMatch(/exploration/i)
})
```

- [ ] **Step 2: Run the content tests to verify they fail**

Run:

```bash
pnpm exec vitest run tests/content/documents.test.ts
```

Expected: FAIL because `getPublicDocumentBySlug`, `publicExplorationDocuments`, and `publicShippedWorkDocuments` are not exported yet.

- [ ] **Step 3: Implement explicit document collections**

In `src/content/documents.ts`, replace the private `publicWorkDocuments` constant with exported collections and add the public lookup helper:

```ts
export const publicShippedWorkDocuments = publicDocuments.filter(
  ({ metadata }) => metadata.kind === 'shipped-work',
)

export const publicExplorationDocuments = publicDocuments.filter(
  ({ metadata }) => metadata.kind === 'exploration',
)
```

Add this helper below the adjacent document types:

```ts
export function getPublicDocumentBySlug(slug: string): PortfolioDocument | undefined {
  return publicDocuments.find((document) => document.metadata.slug === slug)
}
```

Update the shipped-work helpers to use `publicShippedWorkDocuments`:

```ts
export function getPublicWorkDocumentBySlug(slug: string): PortfolioDocument | undefined {
  return publicShippedWorkDocuments.find((document) => document.metadata.slug === slug)
}

export function getAdjacentPublicWorkDocuments(slug: string): AdjacentPublicDocuments {
  const documentIndex = publicShippedWorkDocuments.findIndex(
    (document) => document.metadata.slug === slug,
  )

  if (documentIndex === -1) {
    return {
      nextDocument: undefined,
      previousDocument: undefined,
    }
  }

  return {
    nextDocument: adjacentDocument(publicShippedWorkDocuments[documentIndex + 1]),
    previousDocument: adjacentDocument(publicShippedWorkDocuments[documentIndex - 1]),
  }
}
```

- [ ] **Step 4: Run content tests**

Run:

```bash
pnpm exec vitest run tests/content/documents.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit Task 1**

Run:

```bash
git add src/content/documents.ts tests/content/documents.test.ts
git commit -m "Standardize public document collections"
```

---

### Task 2: Restore Public Exploration Detail Route

**Files:**
- Modify: `src/routes/work/$slug.tsx`
- Modify: `tests/e2e/work-routes.spec.ts`
- Modify: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Write failing route tests for the exploration page**

In `tests/e2e/work-routes.spec.ts`, replace `keeps explorations, drafts, and unknown slugs outside public work routes` with:

```ts
test('renders the public fraud-detection exploration without shipped-work pager links', async ({
  page,
}) => {
  const response = await page.goto('/work/fraud-detection-system')

  expect(response?.status()).toBe(200)
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /designing transaction risk around evidence, severity, and analyst trust/i,
    }),
  ).toBeVisible()
  await expect(page.getByText('Exploration', { exact: true }).first()).toBeVisible()
  await expect(page.getByText(/this was not shipped commercial work/i)).toBeVisible()
  await expect(page.getByRole('link', { name: 'Previous', exact: true })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Next', exact: true })).toHaveCount(0)
})

test('keeps drafts and unknown slugs outside public work routes', async ({ page }) => {
  for (const path of ['/work/foundation-smoke-test', '/work/unknown-work-story']) {
    const response = await page.goto(path)

    expect(response?.status(), path).toBe(404)
    await expect(page.getByRole('heading', { name: /work story not found/i }), path).toBeVisible()
    await expect(page.getByRole('link', { name: 'Back', exact: true }), path).toBeVisible()
  }
})
```

In `tests/e2e/home.spec.ts`, change the exploration route assertion in `presents selected shipped work separately from the exploration` from no link to a visible link:

```ts
await expect(page.getByRole('link', { name: /read the exploration/i })).toHaveAttribute(
  'href',
  '/work/fraud-detection-system',
)
```

- [ ] **Step 2: Run route tests to verify they fail**

Run:

```bash
pnpm exec playwright test tests/e2e/work-routes.spec.ts tests/e2e/home.spec.ts
```

Expected: FAIL because `/work/fraud-detection-system` still returns 404 and the homepage does not link to it.

- [ ] **Step 3: Update the route to render public documents**

In `src/routes/work/$slug.tsx`, change the imports from `@/content/documents` to:

```ts
import {
  getAdjacentPublicWorkDocuments,
  getPublicDocumentBySlug,
} from '@/content/documents'
```

Change the loader lookup to all public documents, while keeping adjacent navigation scoped to shipped work:

```ts
loader: ({ params }) => {
  const document = getPublicDocumentBySlug(params.slug)

  if (!document) {
    throw notFound()
  }

  return {
    description: document.metadata.description,
    title: document.metadata.title,
    ...getAdjacentPublicWorkDocuments(params.slug),
  }
},
```

Change `WorkDetailPage` lookup to:

```ts
const document = getPublicDocumentBySlug(slug)
```

- [ ] **Step 4: Add the homepage exploration link**

In `src/components/home/exploration-interlude.tsx`, import `Link`, `ArrowRight`, `buttonVariants`, and `cn`:

```ts
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
```

After the exploration summary paragraph, add:

```tsx
<Link
  to="/work/$slug"
  params={{ slug: document.metadata.slug }}
  className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'mt-7 h-auto p-0')}
>
  {document.metadata.homepage.routeLabel}
  <ArrowRight aria-hidden="true" data-icon="inline-end" />
</Link>
```

- [ ] **Step 5: Run route and homepage tests**

Run:

```bash
pnpm exec playwright test tests/e2e/work-routes.spec.ts tests/e2e/home.spec.ts
```

Expected: PASS.

- [ ] **Step 6: Commit Task 2**

Run:

```bash
git add src/routes/work/\$slug.tsx src/components/home/exploration-interlude.tsx tests/e2e/work-routes.spec.ts tests/e2e/home.spec.ts
git commit -m "Restore public exploration route"
```

---

### Task 3: Use Explicit Collections On The Homepage

**Files:**
- Modify: `src/components/home/home-page.tsx`
- Test: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Update homepage imports and document selection**

In `src/components/home/home-page.tsx`, replace:

```ts
import { publicDocuments } from '@/content/documents'
```

with:

```ts
import { publicExplorationDocuments, publicShippedWorkDocuments } from '@/content/documents'
```

Replace:

```ts
const shippedWork = publicDocuments.filter(({ metadata }) => metadata.kind === 'shipped-work')
const exploration = publicDocuments.find(
  ({ metadata }) => metadata.slug === 'fraud-detection-system',
)
```

with:

```ts
const exploration = publicExplorationDocuments.find(
  ({ metadata }) => metadata.slug === 'fraud-detection-system',
)
```

Change the render call to:

```tsx
<SelectedWorkSection documents={publicShippedWorkDocuments} />
```

- [ ] **Step 2: Run homepage tests**

Run:

```bash
pnpm exec playwright test tests/e2e/home.spec.ts
```

Expected: PASS.

- [ ] **Step 3: Commit Task 3**

Run:

```bash
git add src/components/home/home-page.tsx
git commit -m "Use explicit homepage document collections"
```

---

### Task 4: Add Shared Section Layout Components

**Files:**
- Create: `src/components/layout/page-section.tsx`
- Create: `src/components/layout/section-intro.tsx`
- Modify: `src/components/home/selected-work-section.tsx`
- Modify: `src/components/home/contact-section.tsx`
- Modify: `src/components/home/exploration-interlude.tsx`
- Test: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Create `PageSection`**

Create `src/components/layout/page-section.tsx`:

```tsx
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type PageSectionProps = ComponentPropsWithoutRef<'section'> & {
  children: ReactNode
  containerClassName?: string
}

export function PageSection({
  children,
  className,
  containerClassName,
  ...props
}: PageSectionProps) {
  return (
    <section className={cn('px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24', className)} {...props}>
      <div className={cn('mx-auto max-w-7xl', containerClassName)}>{children}</div>
    </section>
  )
}
```

- [ ] **Step 2: Create `SectionIntro`**

Create `src/components/layout/section-intro.tsx`:

```tsx
import type { ReactNode } from 'react'

import { OrbitChip } from '@/components/orbit/orbit-chip'
import { cn } from '@/lib/utils'

type SectionIntroProps = {
  children?: ReactNode
  chip: ReactNode
  className?: string
  description?: ReactNode
  heading: ReactNode
  headingId: string
  headingLevel?: 'h2' | 'h3'
}

export function SectionIntro({
  children,
  chip,
  className,
  description,
  heading,
  headingId,
  headingLevel = 'h2',
}: SectionIntroProps) {
  const Heading = headingLevel

  return (
    <div className={cn('max-w-4xl', className)}>
      <OrbitChip>{chip}</OrbitChip>
      <Heading
        id={headingId}
        className="mt-4 text-4xl leading-tight font-medium text-balance sm:text-5xl lg:text-6xl"
      >
        {heading}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Refactor selected work to use layout components**

In `src/components/home/selected-work-section.tsx`, import:

```ts
import { PageSection } from '@/components/layout/page-section'
import { SectionIntro } from '@/components/layout/section-intro'
```

Replace the outer `<section>` and intro block with:

```tsx
<PageSection id="work" aria-labelledby="work-heading">
  <SectionIntro
    chip="Selected work"
    heading="Selected work with the evidence close by."
    headingId="work-heading"
    description="Each story connects the product tension, the decisions that shaped it, and the visual proof that makes the work inspectable."
  />
  <div className="mt-10 flex flex-col gap-14 lg:mt-12 lg:gap-[4.5rem]">
    {documents.map((document, index) => (
      <WorkChapter key={document.metadata.slug} document={document} index={index} />
    ))}
  </div>
</PageSection>
```

Remove the now-unused `OrbitChip` import if only `WorkChapter` still needs it. Keep it if `WorkChapter` uses it.

- [ ] **Step 4: Refactor contact section to use `PageSection`**

In `src/components/home/contact-section.tsx`, import:

```ts
import { PageSection } from '@/components/layout/page-section'
```

Replace the outer `<section>` and container `<div>` with:

```tsx
<PageSection
  id="contact"
  aria-labelledby="contact-heading"
  containerClassName="text-center"
>
  {/* existing centered content */}
</PageSection>
```

Keep the existing `OrbitChip`, heading, paragraph, and `ContactForm` content inside the `PageSection`.

- [ ] **Step 5: Refactor exploration interlude to use `PageSection`**

In `src/components/home/exploration-interlude.tsx`, import:

```ts
import { PageSection } from '@/components/layout/page-section'
```

Replace the outer `<section>` and first container `<div>` with:

```tsx
<PageSection
  className="relative overflow-hidden border-y border-orbit-line/80 bg-white/24"
  aria-labelledby="exploration-heading"
  containerClassName="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.9fr)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.88fr)]"
>
  {/* existing exploration content */}
</PageSection>
```

- [ ] **Step 6: Run homepage tests**

Run:

```bash
pnpm exec playwright test tests/e2e/home.spec.ts
```

Expected: PASS.

- [ ] **Step 7: Commit Task 4**

Run:

```bash
git add src/components/layout/page-section.tsx src/components/layout/section-intro.tsx src/components/home/selected-work-section.tsx src/components/home/contact-section.tsx src/components/home/exploration-interlude.tsx
git commit -m "Add shared section layout components"
```

---

### Task 5: Standardize Case Study Page Layout

**Files:**
- Modify: `src/components/case-study/case-study-page.tsx`
- Modify: `src/components/case-study/case-study-hero.tsx`
- Test: `tests/e2e/work-routes.spec.ts`

- [ ] **Step 1: Use `PageSection` for case-study chapter and body sections**

In `src/components/case-study/case-study-page.tsx`, import:

```ts
import { PageSection } from '@/components/layout/page-section'
```

Replace the chapter `<section>` with:

```tsx
<PageSection
  className="pt-0 pb-20 sm:pt-0 sm:pb-28 lg:pt-0"
  containerClassName="flex flex-col gap-16 border-l border-orbit-line pl-7 lg:gap-20 lg:pl-10"
  aria-label={`${metadata.title} chapters`}
>
  {metadata.chapters.map((chapter, chapterIndex) => (
    <CaseStudyChapter
      key={chapter.title}
      chapter={chapter}
      chapterIndex={chapterIndex}
      isFirstPublicWork={metadata.order === 1}
    />
  ))}
</PageSection>
```

Replace the body `<section>` with:

```tsx
<PageSection className="py-16 sm:py-16 lg:py-16" containerClassName="max-w-3xl">
  <div className="prose prose-neutral prose-headings:font-heading prose-headings:font-medium">
    <Content />
  </div>
</PageSection>
```

- [ ] **Step 2: Confirm case-study hero heading scale is standardized**

In `src/components/case-study/case-study-hero.tsx`, ensure the `<h1>` class remains:

```tsx
className="mt-6 max-w-5xl text-4xl leading-tight font-medium text-balance sm:text-5xl lg:text-6xl"
```

- [ ] **Step 3: Run case-study route tests**

Run:

```bash
pnpm exec playwright test tests/e2e/work-routes.spec.ts
```

Expected: PASS.

- [ ] **Step 4: Commit Task 5**

Run:

```bash
git add src/components/case-study/case-study-page.tsx src/components/case-study/case-study-hero.tsx
git commit -m "Standardize case study page layout"
```

---

### Task 6: Generalize Reveal Motion

**Files:**
- Create: `src/components/motion/use-reveal-motion.ts`
- Modify: `src/components/home/hero-orbit-section.tsx`
- Modify: `src/components/orbit/use-orbit-reveal.ts`
- Test: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Create generalized reveal hook**

Create `src/components/motion/use-reveal-motion.ts`:

```ts
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { RefObject } from 'react'

import { useReducedMotion } from '@/components/orbit/use-reduced-motion'

const REVEAL_MOTION = {
  from: { autoAlpha: 0, y: 10 },
  to: {
    autoAlpha: 1,
    duration: 0.48,
    ease: 'power2.out',
    stagger: 0.035,
    y: 0,
  },
} as const

export function useRevealMotion(scope: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !scope.current) {
        return
      }

      const elements = scope.current.querySelectorAll('[data-reveal-motion]')

      gsap.fromTo(elements, REVEAL_MOTION.from, REVEAL_MOTION.to)
    },
    { dependencies: [prefersReducedMotion], scope },
  )
}
```

- [ ] **Step 2: Migrate hero orbit section**

In `src/components/home/hero-orbit-section.tsx`, replace:

```ts
import { useOrbitReveal } from '@/components/orbit/use-orbit-reveal'
```

with:

```ts
import { useRevealMotion } from '@/components/motion/use-reveal-motion'
```

Replace:

```ts
useOrbitReveal(scope)
```

with:

```ts
useRevealMotion(scope)
```

Replace `data-orbit-reveal` with:

```tsx
data-reveal-motion
```

- [ ] **Step 3: Make orbit hook delegate or remove it**

If no files import `useOrbitReveal`, delete `src/components/orbit/use-orbit-reveal.ts`.

If keeping a compatibility wrapper is clearer for the current diff, replace its contents with:

```ts
import type { RefObject } from 'react'

import { useRevealMotion } from '@/components/motion/use-reveal-motion'

export function useOrbitReveal(scope: RefObject<HTMLElement | null>) {
  useRevealMotion(scope)
}
```

Prefer deletion if `rg "useOrbitReveal" src` shows no imports after Step 2.

- [ ] **Step 4: Run reduced-motion homepage test**

Run:

```bash
pnpm exec playwright test tests/e2e/home.spec.ts --grep "reduced motion"
```

Expected: PASS.

- [ ] **Step 5: Run full homepage tests**

Run:

```bash
pnpm exec playwright test tests/e2e/home.spec.ts
```

Expected: PASS.

- [ ] **Step 6: Commit Task 6**

Run:

```bash
git add src/components/motion/use-reveal-motion.ts src/components/home/hero-orbit-section.tsx src/components/orbit/use-orbit-reveal.ts
git commit -m "Generalize reveal motion"
```

If `src/components/orbit/use-orbit-reveal.ts` was deleted, use:

```bash
git add src/components/motion/use-reveal-motion.ts src/components/home/hero-orbit-section.tsx
git rm src/components/orbit/use-orbit-reveal.ts
git commit -m "Generalize reveal motion"
```

---

### Task 7: Final Test Contract Cleanup

**Files:**
- Modify: `tests/content/documents.test.ts`
- Modify: `tests/e2e/home.spec.ts`
- Modify: `tests/e2e/work-routes.spec.ts`

- [ ] **Step 1: Review tests for contract wording**

Keep tests that assert:

- Public shipped work appears separately from exploration.
- Exploration route is public.
- Draft and unknown routes return 404.
- Metadata is document-specific.
- Accessibility checks pass.
- Horizontal overflow checks pass.
- Content metadata stays public-safe.

Remove or loosen assertions that only pin incidental wording unless the phrase comes from `SPEC.md` or MDX content required for the public story.

- [ ] **Step 2: Run unit tests**

Run:

```bash
pnpm test:unit
```

Expected: PASS.

- [ ] **Step 3: Run e2e tests**

Run:

```bash
pnpm test:e2e
```

Expected: PASS.

- [ ] **Step 4: Commit Task 7**

Run:

```bash
git add tests/content/documents.test.ts tests/e2e/home.spec.ts tests/e2e/work-routes.spec.ts
git commit -m "Align tests with portfolio product contract"
```

If no test files changed during this task, do not create an empty commit. Note in the execution summary that the test contract already matched the final shape.

---

### Task 8: Full Verification And Final Review

**Files:**
- Inspect: `git diff main...HEAD`
- Inspect: `git status --short`

- [ ] **Step 1: Run the full quality gate**

Run:

```bash
pnpm check
```

Expected: PASS for typecheck, lint, format check, unit tests, e2e tests, and build.

- [ ] **Step 2: Inspect final diff**

Run:

```bash
git diff --stat main...HEAD
git status --short
```

Expected: only intentional modernization changes remain. If uncommitted changes exist, either commit them with a focused message or explain why they remain uncommitted.

- [ ] **Step 3: Prepare final summary**

Include:

- Route/content model changes.
- Layout/component standardization changes.
- Motion standardization changes.
- Test updates and verification results.
- Any dependency changes. Expected baseline: none.
