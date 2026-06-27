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

type AdjacentPublicDocuments = {
  nextDocument?: PortfolioDocument['metadata']
  previousDocument?: PortfolioDocument['metadata']
}

export function getPublicDocumentBySlug(slug: string): PortfolioDocument | undefined {
  return publicDocuments.find((document) => document.metadata.slug === slug)
}

export function getAdjacentPublicDocuments(slug: string): AdjacentPublicDocuments {
  const documentIndex = publicDocuments.findIndex((document) => document.metadata.slug === slug)

  if (documentIndex === -1) {
    return {
      nextDocument: undefined,
      previousDocument: undefined,
    }
  }

  return {
    nextDocument: publicDocuments[documentIndex + 1]?.metadata,
    previousDocument: publicDocuments[documentIndex - 1]?.metadata,
  }
}
