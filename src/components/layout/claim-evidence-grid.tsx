import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export const claimEvidenceGridClassName =
  'grid min-w-0 gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.9fr)] lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.88fr)]'

export function ClaimEvidenceGrid<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: {
  as?: T
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>) {
  const Component = as ?? 'div'

  return (
    <Component className={cn(claimEvidenceGridClassName, className)} {...props}>
      {children}
    </Component>
  )
}
