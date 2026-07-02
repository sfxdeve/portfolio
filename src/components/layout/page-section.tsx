import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type PageSectionProps = ComponentPropsWithoutRef<'section'> & {
  children: ReactNode
  containerClassName?: string
}

export function PageSection({
  children,
  className,
  containerClassName,
  ...props
}: PageSectionProps) {
  return (
    <section className={cn('px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24', className)} {...props}>
      <div className={cn('mx-auto max-w-7xl', containerClassName)}>{children}</div>
    </section>
  )
}
