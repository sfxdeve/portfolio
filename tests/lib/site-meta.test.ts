import { describe, expect, it } from 'vitest'

import { siteConfig } from '@/config/site'
import { createSiteHead, createWorkHead } from '@/lib/site-meta'

describe('createSiteHead', () => {
  it('returns default homepage metadata', () => {
    const head = createSiteHead()

    expect(head.title).toBe(siteConfig.title)
    expect(head.meta).toEqual(
      expect.arrayContaining([
        { name: 'description', content: siteConfig.description },
        { property: 'og:title', content: siteConfig.title },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
      ]),
    )
    expect(head.links).toEqual([])
  })
})

describe('createWorkHead', () => {
  it('returns article metadata for work routes', () => {
    const head = createWorkHead({
      description: 'A case study description.',
      slug: 'rushuploads',
      title: 'RushUploads',
    })

    expect(head.title).toBe('RushUploads — Shayan Fareed')
    expect(head.meta).toEqual(
      expect.arrayContaining([
        { property: 'og:type', content: 'article' },
        { name: 'description', content: 'A case study description.' },
      ]),
    )
  })
})
