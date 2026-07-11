import { siteConfig, resolveSiteUrl } from '@/config/site'

type SiteHeadOptions = {
  description?: string
  indexable?: boolean
  path?: string
  title?: string
  type?: 'article' | 'website'
}

export function createSiteHead({
  description = siteConfig.description,
  indexable = true,
  path = '/',
  title = siteConfig.title,
  type = 'website',
}: SiteHeadOptions = {}) {
  const origin = resolveSiteUrl()
  const canonical = indexable && origin ? `${origin}${path}` : undefined
  const socialImage = origin ? `${origin}${siteConfig.socialImage}` : siteConfig.socialImage

  const meta = [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:locale', content: siteConfig.locale },
    { property: 'og:image', content: socialImage },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: siteConfig.title },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: socialImage },
    { name: 'twitter:image:alt', content: siteConfig.title },
  ]

  if (canonical) {
    meta.push({ property: 'og:url', content: canonical })
  }

  if (!indexable) {
    meta.push({ name: 'robots', content: 'noindex, nofollow' })
  }

  const links = canonical ? [{ rel: 'canonical', href: canonical }] : []

  return {
    links,
    meta,
    title,
  }
}

export function createNotFoundHead() {
  return createSiteHead({
    description: 'The requested portfolio case study could not be found.',
    indexable: false,
    title: `Case study not found — ${siteConfig.name}`,
  })
}

export function createWorkHead({
  description,
  slug,
  title,
}: {
  description: string
  slug: string
  title: string
}) {
  return createSiteHead({
    description,
    path: `/work/${slug}`,
    title: `${title} — ${siteConfig.name}`,
    type: 'article',
  })
}
