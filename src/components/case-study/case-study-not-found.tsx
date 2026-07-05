import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty'
import { cn } from '@/lib/utils'

export function CaseStudyNotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <Empty className="max-w-xl">
        <EmptyHeader>
          <EmptyTitle role="heading" aria-level={1}>
            Case study not found.
          </EmptyTitle>
          <EmptyDescription>
            The requested case study is not available as public selected work.
          </EmptyDescription>
        </EmptyHeader>
        <Link
          to="/"
          hash="work"
          className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'h-auto p-0')}
        >
          <ArrowLeft aria-hidden="true" data-icon="inline-start" />
          Back
        </Link>
      </Empty>
    </main>
  )
}
