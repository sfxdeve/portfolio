import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { SiteNavigation } from '@/components/site/site-navigation'
import { createSiteHead } from '@/lib/site-meta'

import styles from '../styles.css?url'

export const Route = createRootRoute({
  head: () => {
    const { links, meta, title } = createSiteHead()

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title },
        ...meta,
      ],
      links: [
        { rel: 'stylesheet', href: styles },
        { rel: 'icon', href: '/orbit/orbit-logo-mark.svg', type: 'image/svg+xml' },
        ...links,
      ],
    }
  },
  shellComponent: RootDocument,
  component: Outlet,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SiteNavigation />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
