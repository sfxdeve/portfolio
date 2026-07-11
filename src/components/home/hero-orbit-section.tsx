import { useRef } from 'react'

import { useRevealMotion } from '@/components/motion/use-reveal-motion'
import { HeroOrbitLayout } from '@/components/orbit/hero-orbit-layout'
import { OrbitChip } from '@/components/orbit/orbit-chip'

export function HeroOrbitSection() {
  const scope = useRef<HTMLElement | null>(null)

  useRevealMotion(scope)

  return (
    <HeroOrbitLayout ref={scope} variant="home" labelledBy="intro-heading">
      <div className="max-w-5xl" data-reveal-motion>
        <OrbitChip tone="coral">Product Engineer</OrbitChip>
        <h1
          id="intro-heading"
          className="mt-6 max-w-5xl text-5xl leading-[1.02] font-medium text-balance max-[379px]:text-[2.6rem] max-[379px]:leading-[1.04] sm:text-6xl lg:text-7xl xl:text-[5.35rem]"
        >
          I bring complex digital products from idea to reality.
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          I take on the difficult parts, bring people and decisions together, and stay with the work
          until it is out in the world and working as it should.
        </p>
      </div>
    </HeroOrbitLayout>
  )
}
