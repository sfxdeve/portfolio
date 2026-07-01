import { useRef } from 'react'

import { HeroSolarSystem } from '@/components/orbit/hero-solar-system'
import { OrbitChip } from '@/components/orbit/orbit-chip'
import { useOrbitReveal } from '@/components/orbit/use-orbit-reveal'

export function HeroOrbitSection() {
  const scope = useRef<HTMLElement | null>(null)

  useOrbitReveal(scope)

  return (
    <section
      ref={scope}
      className="relative isolate min-h-[calc(100svh-6rem)] overflow-hidden px-5 pt-12 pb-14 sm:px-8 sm:pt-14 sm:pb-16 lg:px-12"
      aria-labelledby="intro-heading"
    >
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.05fr)] xl:items-center">
        <div className="max-w-4xl" data-orbit-reveal>
          <OrbitChip tone="coral">Senior Product Engineer</OrbitChip>
          <h1
            id="intro-heading"
            className="mt-6 max-w-4xl text-4xl leading-[1.04] font-medium text-balance max-[379px]:text-[2.25rem] max-[379px]:leading-[1.06] sm:text-5xl lg:text-6xl"
          >
            I bring complex digital products from idea to reality.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I take on the difficult parts, bring people and decisions together, and stay with the
            work until it is out in the world and working as it should.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none relative min-h-72 overflow-visible sm:min-h-96 xl:min-h-120"
        >
          <HeroSolarSystem />
        </div>
      </div>
    </section>
  )
}
