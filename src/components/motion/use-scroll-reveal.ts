import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'

import { gsap } from '@/components/motion/gsap-setup'
import { useReducedMotion } from '@/components/motion/use-reduced-motion'

const SCROLL_REVEAL = {
  from: { autoAlpha: 0, y: 22 },
  to: {
    autoAlpha: 1,
    duration: 0.62,
    ease: 'power2.out',
    y: 0,
  },
} as const

export function useScrollReveal(
  scope: RefObject<HTMLElement | null>,
  selector = '[data-scroll-reveal]',
) {
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !scope.current) {
        return
      }

      const elements = gsap.utils.toArray<HTMLElement>(scope.current.querySelectorAll(selector))

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
    },
    { dependencies: [prefersReducedMotion, selector], scope },
  )
}
