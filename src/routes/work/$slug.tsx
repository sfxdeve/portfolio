import { createFileRoute, notFound } from '@tanstack/react-router'

import { CaseStudyNotFound } from '@/components/case-study/case-study-not-found'
import { CaseStudyPage } from '@/components/case-study/case-study-page'
import { getAdjacentPublicWorkDocuments, getPublicDocumentBySlug } from '@/content/documents'

export const Route = createFileRoute('/work/$slug')({
  component: WorkDetailPage,
  loader: ({ params }) => {
    const document = getPublicDocumentBySlug(params.slug)

    if (!document) {
      throw notFound()
    }

    return {
      document,
      ...getAdjacentPublicWorkDocuments(params.slug),
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.document.metadata.title ?? 'Case study not found'} - Shayan Fareed` },
      {
        name: 'description',
        content:
          loaderData?.document.metadata.description ??
          'The requested portfolio case study could not be found.',
      },
    ],
  }),
  notFoundComponent: CaseStudyNotFound,
})

function WorkDetailPage() {
  const { document, nextDocument, previousDocument } = Route.useLoaderData()

  return (
    <CaseStudyPage
      document={document}
      nextDocument={nextDocument}
      previousDocument={previousDocument}
    />
  )
}
