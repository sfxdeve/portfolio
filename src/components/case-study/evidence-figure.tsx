import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import type { DocumentMetadata } from '@/content/document-schema'
import { cn } from '@/lib/utils'

type Evidence = DocumentMetadata['chapters'][number]['evidence'][number]

export function EvidenceFigure({
  className,
  evidence,
  eager = false,
}: {
  className?: string
  evidence: Evidence
  eager?: boolean
}) {
  return (
    <figure className={cn('group/evidence', className)}>
      <Card variant="orbit" className="rounded-[1rem] p-1.5">
        <a
          href={evidence.src}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open image: ${evidence.alt}`}
          className="block overflow-hidden rounded-[0.75rem] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <AspectRatio ratio={evidence.width / evidence.height}>
            <img
              src={evidence.src}
              alt={evidence.alt}
              width={evidence.width}
              height={evidence.height}
              className="size-full object-cover transition duration-300 group-hover/evidence:scale-[1.01]"
              loading={eager ? 'eager' : 'lazy'}
            />
          </AspectRatio>
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
