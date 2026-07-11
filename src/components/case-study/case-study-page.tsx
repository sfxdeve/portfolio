import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { PageSection } from '@/components/layout/page-section'
import { Item, ItemContent, ItemTitle } from '@/components/ui/item'
import { Separator } from '@/components/ui/separator'
import type { PortfolioDocument } from '@/content/document-schema'
import type { AdjacentPublicDocument } from '@/content/documents'

import { CaseStudyChapter } from './case-study-chapter'
import { CaseStudyHero } from './case-study-hero'

export function CaseStudyPage({
  document,
  nextDocument,
  previousDocument,
}: {
  document: PortfolioDocument
  nextDocument?: AdjacentPublicDocument
  previousDocument?: AdjacentPublicDocument
}) {
  const { Content, metadata } = document

  return (
    <main>
      <CaseStudyHero document={document} />

      <PageSection
        className="pt-0 pb-20 sm:pt-0 sm:pb-28 lg:pt-0"
        containerClassName="flex flex-col gap-16 border-l border-orbit-line pl-7 lg:gap-20 lg:pl-10"
        aria-label={`${metadata.title} chapters`}
      >
        {metadata.chapters.map((chapter, chapterIndex) => (
          <CaseStudyChapter
            key={`${metadata.slug}-${chapterIndex}`}
            chapter={chapter}
            chapterIndex={chapterIndex}
            prioritizeEvidence={chapterIndex === 0}
          />
        ))}
      </PageSection>

      <Separator className="bg-orbit-line" />
      <PageSection className="py-16 sm:py-16 lg:py-16" containerClassName="max-w-3xl">
        <div className="mdx-body">
          <Content />
        </div>
      </PageSection>

      <CaseStudyPager previousDocument={previousDocument} nextDocument={nextDocument} />
    </main>
  )
}

function CaseStudyPager({
  nextDocument,
  previousDocument,
}: {
  nextDocument?: AdjacentPublicDocument
  previousDocument?: AdjacentPublicDocument
}) {
  if (!previousDocument && !nextDocument) {
    return null
  }

  return (
    <nav className="px-5 pt-4 pb-10 sm:px-8 lg:px-12" aria-label="Adjacent case studies">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2">
        {previousDocument ? (
          <Item
            render={<Link to="/work/$slug" params={{ slug: previousDocument.slug }} />}
            variant="outline"
            className="rounded-xl border-orbit-line/70 bg-orbit-pearl/45 p-5 text-left shadow-orbit-soft hover:border-orbit-bronze/45 [a]:hover:bg-orbit-pearl/70"
          >
            <ItemContent className="gap-2">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <ArrowLeft aria-hidden="true" className="size-4" />
                Previous
              </span>
              <ItemTitle className="font-heading text-xl text-foreground">
                {previousDocument.title}
              </ItemTitle>
            </ItemContent>
          </Item>
        ) : (
          <span className="hidden sm:block" />
        )}
        {nextDocument ? (
          <Item
            render={<Link to="/work/$slug" params={{ slug: nextDocument.slug }} />}
            variant="outline"
            className="rounded-xl border-orbit-line/70 bg-orbit-pearl/45 p-5 text-left shadow-orbit-soft hover:border-orbit-bronze/45 sm:text-right [a]:hover:bg-orbit-pearl/70"
          >
            <ItemContent className="gap-2 sm:items-end">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                Next
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
              <ItemTitle className="font-heading text-xl text-foreground">
                {nextDocument.title}
              </ItemTitle>
            </ItemContent>
          </Item>
        ) : null}
      </div>
    </nav>
  )
}
