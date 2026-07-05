import { useRef } from 'react'

import { PageSection } from '@/components/layout/page-section'
import { SectionIntro } from '@/components/layout/section-intro'
import { useScrollReveal } from '@/components/motion/use-scroll-reveal'

export function AboutSection() {
  const scope = useRef<HTMLElement>(null)

  useScrollReveal(scope)

  return (
    <PageSection id="approach" aria-labelledby="approach-heading" ref={scope}>
      <div data-scroll-reveal>
        <SectionIntro
          chip="Approach"
          heading="Product engineering as accountable human work."
          headingId="approach-heading"
          description="I work on difficult product situations where the requirements are tangled, the trust boundary matters, and the system has to stay useful after launch."
        />
        <div className="mt-8 grid max-w-4xl gap-6 border-l border-orbit-line/70 pl-5 sm:pl-6">
          <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            The portfolio presents selected work as evidence-led case studies rather than a project
            gallery. Each story connects the product tension, the decisions that shaped it, and the
            visual proof that makes the work inspectable.
          </p>
          <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I take personal responsibility for shaping complex product work and stay close to
            business problems, user constraints, and engineering trade-offs — while making
            collaboration visible where decisions and execution were genuinely shared.
          </p>
        </div>
      </div>
    </PageSection>
  )
}
