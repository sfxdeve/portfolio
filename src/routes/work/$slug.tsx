import { createFileRoute, notFound } from '@tanstack/react-router'

import { CaseStudyNotFound } from '@/components/case-study/case-study-not-found'
import { CaseStudyPage } from '@/components/case-study/case-study-page'
import {
  getAdjacentPublicWorkDocuments,
  getPublicDocumentBySlug,
  getPublicDocumentLoaderDataBySlug,
} from '@/content/documents'
import { createWorkHead } from '@/lib/site-meta'

export const Route = createFileRoute('/work/$slug')({
  component: WorkDetailPage,
  loader: ({ params }) => {
    const document = getPublicDocumentLoaderDataBySlug(params.slug)

    if (!document) {
      throw notFound()
    }

    return {
      document,
      ...getAdjacentPublicWorkDocuments(params.slug),
    }
  },
  head: ({ loaderData }) => {
    const document = loaderData?.document
    const head = document
      ? createWorkHead({
          description: document.metadata.description,
          slug: document.metadata.slug,
          title: document.metadata.title,
        })
      : createWorkHead({
          description: 'The requested portfolio case study could not be found.',
          slug: 'not-found',
          title: 'Case study not found',
        })

    return {
      links: head.links,
      meta: [{ title: head.title }, ...head.meta],
    }
  },
  notFoundComponent: CaseStudyNotFound,
})

function WorkDetailPage() {
  const { document: loaderDocument, nextDocument, previousDocument } = Route.useLoaderData()
  const document = getPublicDocumentBySlug(loaderDocument.metadata.slug)

  if (!document) {
    throw notFound()
  }

  return (
    <CaseStudyPage
      document={document}
      nextDocument={nextDocument}
      previousDocument={previousDocument}
    />
  )
}
