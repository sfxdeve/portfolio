import type { ComponentPropsWithoutRef } from 'react'

import { Badge } from '@/components/ui/badge'
import type { DocumentMetadata } from '@/content/document-schema'
import { cn } from '@/lib/utils'

const toneClasses = {
  coral: 'border-orbit-coral/30 bg-orbit-coral/15 shadow-orbit-soft backdrop-blur-md',
  pearl: 'border-white/70 bg-orbit-pearl shadow-orbit-soft backdrop-blur-md',
  sage: 'border-orbit-sage/30 bg-orbit-sage/15 shadow-orbit-soft backdrop-blur-md',
} as const

export function orbitChipToneForKind(kind: DocumentMetadata['kind']): keyof typeof toneClasses {
  return kind === 'exploration' ? 'sage' : 'coral'
}

export function OrbitChip({
  className,
  tone = 'pearl',
  ...props
}: Omit<ComponentPropsWithoutRef<typeof Badge>, 'variant'> & {
  tone?: keyof typeof toneClasses
}) {
  return (
    <Badge
      {...props}
      variant="outline"
      className={cn('h-auto px-3 py-1 text-foreground', toneClasses[tone], className)}
    />
  )
}
