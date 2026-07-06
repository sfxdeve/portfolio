import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { HeroOrbitBackdrop } from '@/components/orbit/hero-orbit-backdrop'
import { cn } from '@/lib/utils'

export type HeroOrbitVariant = 'home' | 'case-study'

const sectionClassName: Record<HeroOrbitVariant, string> = {
  home: 'px-5 pt-12 pb-14 sm:px-8 sm:pt-14 sm:pb-16 lg:px-12',
  'case-study': 'px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 lg:px-12 lg:pt-16 lg:pb-24',
}

type HeroOrbitLayoutProps = ComponentPropsWithoutRef<'section'> & {
  variant: HeroOrbitVariant
  labelledBy: string
}

export const HeroOrbitLayout = forwardRef<HTMLElement, HeroOrbitLayoutProps>(
  function HeroOrbitLayout({ variant, labelledBy, className, children, ...props }, ref) {
    return (
      <section
        ref={ref}
        className={cn('relative isolate overflow-hidden', sectionClassName[variant], className)}
        aria-labelledby={labelledBy}
        {...props}
      >
        <HeroOrbitBackdrop variant={variant} placement="overlay" className="portrait-tall:hidden" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {children}

          <HeroOrbitBackdrop
            variant={variant}
            placement="stacked"
            className="mt-10 landscape-wide:hidden"
          />
        </div>
      </section>
    )
  },
)
