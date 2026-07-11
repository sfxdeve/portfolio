import { useRef } from 'react'

import { claimEvidenceGridClassName } from '@/components/layout/claim-evidence-grid'
import { PageSection } from '@/components/layout/page-section'
import { useScrollReveal } from '@/components/motion/use-scroll-reveal'
import { OrbitChip, orbitChipToneForKind } from '@/components/orbit/orbit-chip'
import type { PortfolioDocument } from '@/content/document-schema'
import { cn } from '@/lib/utils'

const signals = [
  [
    'risk-score',
    'Risk score',
    'Combines transaction signals into a reviewable measure without presenting the number as a verdict.',
  ],
  [
    'severity',
    'Severity',
    'Turns score bands into triage priority so analyst attention can be directed consistently.',
  ],
  [
    'evidence',
    'Evidence',
    'Keeps contributing signals beside each alert so reviewers can inspect why it was raised.',
  ],
  [
    'analyst-judgment',
    'Analyst judgment',
    'Retains review outcomes and notes so human decisions remain part of the record.',
  ],
] as const

export function ExplorationInterlude({ document }: { document: PortfolioDocument }) {
  const scope = useRef<HTMLElement>(null)
  const interlude = document.metadata.homepage.interlude

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
      </div>
      <div
        className="relative w-full border-y border-orbit-line/70 py-6 lg:max-w-[38rem] lg:justify-self-end"
        aria-label="Exploration signal grid"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {signals.map(([id, label, description]) => (
            <div key={id} className="min-w-0" data-scroll-reveal>
              <p className="font-heading text-xl">{label}</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
        {interlude ? (
          <dl className="mt-7 grid gap-5 border-t border-orbit-line/70 pt-6">
            <InterludeNote label="Constraints" value={interlude.constraints} />
            <InterludeNote label="Still unresolved" value={interlude.unresolved} />
            <InterludeNote label="What changed for me" value={interlude.reflection} />
          </dl>
        ) : null}
      </div>
    </PageSection>
  )
}

function InterludeNote({ label, value }: { label: string; value: string }) {
  return (
    <div data-scroll-reveal>
      <dt className="text-xs font-semibold tracking-wide text-foreground uppercase">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-muted-foreground">{value}</dd>
    </div>
  )
}
