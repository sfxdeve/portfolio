import type { MDXComponents } from 'mdx/types'
import type { ComponentType } from 'react'
import { z } from 'zod'

const evidenceSchema = z
  .object({
    alt: z.string().trim().min(1),
    caption: z.string().trim().min(1).optional(),
    height: z.number().int().positive(),
    src: z.string().trim().startsWith('/'),
    width: z.number().int().positive(),
  })
  .strict()

const chapterSchema = z
  .object({
    claim: z.string().trim().min(1),
    decision: z.string().trim().min(1).optional(),
    evidence: z.array(evidenceSchema).default([]),
    reasoning: z.string().trim().min(1),
    title: z.string().trim().min(1),
  })
  .strict()

export const documentSchema = z
  .object({
    chapters: z.array(chapterSchema).min(1),
    description: z.string().trim().min(1),
    hero: z
      .object({
        claim: z.string().trim().min(1),
        outcome: z.string().trim().min(1),
        role: z.string().trim().min(1),
        summary: z.string().trim().min(1),
        title: z.string().trim().min(1),
      })
      .strict(),
    homepage: z
      .object({
        claim: z.string().trim().min(1),
        evidence: z.array(evidenceSchema).default([]),
        routeLabel: z.string().trim().min(1),
        summary: z.string().trim().min(1),
      })
      .strict(),
    kind: z.enum(['shipped-work', 'exploration']),
    order: z.number().int().nonnegative(),
    slug: z
      .string()
      .trim()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    statusLabel: z.string().trim().min(1),
    summary: z.string().trim().min(1),
    title: z.string().trim().min(1),
    visibility: z.enum(['draft', 'public']),
  })
  .strict()

export type DocumentMetadata = z.infer<typeof documentSchema>

export type DocumentModule = {
  default: ComponentType<{ components?: MDXComponents }>
  frontmatter: unknown
}

export type PortfolioDocument = {
  Content: DocumentModule['default']
  metadata: DocumentMetadata
  sourcePath: string
}
