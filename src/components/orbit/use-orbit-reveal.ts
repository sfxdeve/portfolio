import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { RefObject } from 'react'

import { useReducedMotion } from './use-reduced-motion'

const ORBIT_REVEAL_MOTION = {
  from: { autoAlpha: 0, y: 10 },
  to: {
    autoAlpha: 1,
    duration: 0.48,
    ease: 'power2.out',
    stagger: 0.035,
    y: 0,
  },
} as const

export function useOrbitReveal(scope: RefObject<HTMLElement | null>) {
  const prefersReducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion || !scope.current) {
        return
      }

      const elements = scope.current.querySelectorAll('[data-orbit-reveal]')

      gsap.fromTo(elements, ORBIT_REVEAL_MOTION.from, ORBIT_REVEAL_MOTION.to)
    },
    { dependencies: [prefersReducedMotion], scope },
  )
}
