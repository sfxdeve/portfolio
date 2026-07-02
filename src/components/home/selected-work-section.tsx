import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { EvidenceFigure } from '@/components/case-study/evidence-figure'
import { PageSection } from '@/components/layout/page-section'
import { SectionIntro } from '@/components/layout/section-intro'
import { OrbitChip } from '@/components/orbit/orbit-chip'
import { buttonVariants } from '@/components/ui/button'
import type { PortfolioDocument } from '@/content/document-schema'
import { cn } from '@/lib/utils'

export function SelectedWorkSection({ documents }: { documents: PortfolioDocument[] }) {
  return (
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
  )
}

function WorkChapter({ document, index }: { document: PortfolioDocument; index: number }) {
  const evidence = document.metadata.homepage.evidence[0]

  return (
    <article className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.9fr)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.88fr)]">
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
        <EvidenceFigure
          evidence={evidence}
          eager={document.metadata.order === 1}
          className="w-full lg:max-w-[34rem] lg:justify-self-end xl:max-w-[38rem]"
          cardClassName="p-1.5"
        />
      ) : null}
    </article>
  )
}
