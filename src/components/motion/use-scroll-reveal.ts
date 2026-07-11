import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'

import { gsap } from '@/components/motion/gsap-setup'

const SCROLL_REVEAL = {
  from: { opacity: 0, y: 22 },
  to: {
    opacity: 1,
    duration: 0.62,
    ease: 'power2.out',
    y: 0,
  },
} as const

export function useScrollReveal(
  scope: RefObject<HTMLElement | null>,
  selector = '[data-scroll-reveal]',
) {
  useGSAP(
    () => {
      if (!scope.current) {
        return () => undefined
      }

      const scopeElement = scope.current
      const matchMedia = gsap.matchMedia()

      matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
        const elements = gsap.utils.toArray<HTMLElement>(scopeElement.querySelectorAll(selector))

        for (const element of elements) {
          gsap.fromTo(
            element,
            { ...SCROLL_REVEAL.from, immediateRender: false },
            {
              ...SCROLL_REVEAL.to,
              scrollTrigger: {
                trigger: element,
                start: 'top 88%',
                once: true,
              },
            },
          )
        }
      })

      return () => matchMedia.revert()
    },
    { dependencies: [selector], scope },
  )
}
