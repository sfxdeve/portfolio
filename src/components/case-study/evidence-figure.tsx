import type { DocumentMetadata } from '@/content/document-schema'

type Evidence = DocumentMetadata['chapters'][number]['evidence'][number]

export function EvidenceFigure({
  evidence,
  eager = false,
}: {
  evidence: Evidence
  eager?: boolean
}) {
  return (
    <figure className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <a
        href={evidence.src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open image: ${evidence.alt}`}
      >
        <img
          src={evidence.src}
          alt={evidence.alt}
          width={evidence.width}
          height={evidence.height}
          className="h-auto w-full transition duration-200 hover:scale-[1.01]"
          loading={eager ? 'eager' : 'lazy'}
        />
      </a>
      {evidence.caption ? (
        <figcaption className="border-t px-4 py-3 text-sm text-muted-foreground">
          {evidence.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
