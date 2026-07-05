import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { RefObject } from 'react'

import { useReducedMotion } from '@/components/motion/use-reduced-motion'

const REVEAL_MOTION = {
  from: { autoAlpha: 0, y: 10 },
  to: {
    autoAlpha: 1,
    duration: 0.48,
    ease: 'power2.out',
    stagger: 0.035,
    y: 0,
  },
} as const

export function useRevealMotion(scope: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !scope.current) {
        return
      }

      const elements = scope.current.querySelectorAll('[data-reveal-motion]')

      gsap.fromTo(elements, REVEAL_MOTION.from, REVEAL_MOTION.to)
    },
    { dependencies: [prefersReducedMotion], scope },
  )
}
