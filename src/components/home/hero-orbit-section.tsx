import { useRef } from 'react'

import { useRevealMotion } from '@/components/motion/use-reveal-motion'
import { HeroSolarSystem } from '@/components/orbit/hero-solar-system'
import { OrbitChip } from '@/components/orbit/orbit-chip'

export function HeroOrbitSection() {
  const scope = useRef<HTMLElement | null>(null)

  useRevealMotion(scope)

  return (
    <section
      ref={scope}
      className="relative isolate min-h-[calc(100svh-6rem)] overflow-hidden px-5 pt-12 pb-14 sm:px-8 sm:pt-14 sm:pb-16 lg:px-12"
      aria-labelledby="intro-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-7xl"
        aria-hidden="true"
      >
        <div className="absolute top-[18%] right-[-10rem] h-80 w-[46rem] opacity-90 sm:top-[19%] sm:right-[-7rem] sm:h-96 lg:right-[-2rem] xl:right-[3rem] xl:h-[30rem]">
          <HeroSolarSystem />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-5xl" data-reveal-motion>
          <OrbitChip tone="coral">Senior Product Engineer</OrbitChip>
          <h1
            id="intro-heading"
            className="mt-6 max-w-5xl text-5xl leading-[1.02] font-medium text-balance max-[379px]:text-[2.6rem] max-[379px]:leading-[1.04] sm:text-6xl lg:text-7xl xl:text-[5.35rem]"
          >
            I bring complex digital products from idea to reality.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I take on the difficult parts, bring people and decisions together, and stay with the
            work until it is out in the world and working as it should.
          </p>
        </div>
      </div>
    </section>
  )
}
