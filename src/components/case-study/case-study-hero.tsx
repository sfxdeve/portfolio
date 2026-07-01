import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { OrbitChip } from '@/components/orbit/orbit-chip'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { PortfolioDocument } from '@/content/document-schema'
import { cn } from '@/lib/utils'

import { EvidenceFigure } from './evidence-figure'

export function CaseStudyHero({ document }: { document: PortfolioDocument }) {
  const { metadata } = document
  const openingEvidence = metadata.homepage.evidence[0] ?? metadata.chapters[0]?.evidence[0]

  return (
    <section
      className="relative isolate overflow-hidden px-5 pt-10 pb-10 sm:px-8 sm:pt-14 sm:pb-14 lg:px-12 lg:pt-16 lg:pb-16"
      aria-labelledby="case-study-heading"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <Link to="/" hash="work" className={cn(buttonVariants({ variant: 'link' }), 'h-auto p-0')}>
          <ArrowLeft aria-hidden="true" data-icon="inline-start" />
          Back
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,1.05fr)] lg:items-end">
          <div>
            <OrbitChip tone={metadata.kind === 'exploration' ? 'sage' : 'coral'}>
              {metadata.statusLabel}
            </OrbitChip>
            <h1
              id="case-study-heading"
              className="mt-4 max-w-4xl text-2xl leading-tight font-medium text-balance sm:text-3xl lg:text-4xl"
            >
              {metadata.hero.title}
            </h1>
            <p className="mt-5 text-lg leading-7 text-balance sm:text-xl sm:leading-8">
              {metadata.hero.claim}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {metadata.hero.summary}
            </p>
          </div>
          {openingEvidence ? (
            <div>
              <EvidenceFigure evidence={openingEvidence} eager={metadata.order === 1} />
            </div>
          ) : null}
        </div>
        <Separator className="mt-9 bg-orbit-line/70" />
        <dl className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-muted-foreground">Responsibility</dt>
            <dd className="mt-2 leading-7">{metadata.hero.role}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-muted-foreground">Outcome</dt>
            <dd className="mt-2 leading-7">{metadata.hero.outcome}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
