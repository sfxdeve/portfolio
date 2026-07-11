import { gsap } from '@/components/motion/gsap-setup'

const reducedMotionCondition = '(prefers-reduced-motion: no-preference)'

export function createMotionMatchMedia(
  setup: (context: gsap.Context) => void,
  conditions: Record<string, string> = {},
) {
  const matchMedia = gsap.matchMedia()

  matchMedia.add({ ...conditions, motion: reducedMotionCondition }, (context) => {
    if (context.conditions?.motion) {
      setup(context)
    }
  })

  return () => matchMedia.revert()
}
