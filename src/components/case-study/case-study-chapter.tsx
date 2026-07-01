import { OrbitChip } from '@/components/orbit/orbit-chip'
import type { DocumentMetadata } from '@/content/document-schema'

import { EvidenceFigure } from './evidence-figure'

type Chapter = DocumentMetadata['chapters'][number]

export function CaseStudyChapter({
  chapter,
  chapterIndex,
  isFirstPublicWork,
}: {
  chapter: Chapter
  chapterIndex: number
  isFirstPublicWork: boolean
}) {
  return (
    <article className="relative grid min-w-0 gap-7 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.05fr)] lg:items-start">
      <div className="lg:sticky lg:top-24">
        <OrbitChip tone="coral">Chapter {chapterIndex + 1}</OrbitChip>
        <h2 className="mt-4 text-2xl leading-tight font-medium text-balance sm:text-3xl lg:text-4xl">
          {chapter.title}
        </h2>
        <p className="mt-4 text-base leading-7 sm:text-lg sm:leading-8">{chapter.claim}</p>
        {chapter.decision ? (
          <p className="mt-4 leading-7 text-muted-foreground">
            <span className="font-semibold text-foreground">Decision: </span>
            {chapter.decision}
          </p>
        ) : null}
        <p className="mt-4 leading-7 text-muted-foreground">{chapter.reasoning}</p>
      </div>
      <div className="flex flex-col gap-5">
        {chapter.evidence.map((evidence, evidenceIndex) => (
          <EvidenceFigure
            key={evidence.src}
            evidence={evidence}
            eager={isFirstPublicWork && chapterIndex === 0 && evidenceIndex === 0}
          />
        ))}
      </div>
    </article>
  )
}
