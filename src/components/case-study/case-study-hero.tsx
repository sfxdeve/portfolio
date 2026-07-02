import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { HeroSolarSystem } from '@/components/orbit/hero-solar-system'
import { OrbitChip } from '@/components/orbit/orbit-chip'
import { buttonVariants } from '@/components/ui/button'
import type { PortfolioDocument } from '@/content/document-schema'
import { cn } from '@/lib/utils'

export function CaseStudyHero({ document }: { document: PortfolioDocument }) {
  const { metadata } = document

  return (
    <section
      className="relative isolate min-h-[calc(82svh-6rem)] overflow-hidden px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 lg:px-12 lg:pt-16 lg:pb-24"
      aria-labelledby="case-study-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-7xl"
        aria-hidden="true"
      >
        <div className="absolute top-[24%] right-[-11rem] h-72 w-[42rem] opacity-82 sm:right-[-7rem] sm:h-88 lg:right-[-2rem] xl:right-[2rem] xl:h-[28rem]">
          <HeroSolarSystem />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link to="/" hash="work" className={cn(buttonVariants({ variant: 'link' }), 'h-auto p-0')}>
          <ArrowLeft aria-hidden="true" data-icon="inline-start" />
          Back
        </Link>
        <div className="mt-10 max-w-5xl">
          <OrbitChip tone={metadata.kind === 'exploration' ? 'sage' : 'coral'}>
            {metadata.statusLabel}
          </OrbitChip>
          <h1
            id="case-study-heading"
            className="mt-6 max-w-5xl text-4xl leading-tight font-medium text-balance sm:text-5xl lg:text-6xl"
          >
            {metadata.hero.title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {metadata.hero.claim}
          </p>
        </div>
      </div>
    </section>
  )
}
