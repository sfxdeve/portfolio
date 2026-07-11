import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'

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
      const matchMedia = gsap.matchMedia()

      matchMedia.add('(prefers-reduced-motion: no-preference)', () => {
        const elements = scopeElement.querySelectorAll('[data-reveal-motion]')

        gsap.fromTo(elements, REVEAL_MOTION.from, REVEAL_MOTION.to)
      })

      return () => matchMedia.revert()
    },
    { scope },
  )
}
