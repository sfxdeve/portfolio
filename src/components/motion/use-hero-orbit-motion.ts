import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'

import { createMotionMatchMedia } from '@/components/motion/create-motion-match-media'
import { gsap } from '@/components/motion/gsap-setup'

export function useHeroOrbitMotion(scope: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      if (!scope.current) {
        return () => undefined
      }

      const planets = scope.current.querySelectorAll('[data-orbit-planet]')
      const sun = scope.current.querySelector('[data-orbit-sun]')

      return createMotionMatchMedia(
        (context) => {
          const desktop = context.conditions?.desktop ?? false
          const travel = desktop ? 18 : 6

          gsap.fromTo(
            scope.current,
            { opacity: 0.68, scale: desktop ? 0.92 : 0.97 },
            { duration: 0.9, ease: 'power2.out', opacity: 1, scale: 1 },
          )
          const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
              end: 'bottom top',
              scrub: desktop ? 0.7 : 0.3,
              start: 'top top',
              trigger: scope.current,
            },
          })

          parallaxTimeline.fromTo(
            planets,
            { y: travel },
            {
              ease: 'none',
              stagger: 0.04,
              y: -travel,
            },
            0,
          )
          parallaxTimeline.fromTo(
            sun,
            { scale: 0.96 },
            {
              ease: 'none',
              scale: desktop ? 1.08 : 1.03,
            },
            0,
          )
        },
        { desktop: '(min-width: 1024px)' },
      )
    },
    { scope },
  )
}
