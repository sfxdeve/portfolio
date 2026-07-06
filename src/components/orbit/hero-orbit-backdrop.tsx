import { HeroSolarSystem } from '@/components/orbit/hero-solar-system'
import { cn } from '@/lib/utils'

const backdropVariants = {
  home: {
    overlay:
      'absolute top-[18%] right-[-10rem] h-80 w-[46rem] opacity-90 sm:top-[19%] sm:right-[-7rem] sm:h-96 lg:right-[-2rem] xl:right-[3rem] xl:h-[30rem]',
    aside:
      'relative h-72 w-full max-w-[46rem] opacity-90 sm:h-80 lg:h-96 xl:h-[30rem] landscape-wide:justify-self-end',
    stacked:
      'relative mx-auto h-56 w-full max-w-[28rem] opacity-90 sm:h-64 sm:max-w-[32rem] md:max-w-[36rem]',
  },
  'case-study': {
    overlay:
      'absolute top-[24%] right-[-11rem] h-72 w-[42rem] opacity-82 sm:right-[-7rem] sm:h-88 lg:right-[-2rem] xl:right-[2rem] xl:h-[28rem]',
    aside:
      'relative h-64 w-full max-w-[42rem] opacity-82 sm:h-80 lg:h-[28rem] landscape-wide:justify-self-end',
    stacked:
      'relative mx-auto h-52 w-full max-w-[26rem] opacity-82 sm:h-60 sm:max-w-[30rem] md:max-w-[34rem]',
  },
} as const

export function HeroOrbitBackdrop({
  variant,
  placement,
  className,
}: {
  variant: keyof typeof backdropVariants
  placement: keyof (typeof backdropVariants)[typeof variant]
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
