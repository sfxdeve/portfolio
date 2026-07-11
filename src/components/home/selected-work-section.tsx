import { useRef } from 'react'

import { EvidenceFigure } from '@/components/case-study/evidence-figure'
import { ClaimEvidenceGrid } from '@/components/layout/claim-evidence-grid'
import { PageSection } from '@/components/layout/page-section'
import { SectionIntro } from '@/components/layout/section-intro'
import { StoryRouteLink } from '@/components/layout/story-route-link'
import { useScrollReveal } from '@/components/motion/use-scroll-reveal'
import { OrbitChip, orbitChipToneForKind } from '@/components/orbit/orbit-chip'
import type { PortfolioDocument } from '@/content/document-schema'

export function SelectedWorkSection({ documents }: { documents: PortfolioDocument[] }) {
  const scope = useRef<HTMLElement>(null)

  useScrollReveal(scope)

  return (
    <PageSection id="work" aria-labelledby="work-heading" ref={scope}>
      <SectionIntro
        chip="Selected work"
        heading="Selected work with the evidence close by."
        headingId="work-heading"
        description="Each story connects the product tension, the decisions that shaped it, and the visual proof that makes the work inspectable."
      />
      <div className="mt-10 flex flex-col gap-14 lg:mt-12 lg:gap-[4.5rem]">
        {documents.map((document, documentIndex) => (
          <WorkChapter
            key={document.metadata.slug}
            document={document}
            prioritizeEvidence={documentIndex === 0}
          />
        ))}
      </div>
    </PageSection>
  )
}

function WorkChapter({
  document,
  prioritizeEvidence,
}: {
  document: PortfolioDocument
  prioritizeEvidence: boolean
}) {
  const evidence = document.metadata.homepage.evidence[0]

  return (
    <ClaimEvidenceGrid as="article" data-scroll-reveal>
      <div className="min-w-0 border-l border-orbit-line/70 pl-5 sm:pl-6">
        <OrbitChip tone={orbitChipToneForKind(document.metadata.kind)}>
          {document.metadata.statusLabel}
        </OrbitChip>
        <h3 className="mt-4 text-3xl leading-tight font-medium sm:text-4xl">
          {document.metadata.title}
        </h3>
        <p className="mt-4 text-lg leading-7 text-balance sm:text-xl sm:leading-8">
          {document.metadata.homepage.claim}
        </p>
        <p className="mt-4 leading-7 text-muted-foreground">{document.metadata.homepage.summary}</p>
        <StoryRouteLink slug={document.metadata.slug}>
          {document.metadata.homepage.routeLabel}
        </StoryRouteLink>
      </div>
      {evidence ? (
        <EvidenceFigure
          evidence={evidence}
          eager={prioritizeEvidence}
          className="w-full lg:max-w-[34rem] lg:justify-self-end xl:max-w-[38rem]"
          cardClassName="p-1.5"
        />
      ) : null}
    </ClaimEvidenceGrid>
  )
}
