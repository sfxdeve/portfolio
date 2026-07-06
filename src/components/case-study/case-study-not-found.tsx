import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Empty, EmptyDescription, EmptyHeader } from '@/components/ui/empty'
import { cn } from '@/lib/utils'

export function CaseStudyNotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <Empty className="max-w-xl">
        <EmptyHeader>
          <h1 className="font-heading text-sm font-medium">Case study not found.</h1>
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
