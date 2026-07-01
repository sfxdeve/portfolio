import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import type { PortfolioDocument } from '@/content/document-schema'

import { CaseStudyChapter } from './case-study-chapter'
import { CaseStudyHero } from './case-study-hero'

type AdjacentDocument = Pick<PortfolioDocument['metadata'], 'slug'>

export function CaseStudyPage({
  document,
  nextDocument,
  previousDocument,
}: {
  document: PortfolioDocument
  nextDocument?: AdjacentDocument
  previousDocument?: AdjacentDocument
}) {
  const { Content, metadata } = document

  return (
    <main>
      <CaseStudyHero document={document} />

      <section
        className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12"
        aria-label={`${metadata.title} chapters`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-16 border-l border-orbit-line pl-7 lg:gap-20 lg:pl-10">
          {metadata.chapters.map((chapter, chapterIndex) => (
            <CaseStudyChapter
              key={chapter.title}
              chapter={chapter}
              chapterIndex={chapterIndex}
              isFirstPublicWork={metadata.order === 1}
            />
          ))}
        </div>
      </section>

      <Separator className="bg-orbit-line" />
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="prose prose-neutral prose-headings:font-heading prose-headings:font-medium mx-auto max-w-3xl">
          <Content />
        </div>
      </section>

      <CaseStudyPager previousDocument={previousDocument} nextDocument={nextDocument} />
    </main>
  )
}

function CaseStudyPager({
  nextDocument,
  previousDocument,
}: {
  nextDocument?: AdjacentDocument
  previousDocument?: AdjacentDocument
}) {
  if (!previousDocument && !nextDocument) {
    return null
  }

  return (
    <nav className="px-5 pt-4 pb-10 sm:px-8 lg:px-12" aria-label="Adjacent work stories">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2">
        {previousDocument ? (
          <Link
            to="/work/$slug"
            params={{ slug: previousDocument.slug }}
            className="block text-left underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Previous
            </span>
          </Link>
        ) : (
          <span />
        )}
        {nextDocument ? (
          <Link
            to="/work/$slug"
            params={{ slug: nextDocument.slug }}
            className="block text-left underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:text-right"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground sm:justify-end">
              Next
              <ArrowRight aria-hidden="true" className="size-4" />
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
