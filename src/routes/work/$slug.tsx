import { createFileRoute, notFound } from '@tanstack/react-router'

import { CaseStudyNotFound } from '@/components/case-study/case-study-not-found'
import { CaseStudyPage } from '@/components/case-study/case-study-page'
import { getAdjacentPublicWorkDocuments, getPublicDocumentBySlug } from '@/content/documents'
import { createNotFoundHead, createWorkHead } from '@/lib/site-meta'

export const Route = createFileRoute('/work/$slug')({
  component: WorkDetailPage,
  loader: ({ params }) => {
    const document = getPublicDocumentBySlug(params.slug)

    if (!document) {
      throw notFound()
    }

    return {
      metadata: document.metadata,
      ...getAdjacentPublicWorkDocuments(params.slug),
    }
  },
  head: ({ loaderData }) => {
    const metadata = loaderData?.metadata
    const head = metadata
      ? createWorkHead({
          description: metadata.description,
          slug: metadata.slug,
          title: metadata.title,
        })
      : createNotFoundHead()

    return {
      links: head.links,
      meta: [{ title: head.title }, ...head.meta],
    }
  },
  notFoundComponent: CaseStudyNotFound,
})

function WorkDetailPage() {
  const { metadata, nextDocument, previousDocument } = Route.useLoaderData()
  const document = getPublicDocumentBySlug(metadata.slug)

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
