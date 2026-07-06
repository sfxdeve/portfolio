import type { HeroOrbitVariant } from '@/components/orbit/hero-orbit-layout'
import { HeroSolarSystem } from '@/components/orbit/hero-solar-system'
import { cn } from '@/lib/utils'

const backdropVariants = {
  home: {
    overlay:
      'absolute top-6 right-[-10rem] h-80 w-[46rem] opacity-90 sm:top-8 sm:right-[-7rem] sm:h-96 lg:top-10 lg:right-[-2rem] xl:right-[3rem] xl:h-[30rem]',
    stacked:
      'relative mx-auto h-56 w-full max-w-[28rem] opacity-90 sm:h-64 sm:max-w-[32rem] md:max-w-[36rem]',
  },
  'case-study': {
    overlay:
      'absolute top-8 right-[-11rem] h-72 w-[42rem] opacity-82 sm:top-10 sm:right-[-7rem] sm:h-88 lg:top-12 lg:right-[-2rem] xl:right-[2rem] xl:h-[28rem]',
    stacked:
      'relative mx-auto h-52 w-full max-w-[26rem] opacity-82 sm:h-60 sm:max-w-[30rem] md:max-w-[34rem]',
  },
} as const

export function HeroOrbitBackdrop({
  variant,
  placement,
  className,
}: {
  variant: HeroOrbitVariant
  placement: keyof (typeof backdropVariants)[HeroOrbitVariant]
  className?: string
}) {
  if (placement === 'overlay') {
    return (
      <div
        className={cn('pointer-events-none absolute inset-0 z-0 mx-auto max-w-7xl', className)}
        aria-hidden="true"
      >
        <div className={backdropVariants[variant].overlay}>
          <HeroSolarSystem />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('pointer-events-none', backdropVariants[variant][placement], className)}
      aria-hidden="true"
    >
      <HeroSolarSystem />
    </div>
  )
}
