import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function StoryRouteLink({
  children,
  className,
  slug,
}: {
  children: React.ReactNode
  className?: string
  slug: string
}) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug }}
      className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'mt-7 h-auto p-0', className)}
    >
      {children}
      <ArrowRight aria-hidden="true" data-icon="inline-end" />
    </Link>
  )
}
