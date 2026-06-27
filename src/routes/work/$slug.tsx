import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { CaseStudyPage } from '@/components/case-study/case-study-page'
import { buttonVariants } from '@/components/ui/button'
import { getAdjacentPublicDocuments, getPublicDocumentBySlug } from '@/content/documents'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/work/$slug')({
  component: WorkDetailPage,
  loader: ({ params }) => {
    const document = getPublicDocumentBySlug(params.slug)

    if (!document) {
      throw notFound()
    }

    return {
      metadata: document.metadata,
      ...getAdjacentPublicDocuments(params.slug),
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.metadata.title ?? 'Work story not found'} - Shayan Fareed` },
      {
        name: 'description',
        content:
          loaderData?.metadata.description ??
          'The requested portfolio work story could not be found.',
      },
    ],
  }),
  notFoundComponent: WorkStoryNotFound,
})

function WorkDetailPage() {
  const loaderData = Route.useLoaderData()
  const { slug } = Route.useParams()
  const document = getPublicDocumentBySlug(slug)

  if (!document || !loaderData) {
    throw notFound()
  }

  const { nextDocument, previousDocument } = loaderData
  const { Content, metadata, sourcePath } = document

  return (
    <CaseStudyPage
      document={{ Content, metadata, sourcePath }}
      nextDocument={nextDocument}
      previousDocument={previousDocument}
    />
  )
}

function WorkStoryNotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-semibold">Work story not found.</h1>
        <Link
          to="/"
          hash="work"
          className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'mt-6 h-auto p-0')}
        >
          <ArrowLeft aria-hidden="true" data-icon="inline-start" />
          Back to selected work
        </Link>
      </div>
    </main>
  )
}
