import { createFileRoute, notFound } from '@tanstack/react-router'

import { CaseStudyPage } from '@/components/case-study/case-study-page'
import { WorkStoryNotFound } from '@/components/case-study/work-story-not-found'
import { getAdjacentPublicWorkDocuments, getPublicWorkDocumentBySlug } from '@/content/documents'

export const Route = createFileRoute('/work/$slug')({
  component: WorkDetailPage,
  loader: ({ params }) => {
    const document = getPublicWorkDocumentBySlug(params.slug)

    if (!document) {
      throw notFound()
    }

    return {
      description: document.metadata.description,
      title: document.metadata.title,
      ...getAdjacentPublicWorkDocuments(params.slug),
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? 'Work story not found'} - Shayan Fareed` },
      {
        name: 'description',
        content:
          loaderData?.description ?? 'The requested portfolio work story could not be found.',
      },
    ],
  }),
  notFoundComponent: WorkStoryNotFound,
})

function WorkDetailPage() {
  const loaderData = Route.useLoaderData()
  const { slug } = Route.useParams()
  const document = getPublicWorkDocumentBySlug(slug)

  if (!document || !loaderData) {
    throw notFound()
  }

  const { nextDocument, previousDocument } = loaderData

  return (
    <CaseStudyPage
      document={document}
      nextDocument={nextDocument}
      previousDocument={previousDocument}
    />
  )
}
