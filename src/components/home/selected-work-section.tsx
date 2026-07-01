import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { EvidenceFigure } from '@/components/case-study/evidence-figure'
import { OrbitChip } from '@/components/orbit/orbit-chip'
import { buttonVariants } from '@/components/ui/button'
import type { PortfolioDocument } from '@/content/document-schema'
import { cn } from '@/lib/utils'

export function SelectedWorkSection({ documents }: { documents: PortfolioDocument[] }) {
  return (
    <section
      id="work"
      className="px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <OrbitChip>Selected work</OrbitChip>
          <h2
            id="work-heading"
            className="mt-4 text-3xl leading-tight font-medium text-balance sm:text-4xl lg:text-5xl"
          >
            Selected work with the evidence close by.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Each story connects the product tension, the decisions that shaped it, and the visual
            proof that makes the work inspectable.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-14 lg:mt-12 lg:gap-[4.5rem]">
          {documents.map((document, index) => (
            <WorkChapter key={document.metadata.slug} document={document} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkChapter({ document, index }: { document: PortfolioDocument; index: number }) {
  const evidence = document.metadata.homepage.evidence[0]

  return (
    <article className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.05fr)] lg:items-center">
      <div className="min-w-0 border-l border-orbit-line/70 pl-5 sm:pl-6">
        <OrbitChip tone={index === 1 ? 'sage' : 'coral'}>{document.metadata.statusLabel}</OrbitChip>
        <h3 className="mt-4 text-3xl leading-tight font-medium sm:text-4xl">
          {document.metadata.title}
        </h3>
        <p className="mt-4 text-lg leading-7 text-balance sm:text-xl sm:leading-8">
          {document.metadata.homepage.claim}
        </p>
        <p className="mt-4 leading-7 text-muted-foreground">{document.metadata.homepage.summary}</p>
        <Link
          to="/work/$slug"
          params={{ slug: document.metadata.slug }}
          className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'mt-7 h-auto p-0')}
        >
          {document.metadata.homepage.routeLabel}
          <ArrowRight aria-hidden="true" data-icon="inline-end" />
        </Link>
      </div>
      {evidence ? (
        <EvidenceFigure evidence={evidence} eager={document.metadata.order === 1} />
      ) : null}
    </article>
  )
}
