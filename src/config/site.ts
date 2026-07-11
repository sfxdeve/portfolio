export const siteConfig = {
  name: 'Shayan Fareed',
  title: 'Shayan Fareed — Product Engineer',
  description:
    'Shayan Fareed is a product engineer who brings complex digital products from idea to reality.',
  locale: 'en_US',
  socialImage: '/og/portfolio-card.png',
} as const

export function resolveSiteUrl(): string | undefined {
  const configured = import.meta.env.VITE_SITE_URL

  if (typeof configured !== 'string' || configured.length === 0) {
    return undefined
  }

  return configured.replace(/\/$/, '')
}
