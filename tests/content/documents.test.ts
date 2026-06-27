import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import type { DocumentMetadata, DocumentModule } from '@/content/document-schema'
import {
  documents,
  filterPublicDocuments,
  getAdjacentPublicDocuments,
  getPublicDocumentBySlug,
  validateDocuments,
} from '@/content/documents'

const Content: DocumentModule['default'] = () => null

function publicMetadataStrings(metadata: DocumentMetadata): string[] {
  const strings: string[] = [
    metadata.description,
    metadata.homepage.claim,
    metadata.homepage.routeLabel,
    metadata.homepage.summary,
    metadata.hero.claim,
    metadata.hero.outcome,
    metadata.hero.role,
    metadata.hero.summary,
    metadata.hero.title,
    metadata.summary,
    metadata.title,
  ]

  if (metadata.statusLabel) {
    strings.push(metadata.statusLabel)
  }

  for (const evidence of metadata.homepage.evidence) {
    strings.push(evidence.alt, evidence.src)

    if (evidence.caption) {
      strings.push(evidence.caption)
    }
  }

  for (const chapter of metadata.chapters) {
    strings.push(chapter.claim, chapter.reasoning, chapter.title)

    if (chapter.decision) {
      strings.push(chapter.decision)
    }

    for (const evidence of chapter.evidence) {
      strings.push(evidence.alt, evidence.src)

      if (evidence.caption) {
        strings.push(evidence.caption)
      }
    }
  }

  return strings
}

function publicEvidence(metadata: DocumentMetadata): DocumentMetadata['homepage']['evidence'] {
  return [
    ...metadata.homepage.evidence,
    ...metadata.chapters.flatMap((chapter) => chapter.evidence),
  ]
}

function moduleWith(
  frontmatter: Partial<DocumentMetadata> = {},
): DocumentModule & { frontmatter: DocumentMetadata } {
  return {
    default: Content,
    frontmatter: {
      chapters: [
        {
          claim: 'The content boundary validates structured case-study chapters.',
          decision: 'Keep chapter metadata explicit.',
          evidence: [],
          reasoning: 'Routes can render evidence-led pages without hard-coding project copy.',
          title: 'Structured chapter',
        },
      ],
      description: 'A repository document used by the content boundary.',
      hero: {
        claim: 'Validated MDX can drive public portfolio pages.',
        outcome: 'The app renders from typed content instead of route-local copy.',
        role: 'Content validation',
        summary: 'A typed hero summary for tests.',
        title: 'Valid document',
      },
      homepage: {
        claim: 'A homepage claim for a validated document.',
        evidence: [],
        routeLabel: 'Read the valid document',
        summary: 'A homepage summary.',
      },
      kind: 'exploration',
      order: 0,
      slug: 'valid-document',
      summary: 'A concise summary.',
      title: 'Valid document',
      visibility: 'public',
      ...frontmatter,
    },
  }
}

