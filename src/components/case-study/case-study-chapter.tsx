import { useRef } from 'react'

import { claimEvidenceGridClassName } from '@/components/layout/claim-evidence-grid'
import { useChapterScrollMotion } from '@/components/motion/use-chapter-scroll-motion'
import { OrbitChip } from '@/components/orbit/orbit-chip'
import type { DocumentMetadata } from '@/content/document-schema'
import { cn } from '@/lib/utils'

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
  const articleRef = useRef<HTMLElement>(null)
  const claimRef = useRef<HTMLDivElement>(null)

  useChapterScrollMotion(articleRef, claimRef, chapter.evidence.length)

  return (
    <article ref={articleRef} className={cn(claimEvidenceGridClassName, 'relative lg:items-start')}>
      <div ref={claimRef} data-chapter-claim>
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
      <div
        className="flex w-full flex-col gap-5 lg:max-w-[38rem] lg:justify-self-end"
        data-evidence-column
      >
        {chapter.evidence.map((evidence, evidenceIndex) => (
          <div key={evidence.src} data-evidence-item>
            <EvidenceFigure
              evidence={evidence}
              eager={isFirstPublicWork && chapterIndex === 0 && evidenceIndex === 0}
            />
          </div>
        ))}
      </div>
    </article>
  )
}
