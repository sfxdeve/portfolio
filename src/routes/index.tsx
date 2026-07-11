import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '@/components/home/home-page'
import { createSiteHead } from '@/lib/site-meta'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => {
    const head = createSiteHead()

    return {
      links: head.links,
      meta: [{ title: head.title }, ...head.meta],
    }
  },
})
