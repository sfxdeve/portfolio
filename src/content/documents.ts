import { z } from 'zod'

import { documentSchema, type DocumentModule, type PortfolioDocument } from './document-schema'

export function validateDocuments(modules: Record<string, DocumentModule>): PortfolioDocument[] {
  const documents = Object.entries(modules).map(([sourcePath, documentModule]) => {
    const result = documentSchema.safeParse(documentModule.frontmatter)

    if (!result.success) {
      throw new Error(`Invalid metadata in ${sourcePath}:\n${z.prettifyError(result.error)}`)
    }

    return {
      Content: documentModule.default,
      metadata: result.data,
      sourcePath,
    }
  })
  const sourcePathBySlug = new Map<string, string>()

  for (const document of documents) {
    const previousSourcePath = sourcePathBySlug.get(document.metadata.slug)

    if (previousSourcePath) {
      throw new Error(
        `Duplicate slug "${document.metadata.slug}" in ${previousSourcePath} and ${document.sourcePath}`,
      )
    }

    sourcePathBySlug.set(document.metadata.slug, document.sourcePath)
  }

  return documents.toSorted((left, right) =>
    left.metadata.order === right.metadata.order
      ? left.metadata.slug.localeCompare(right.metadata.slug)
      : left.metadata.order - right.metadata.order,
  )
}

export function filterPublicDocuments(documents: PortfolioDocument[]): PortfolioDocument[] {
  return documents.filter(({ metadata }) => metadata.visibility === 'public')
}

const documentModules = import.meta.glob<DocumentModule>('./documents/**/*.mdx', { eager: true })

export const documents = validateDocuments(documentModules)

export const publicDocuments = filterPublicDocuments(documents)

export const publicShippedWorkDocuments = publicDocuments.filter(
  ({ metadata }) => metadata.kind === 'shipped-work',
)

export const publicExplorationDocuments = publicDocuments.filter(
  ({ metadata }) => metadata.kind === 'exploration',
)

export type AdjacentPublicDocument = Pick<PortfolioDocument['metadata'], 'slug' | 'title'>

type AdjacentPublicDocuments = {
  nextDocument?: AdjacentPublicDocument
  previousDocument?: AdjacentPublicDocument
}

export function getPublicShippedWorkDocumentBySlug(slug: string): PortfolioDocument | undefined {
  return publicShippedWorkDocuments.find((document) => document.metadata.slug === slug)
}

export function getAdjacentPublicWorkDocuments(slug: string): AdjacentPublicDocuments {
  const documentIndex = publicShippedWorkDocuments.findIndex(
    (document) => document.metadata.slug === slug,
  )

  if (documentIndex === -1) {
    return {
      nextDocument: undefined,
      previousDocument: undefined,
    }
  }

  return {
    nextDocument: adjacentDocument(publicShippedWorkDocuments[documentIndex + 1]),
    previousDocument: adjacentDocument(publicShippedWorkDocuments[documentIndex - 1]),
  }
}

function adjacentDocument(document?: PortfolioDocument): AdjacentPublicDocument | undefined {
  return document ? { slug: document.metadata.slug, title: document.metadata.title } : undefined
}
