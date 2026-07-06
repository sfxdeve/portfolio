import { useRef } from 'react'

import { ContactForm } from '@/components/contact/contact-form'
import { PageSection } from '@/components/layout/page-section'
import { useScrollReveal } from '@/components/motion/use-scroll-reveal'
import { OrbitChip } from '@/components/orbit/orbit-chip'

export function ContactSection() {
  const scope = useRef<HTMLElement>(null)

  useScrollReveal(scope)

  return (
    <PageSection
      ref={scope}
      id="contact"
      aria-labelledby="contact-heading"
      containerClassName="text-center"
    >
      <div data-scroll-reveal>
        <div className="flex justify-center">
          <OrbitChip tone="coral">Contact</OrbitChip>
        </div>
        <h2
          id="contact-heading"
          className="mx-auto mt-4 max-w-4xl text-2xl leading-tight font-medium text-balance sm:text-3xl lg:text-4xl"
        >
          If the work is difficult enough to need product judgment and engineering follow through, I
          would like to hear about it.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          I am especially interested in product work where the requirements are tangled, the trust
          boundary matters, and the final system has to be useful in the real world.
        </p>
        <ContactForm />
      </div>
    </PageSection>
  )
}
