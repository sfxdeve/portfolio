import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'

import { createMotionMatchMedia } from '@/components/motion/create-motion-match-media'
import { gsap, ScrollTrigger } from '@/components/motion/gsap-setup'

export function useChapterScrollMotion(
  articleRef: RefObject<HTMLElement | null>,
  claimRef: RefObject<HTMLElement | null>,
  evidenceCount: number,
) {
  useGSAP(
    () => {
      if (!articleRef.current || !claimRef.current) {
        return () => undefined
      }

      const evidenceColumn = articleRef.current.querySelector('[data-evidence-column]')
      const evidenceItems = articleRef.current.querySelectorAll('[data-evidence-item]')

      return createMotionMatchMedia(
        (context) => {
          const desktop = context.conditions?.desktop ?? false

          for (const [evidenceIndex, evidenceItem] of evidenceItems.entries()) {
            gsap.fromTo(
              evidenceItem,
              {
                immediateRender: false,
                opacity: 0.56,
                scale: desktop ? 0.94 : 0.98,
                y: desktop ? 24 : 10,
              },
              {
                duration: 0.62,
                ease: 'power2.out',
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                  start: `top ${82 - Math.min(evidenceIndex, 2) * 4}%`,
                  trigger: evidenceItem,
                },
                y: 0,
              },
            )
          }

          if (!desktop || evidenceCount < 2 || !evidenceColumn) {
            return
          }

          ScrollTrigger.create({
            anticipatePin: 1,
            end: () =>
              `+=${Math.max(evidenceColumn.scrollHeight - claimRef.current!.offsetHeight, 0)}`,
            invalidateOnRefresh: true,
            pin: claimRef.current,
            pinSpacing: true,
            start: 'top top+=96',
            trigger: articleRef.current,
          })
        },
        { desktop: '(min-width: 1024px)' },
      )
    },
    { dependencies: [evidenceCount], scope: articleRef },
  )
}
