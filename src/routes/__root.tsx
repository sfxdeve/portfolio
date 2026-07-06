import '@/components/motion/gsap-setup'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { SiteNavigation } from '@/components/site/site-navigation'

import styles from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Shayan Fareed — Senior Product Engineer' },
      {
        name: 'description',
        content:
          'Shayan Fareed is a senior product engineer who brings complex digital products from idea to reality.',
      },
    ],
    links: [{ rel: 'stylesheet', href: styles }],
  }),
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
