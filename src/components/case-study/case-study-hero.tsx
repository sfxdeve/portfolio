import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { HeroOrbitLayout } from '@/components/orbit/hero-orbit-layout'
import { OrbitChip, orbitChipToneForKind } from '@/components/orbit/orbit-chip'
import { buttonVariants } from '@/components/ui/button'
import type { PortfolioDocument } from '@/content/document-schema'
import { cn } from '@/lib/utils'

export function CaseStudyHero({ document }: { document: PortfolioDocument }) {
  const { metadata } = document

  return (
    <HeroOrbitLayout variant="case-study" labelledBy="case-study-heading">
      <Link to="/" hash="work" className={cn(buttonVariants({ variant: 'link' }), 'h-auto p-0')}>
        <ArrowLeft aria-hidden="true" data-icon="inline-start" />
        Back
      </Link>
      <div className="mt-10 max-w-5xl">
        <OrbitChip tone={orbitChipToneForKind(metadata.kind)}>{metadata.statusLabel}</OrbitChip>
        <h1
          id="case-study-heading"
          className="mt-6 max-w-5xl text-4xl leading-tight font-medium text-balance sm:text-5xl lg:text-6xl"
        >
          {metadata.hero.title}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {metadata.hero.claim}
        </p>
        <dl className="mt-8 grid max-w-5xl gap-5 border-t border-orbit-line/70 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Role
            </dt>
            <dd className="mt-2 leading-7">{metadata.hero.role}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Team
            </dt>
            <dd className="mt-2 leading-7">{metadata.hero.teamContext}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Scope
            </dt>
            <dd className="mt-2 leading-7">{metadata.hero.summary}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Outcome
            </dt>
            <dd className="mt-2 leading-7">{metadata.hero.outcome}</dd>
          </div>
        </dl>
      </div>
    </HeroOrbitLayout>
  )
}
