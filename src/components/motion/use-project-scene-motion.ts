import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'

import { createMotionMatchMedia } from '@/components/motion/create-motion-match-media'
import { gsap } from '@/components/motion/gsap-setup'

export function useProjectSceneMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (!scope.current) {
        return () => undefined
      }

      const scenes = gsap.utils.toArray<HTMLElement>(
        scope.current.querySelectorAll('[data-project-scene]'),
      )

      return createMotionMatchMedia(
        (context) => {
          const desktop = context.conditions?.desktop ?? false

          for (const scene of scenes) {
            const claim = scene.querySelector('[data-project-claim]')
            const evidence = scene.querySelector('[data-project-evidence]')
            const timeline = gsap.timeline({
              scrollTrigger: {
                end: 'center 42%',
                scrub: desktop ? 0.55 : 0.25,
                start: 'top 86%',
                trigger: scene,
              },
            })

            timeline.fromTo(
              claim,
              { opacity: 0.72, x: desktop ? -24 : -8 },
              { ease: 'none', opacity: 1, x: 0 },
              0,
            )
            timeline.fromTo(
              evidence,
              { opacity: 0.62, scale: desktop ? 0.94 : 0.98, y: desktop ? 30 : 10 },
              { ease: 'none', opacity: 1, scale: 1, y: 0 },
              0,
            )
          }
        },
        { desktop: '(min-width: 1024px)' },
      )
    },
    { scope },
  )
}
