import { useRef } from 'react'

import { useRevealMotion } from '@/components/motion/use-reveal-motion'
import { HeroOrbitBackdrop } from '@/components/orbit/hero-orbit-backdrop'
import { OrbitChip } from '@/components/orbit/orbit-chip'

export function HeroOrbitSection() {
  const scope = useRef<HTMLElement | null>(null)

  useRevealMotion(scope)

  return (
    <section
      ref={scope}
      className="relative isolate overflow-hidden px-5 pt-12 pb-14 sm:px-8 sm:pt-14 sm:pb-16 lg:px-12 portrait-tall:flex portrait-tall:flex-col landscape-wide:mx-auto landscape-wide:grid landscape-wide:max-w-7xl landscape-wide:grid-cols-[minmax(0,1fr)_minmax(16rem,46rem)] landscape-wide:items-center landscape-wide:gap-6"
      aria-labelledby="intro-heading"
    >
      <div className="relative z-10 portrait-tall:mx-auto portrait-tall:max-w-7xl landscape-wide:min-w-0">
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

      <HeroOrbitBackdrop
        variant="home"
        placement="stacked"
        className="portrait-tall:mx-auto portrait-tall:mt-10 portrait-tall:max-w-7xl landscape-wide:hidden"
      />
      <HeroOrbitBackdrop
        variant="home"
        placement="aside"
        className="portrait-tall:hidden landscape-wide:relative landscape-wide:z-0"
      />
    </section>
  )
}
