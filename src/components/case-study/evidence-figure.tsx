import { ExternalLink } from 'lucide-react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import type { DocumentMetadata } from '@/content/document-schema'
import { cn } from '@/lib/utils'

type Evidence = DocumentMetadata['chapters'][number]['evidence'][number]

export function EvidenceFigure({
  cardClassName,
  className,
  evidence,
  eager = false,
}: {
  cardClassName?: string
  className?: string
  evidence: Evidence
  eager?: boolean
}) {
  return (
    <figure className={cn('group/evidence', className)}>
      <Card variant="orbit" className={cn('rounded-[1rem] p-1.5', cardClassName)}>
        <a
          href={evidence.src}
          target="_blank"
          rel="noreferrer"
          aria-label={`View full-size image: ${evidence.alt} (opens in a new tab)`}
          className="block overflow-hidden rounded-[0.75rem] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <AspectRatio ratio={evidence.width / evidence.height}>
            <img
              src={evidence.src}
              alt={evidence.alt}
              width={evidence.width}
              height={evidence.height}
              sizes="(min-width: 1280px) 38rem, (min-width: 1024px) 34rem, 100vw"
              decoding="async"
              fetchPriority={eager ? 'high' : 'auto'}
              className="size-full object-cover transition duration-300 group-hover/evidence:scale-[1.01]"
              loading={eager ? 'eager' : 'lazy'}
            />
          </AspectRatio>
          <span className="flex items-center justify-end gap-1.5 px-3 py-2 text-xs font-semibold text-muted-foreground transition group-hover/evidence:text-foreground">
            View full size
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </span>
        </a>
        {evidence.caption ? (
          <figcaption className="px-3 pt-3 pb-2 text-sm leading-6 text-muted-foreground">
            {evidence.caption}
          </figcaption>
        ) : null}
      </Card>
    </figure>
  )
}
