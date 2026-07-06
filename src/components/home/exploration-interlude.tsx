import { useRef } from 'react'

import { claimEvidenceGridClassName } from '@/components/layout/claim-evidence-grid'
import { PageSection } from '@/components/layout/page-section'
import { StoryRouteLink } from '@/components/layout/story-route-link'
import { useScrollReveal } from '@/components/motion/use-scroll-reveal'
import { OrbitChip, orbitChipToneForKind } from '@/components/orbit/orbit-chip'
import type { PortfolioDocument } from '@/content/document-schema'
import { cn } from '@/lib/utils'

const signals = [
  ['risk-score', 'Risk score'],
  ['severity', 'Severity'],
  ['evidence', 'Evidence'],
  ['analyst-judgment', 'Analyst judgment'],
] as const

export function ExplorationInterlude({ document }: { document: PortfolioDocument }) {
  const scope = useRef<HTMLElement>(null)

  useScrollReveal(scope)

  return (
    <PageSection
      ref={scope}
      className="relative overflow-hidden border-y border-orbit-line/80 bg-orbit-champagne/18"
      aria-labelledby="exploration-heading"
      containerClassName={cn(claimEvidenceGridClassName, 'min-w-0')}
    >
      <div data-scroll-reveal>
        <OrbitChip tone={orbitChipToneForKind(document.metadata.kind)}>
          {document.metadata.statusLabel}
        </OrbitChip>
        <h2
          id="exploration-heading"
          className="mt-4 text-2xl leading-tight font-medium text-balance sm:text-3xl lg:text-4xl"
        >
          {document.metadata.homepage.claim}
        </h2>
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {document.metadata.homepage.summary}
        </p>
        <StoryRouteLink slug={document.metadata.slug}>
          {document.metadata.homepage.routeLabel}
        </StoryRouteLink>
      </div>
      <div
        className="relative w-full border-y border-orbit-line/70 py-6 lg:max-w-[38rem] lg:justify-self-end"
        aria-label="Exploration signal grid"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {signals.map(([id, label]) => (
            <div key={id} className="min-w-0" data-scroll-reveal>
              <p className="font-heading text-xl">{label}</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                Connected to scoring, explanation, review, and retained evidence without implying
                shipped commercial deployment.
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  )
}
