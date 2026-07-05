import { HeroSolarSystem } from '@/components/orbit/hero-solar-system'
import { cn } from '@/lib/utils'

const backdropVariants = {
  home: 'absolute top-[18%] right-[-10rem] h-80 w-[46rem] opacity-90 sm:top-[19%] sm:right-[-7rem] sm:h-96 lg:right-[-2rem] xl:right-[3rem] xl:h-[30rem]',
  'case-study':
    'absolute top-[24%] right-[-11rem] h-72 w-[42rem] opacity-82 sm:right-[-7rem] sm:h-88 lg:right-[-2rem] xl:right-[2rem] xl:h-[28rem]',
} as const

export function HeroOrbitBackdrop({ variant }: { variant: keyof typeof backdropVariants }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-7xl" aria-hidden="true">
      <div className={cn(backdropVariants[variant])}>
        <HeroSolarSystem />
      </div>
    </div>
  )
}
