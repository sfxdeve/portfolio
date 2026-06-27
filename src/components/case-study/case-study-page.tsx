import { MDXProvider } from '@mdx-js/react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { PortfolioDocument } from '@/content/document-schema'
import { cn } from '@/lib/utils'

import { EvidenceFigure } from './evidence-figure'

type AdjacentDocument = Pick<PortfolioDocument['metadata'], 'slug' | 'title'>

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
      <section className="px-6 py-16 sm:py-24" aria-labelledby="case-study-heading">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            hash="work"
            className={cn(buttonVariants({ variant: 'link' }), 'h-auto p-0')}
          >
            <ArrowLeft aria-hidden="true" data-icon="inline-start" />
            Back to selected work
          </Link>
          <div className="mt-12 max-w-4xl">
            <Badge variant="secondary">{metadata.statusLabel}</Badge>
            <h1
              id="case-study-heading"
              className="mt-3 text-4xl leading-tight font-semibold text-balance sm:text-6xl"
            >
              {metadata.hero.title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-balance">{metadata.hero.claim}</p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
              {metadata.hero.summary}
            </p>
          </div>
          <dl className="mt-12 grid gap-4 border-y py-6 md:grid-cols-2">
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

      <section className="px-6 pb-20 sm:pb-28" aria-label={`${metadata.title} chapters`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-20">
          {metadata.chapters.map((chapter) => (
            <article
              key={chapter.title}
              className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start"
            >
              <div className="lg:sticky lg:top-10">
                <h2 className="text-2xl leading-tight font-semibold sm:text-4xl">
                  {chapter.title}
                </h2>
                <p className="mt-5 text-lg leading-8">{chapter.claim}</p>
                {chapter.decision ? (
                  <p className="mt-5 leading-7 text-muted-foreground">
                    <span className="font-semibold text-foreground">Decision: </span>
                    {chapter.decision}
                  </p>
                ) : null}
                <p className="mt-5 leading-7 text-muted-foreground">{chapter.reasoning}</p>
              </div>
              <div className="flex flex-col gap-5">
                {chapter.evidence.length > 0 ? (
                  chapter.evidence.map((evidence, index) => (
                    <EvidenceFigure
                      key={evidence.src}
                      evidence={evidence}
                      eager={index === 0 && metadata.order === 1}
                    />
                  ))
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <h3>Evidence standard</h3>
                      </CardTitle>
                      <CardDescription className="leading-7">
                        This exploration chapter is intentionally presented through reasoning rather
                        than shipped-product screenshots.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t px-6 py-16">
        <div className="prose prose-neutral mx-auto max-w-3xl">
          <MDXProvider>
            <Content />
          </MDXProvider>
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
    <nav className="border-t px-6 py-10" aria-label="Adjacent work stories">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
        {previousDocument ? (
          <Link
            to="/work/$slug"
            params={{ slug: previousDocument.slug }}
            className="rounded-xl border p-5 text-left underline-offset-4 hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Previous
            </span>
            <span className="mt-2 block text-lg font-semibold">{previousDocument.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {nextDocument ? (
          <Link
            to="/work/$slug"
            params={{ slug: nextDocument.slug }}
            className="rounded-xl border p-5 text-left underline-offset-4 hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:text-right"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground sm:justify-end">
              Next
              <ArrowRight aria-hidden="true" className="size-4" />
            </span>
            <span className="mt-2 block text-lg font-semibold">{nextDocument.title}</span>
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
