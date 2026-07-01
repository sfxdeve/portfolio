import { ContactForm } from '@/components/contact/contact-form'
import { OrbitChip } from '@/components/orbit/orbit-chip'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl text-center">
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
    </section>
  )
}
