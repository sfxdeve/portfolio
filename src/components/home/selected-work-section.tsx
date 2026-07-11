import { useRef } from 'react'

import { EvidenceFigure } from '@/components/case-study/evidence-figure'
import { ClaimEvidenceGrid } from '@/components/layout/claim-evidence-grid'
import { PageSection } from '@/components/layout/page-section'
import { SectionIntro } from '@/components/layout/section-intro'
import { StoryRouteLink } from '@/components/layout/story-route-link'
import { useProjectSceneMotion } from '@/components/motion/use-project-scene-motion'
import { OrbitChip, orbitChipToneForKind } from '@/components/orbit/orbit-chip'
import type { PortfolioDocument } from '@/content/document-schema'

export function SelectedWorkSection({ documents }: { documents: PortfolioDocument[] }) {
  const scope = useRef<HTMLElement>(null)

  useProjectSceneMotion(scope)

  return (
    <PageSection id="work" aria-labelledby="work-heading" ref={scope}>
      <SectionIntro
        chip="Selected work"
        heading="Products built through the difficult middle."
        headingId="work-heading"
        description="These products had trust, money, or operational complexity at their core. Each story shows the problem I took on, the decisions I made, and what reached the world."
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
  const routeLabel = document.metadata.homepage.routeLabel

  return (
    <ClaimEvidenceGrid as="article" data-project-scene>
      <div className="min-w-0 border-l border-orbit-line/70 pl-5 sm:pl-6" data-project-claim>
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
        {routeLabel ? (
          <StoryRouteLink slug={document.metadata.slug}>{routeLabel}</StoryRouteLink>
        ) : null}
      </div>
      {evidence ? (
        <EvidenceFigure
          evidence={evidence}
          eager={prioritizeEvidence}
          className="w-full lg:max-w-[34rem] lg:justify-self-end xl:max-w-[38rem]"
          cardClassName="p-1.5"
          data-project-evidence
        />
      ) : null}
    </ClaimEvidenceGrid>
  )
}
