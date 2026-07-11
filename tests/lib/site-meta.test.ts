import { afterEach, describe, expect, it, vi } from 'vitest'

import { siteConfig } from '@/config/site'
import { createSiteHead, createWorkHead } from '@/lib/site-meta'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('createSiteHead', () => {
  it('returns default homepage metadata', () => {
    const head = createSiteHead()

    expect(head.title).toBe(siteConfig.title)
    expect(head.meta).toEqual(
      expect.arrayContaining([
        { name: 'description', content: siteConfig.description },
        { property: 'og:title', content: siteConfig.title },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: siteConfig.socialImage },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: siteConfig.socialImage },
      ]),
    )
    expect(head.links).toEqual([])
  })

  it('uses the documented Vite origin for absolute social and canonical URLs', () => {
    vi.stubEnv('VITE_SITE_URL', 'https://portfolio.example/')

    const head = createSiteHead()

    expect(head.links).toEqual([{ rel: 'canonical', href: 'https://portfolio.example/' }])
    expect(head.meta).toEqual(
      expect.arrayContaining([
        { property: 'og:url', content: 'https://portfolio.example/' },
        {
          property: 'og:image',
          content: 'https://portfolio.example/og/portfolio-card.png',
        },
      ]),
    )
  })

  it('marks non-indexable pages without publishing a canonical URL', () => {
    vi.stubEnv('VITE_SITE_URL', 'https://portfolio.example')

    const head = createSiteHead({ indexable: false })

    expect(head.links).toEqual([])
    expect(head.meta).toContainEqual({ name: 'robots', content: 'noindex, nofollow' })
    expect(head.meta).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ property: 'og:url' })]),
    )
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
        { property: 'og:image', content: siteConfig.socialImage },
        { name: 'description', content: 'A case study description.' },
      ]),
    )
  })
})
