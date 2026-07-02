import type { ReactNode } from 'react'

import { OrbitChip } from '@/components/orbit/orbit-chip'
import { cn } from '@/lib/utils'

type SectionIntroProps = {
  children?: ReactNode
  chip: ReactNode
  className?: string
  description?: ReactNode
  heading: ReactNode
  headingId: string
  headingLevel?: 'h2' | 'h3'
}

export function SectionIntro({
  children,
  chip,
  className,
  description,
  heading,
  headingId,
  headingLevel = 'h2',
}: SectionIntroProps) {
  const Heading = headingLevel

  return (
    <div className={cn('max-w-4xl', className)}>
      <OrbitChip>{chip}</OrbitChip>
      <Heading
        id={headingId}
        className="mt-4 text-4xl leading-tight font-medium text-balance sm:text-5xl lg:text-6xl"
      >
        {heading}
      </Heading>
      {description ? (
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}
