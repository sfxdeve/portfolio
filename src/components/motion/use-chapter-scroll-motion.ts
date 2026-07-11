import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'

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
      const matchMedia = gsap.matchMedia()

      matchMedia.add(
        {
          desktop: '(min-width: 1024px)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const desktop = context.conditions?.desktop ?? false
          const motion = context.conditions?.motion ?? false

          if (!motion) {
            return
          }

          if (evidenceItems.length > 0) {
            gsap.fromTo(
              evidenceItems,
              { opacity: 0, immediateRender: false, y: 18 },
              {
                opacity: 1,
                duration: 0.48,
                ease: 'power2.out',
                stagger: 0.14,
                scrollTrigger: {
                  trigger: articleRef.current,
                  start: 'top 72%',
                  once: true,
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
      )

      return () => {
        matchMedia.revert()
      }
    },
    { dependencies: [evidenceCount], scope: articleRef },
  )
}
