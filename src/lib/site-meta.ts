import { siteConfig, resolveSiteUrl } from '@/config/site'

type SiteHeadOptions = {
  description?: string
  path?: string
  title?: string
  type?: 'article' | 'website'
}

export function createSiteHead({
  description = siteConfig.description,
  path = '/',
  title = siteConfig.title,
  type = 'website',
}: SiteHeadOptions = {}) {
  const origin = resolveSiteUrl()
  const canonical = origin ? `${origin}${path}` : undefined

  const meta = [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:locale', content: siteConfig.locale },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]

  if (canonical) {
    meta.push({ property: 'og:url', content: canonical })
  }

  const links = canonical ? [{ rel: 'canonical', href: canonical }] : []

  return {
    links,
    meta,
    title,
  }
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