describe('repository documents', () => {
  it('discovers and validates the private MDX compilation fixture', () => {
    const fixture = documents.find(({ metadata }) => metadata.slug === 'foundation-smoke-test')

    expect(fixture?.metadata).toMatchObject({
      slug: 'foundation-smoke-test',
      title: 'Foundation smoke test',
      visibility: 'draft',
    })
    expect(fixture?.Content).toBeTypeOf('function')
  })

  it('discovers the approved public portfolio documents in homepage order', () => {
    expect(documents.map(({ metadata }) => metadata.slug)).toEqual([
      'foundation-smoke-test',
      'ecobuiltconnect',
      'artisanconnect',
      'rushuploads',
      'fraud-detection-system',
    ])
    expect(filterPublicDocuments(documents).map(({ metadata }) => metadata.slug)).toEqual([
      'ecobuiltconnect',
      'artisanconnect',
      'rushuploads',
      'fraud-detection-system',
    ])
  })

  it('looks up only public documents by slug', () => {
    expect(getPublicDocumentBySlug('ecobuiltconnect')?.metadata.title).toBe('EcoBuiltConnect')
    expect(getPublicDocumentBySlug('foundation-smoke-test')).toBeUndefined()
    expect(getPublicDocumentBySlug('missing-work')).toBeUndefined()
  })

  it('returns adjacent public documents in homepage order', () => {
    expect(getAdjacentPublicDocuments('artisanconnect')).toEqual({
      previousDocument: expect.objectContaining({
        slug: 'ecobuiltconnect',
        title: 'EcoBuiltConnect',
      }),
      nextDocument: expect.objectContaining({
        slug: 'rushuploads',
        title: 'RushUploads',
      }),
    })

    expect(getAdjacentPublicDocuments('ecobuiltconnect')).toEqual({
      nextDocument: expect.objectContaining({
        slug: 'artisanconnect',
        title: 'ArtisanConnect',
      }),
      previousDocument: undefined,
    })

    expect(getAdjacentPublicDocuments('missing-work')).toEqual({
      nextDocument: undefined,
      previousDocument: undefined,
    })
  })

  it('requires public shipped work to include homepage and chapter evidence', () => {
    const publicShippedWork = filterPublicDocuments(documents).filter(
      ({ metadata }) => metadata.kind === 'shipped-work',
    )

    expect(publicShippedWork.length).toBeGreaterThan(0)

    for (const document of publicShippedWork) {
      expect(document.metadata.homepage.evidence.length, document.metadata.slug).toBeGreaterThan(0)
      expect(
        document.metadata.chapters.some((chapter) => chapter.evidence.length > 0),
        document.metadata.slug,
      ).toBe(true)
    }
  })

  it('points public evidence images at committed public assets', () => {
    for (const document of filterPublicDocuments(documents)) {
      for (const evidence of publicEvidence(document.metadata)) {
        const publicAssetPath = join(process.cwd(), 'public', evidence.src.slice(1))

        expect(existsSync(publicAssetPath), `${document.metadata.slug}: ${evidence.src}`).toBe(true)
      }
    }
  })

  it('keeps explorations separate from shipped work', () => {
    const publicDocuments = filterPublicDocuments(documents)
    const shippedWork = publicDocuments.filter(({ metadata }) => metadata.kind === 'shipped-work')
    const explorations = publicDocuments.filter(({ metadata }) => metadata.kind === 'exploration')

    expect(shippedWork.map(({ metadata }) => metadata.slug)).toEqual([
      'ecobuiltconnect',
      'artisanconnect',
      'rushuploads',
    ])
    expect(explorations.map(({ metadata }) => metadata.slug)).toEqual(['fraud-detection-system'])
    expect(explorations[0]?.metadata.statusLabel).toMatch(/exploration/i)
  })

  it('keeps public metadata inside the public-safe content boundary', () => {
    const forbiddenPatterns = [
      /https?:\/\//i,
      /\bgithub\b/i,
      /\brepositor(?:y|ies)\b/i,
      /\b\d+(?:\.\d+)?%\b/i,
      /\b(?:revenue|arr|mrr|conversion|growth|users|customers)\b/i,
    ]

    for (const document of filterPublicDocuments(documents)) {
      for (const value of publicMetadataStrings(document.metadata)) {
        for (const pattern of forbiddenPatterns) {
          expect(value, `${document.metadata.slug}: ${value}`).not.toMatch(pattern)
        }
      }
    }
  })

  it('filters drafts from a controlled public document collection', () => {
    const validated = validateDocuments({
      './documents/draft.mdx': moduleWith({
        slug: 'private-draft',
        visibility: 'draft',
      }),
      './documents/public.mdx': moduleWith({
        slug: 'public-document',
        visibility: 'public',
      }),
    })

    expect(filterPublicDocuments(validated).map(({ metadata }) => metadata.slug)).toEqual([
      'public-document',
    ])
  })

  it('rejects invalid metadata at the content boundary', () => {
    expect(() =>
      validateDocuments({
        './documents/invalid.mdx': moduleWith({ slug: 'Invalid Slug' }),
      }),
    ).toThrow(/invalid metadata.*\.\/documents\/invalid\.mdx.*slug/is)
  })

  it('rejects duplicate slugs with both source paths', () => {
    expect(() =>
      validateDocuments({
        './documents/first.mdx': moduleWith({ slug: 'same-slug' }),
        './documents/second.mdx': moduleWith({ slug: 'same-slug' }),
      }),
    ).toThrow(/duplicate slug.*same-slug.*first\.mdx.*second\.mdx/i)
  })

  it('sorts validated documents by order', () => {
    const validated = validateDocuments({
      './documents/later.mdx': moduleWith({ order: 2, slug: 'later' }),
      './documents/earlier.mdx': moduleWith({ order: 1, slug: 'earlier' }),
    })

    expect(validated.map(({ metadata }) => metadata.slug)).toEqual(['earlier', 'later'])
  })

  it('sorts documents with the same order by slug', () => {
    const validated = validateDocuments({
      './documents/zulu.mdx': moduleWith({ order: 1, slug: 'zulu' }),
      './documents/alpha.mdx': moduleWith({ order: 1, slug: 'alpha' }),
    })

    expect(validated.map(({ metadata }) => metadata.slug)).toEqual(['alpha', 'zulu'])
  })

  it('rejects blank repository copy', () => {
    expect(() =>
      validateDocuments({
        './documents/blank.mdx': moduleWith({ title: '   ' }),
      }),
    ).toThrow(/title/i)
  })

  it('rejects unknown metadata fields', () => {
    const validDocumentModule = moduleWith()
    const documentModule: DocumentModule = {
      default: validDocumentModule.default,
      frontmatter: {
        ...validDocumentModule.frontmatter,
        unexpected: true,
      },
    }

    expect(() => validateDocuments({ './documents/extra.mdx': documentModule })).toThrow(
      /unexpected/i,
    )
  })
})
