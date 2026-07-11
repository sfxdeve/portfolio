import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'

import { createMotionMatchMedia } from '@/components/motion/create-motion-match-media'
import { gsap } from '@/components/motion/gsap-setup'

const REVEAL_MOTION = {
  from: { opacity: 0, y: 10 },
  to: {
    opacity: 1,
    duration: 0.48,
    ease: 'power2.out',
    stagger: 0.035,
    y: 0,
  },
} as const

export function useRevealMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!scope.current) {
        return () => undefined
      }

      const scopeElement = scope.current

      return createMotionMatchMedia(() => {
        const elements = scopeElement.querySelectorAll('[data-reveal-motion]')

        gsap.fromTo(elements, REVEAL_MOTION.from, REVEAL_MOTION.to)
      })
    },
    { scope },
  )
}
