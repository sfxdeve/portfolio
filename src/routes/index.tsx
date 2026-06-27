import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { EvidenceFigure } from '@/components/case-study/evidence-figure'
import { ContactForm } from '@/components/contact/contact-form'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { PortfolioDocument } from '@/content/document-schema'
import { publicDocuments } from '@/content/documents'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const shippedWork = publicDocuments.filter(({ metadata }) => metadata.kind === 'shipped-work')
  const exploration = publicDocuments.find(
    ({ metadata }) => metadata.slug === 'fraud-detection-system',
  )

  return (
    <main>
      <HeroSection />
      <SelectedWorkSection documents={shippedWork} />
      {exploration ? <ExplorationSection document={exploration} /> : null}
      <WorkingPhilosophySection />
      <ContactSection />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="grid min-h-svh place-items-center px-6 py-16">
      <div className="w-full max-w-5xl" aria-labelledby="intro-heading">
        <p className="mb-4 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Senior Product Engineer
        </p>
        <h1
          id="intro-heading"
          className="max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-6xl"
        >
          I bring complex digital products from idea to reality.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          I take on the difficult parts, bring people and decisions together, and stay with the work
          until it is out in the world and working as it should.
        </p>
      </div>
    </section>
  )
}

function SelectedWorkSection({ documents }: { documents: PortfolioDocument[] }) {
  return (
    <section id="work" className="px-6 py-20 sm:py-28" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 id="work-heading" className="text-3xl leading-tight font-semibold sm:text-5xl">
            Selected work with the evidence close by.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Each story connects the product tension, the decisions that shaped it, and the visual
            proof that makes the work inspectable.
          </p>
        </div>
        <div className="mt-14 flex flex-col gap-20">
          {documents.map((document) => (
            <WorkChapter key={document.metadata.slug} document={document} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkChapter({ document }: { document: PortfolioDocument }) {
  const evidence = document.metadata.homepage.evidence[0]

  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
      <div>
        <Badge variant="secondary">{document.metadata.statusLabel}</Badge>
        <h3 className="mt-3 text-2xl leading-tight font-semibold sm:text-4xl">
          {document.metadata.title}
        </h3>
        <p className="mt-5 text-xl leading-8 text-balance">{document.metadata.homepage.claim}</p>
        <p className="mt-5 leading-7 text-muted-foreground">{document.metadata.homepage.summary}</p>
        <Link
          to="/work/$slug"
          params={{ slug: document.metadata.slug }}
          className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'mt-7 h-auto p-0')}
        >
          {document.metadata.homepage.routeLabel}
          <ArrowRight aria-hidden="true" data-icon="inline-end" />
        </Link>
      </div>
      {evidence ? (
        <EvidenceFigure evidence={evidence} eager={document.metadata.order === 1} />
      ) : null}
    </article>
  )
}

function ExplorationSection({ document }: { document: PortfolioDocument }) {
  return (
    <section
      className="border-y bg-muted/40 px-6 py-20 sm:py-28"
      aria-labelledby="exploration-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <Badge variant="outline">{document.metadata.statusLabel}</Badge>
          <h2
            id="exploration-heading"
            className="mt-3 text-3xl leading-tight font-semibold sm:text-5xl"
          >
            {document.metadata.homepage.claim}
          </h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-muted-foreground">
            {document.metadata.homepage.summary}
          </p>
          <p className="mt-5 leading-7 text-muted-foreground">
            It was not commercial shipped work. The value of the exploration was in the system
            reasoning: separating risk score from severity, preserving evidence, calibrating alert
            families to local channels, and designing review around operational judgment.
          </p>
          <Link
            to="/work/$slug"
            params={{ slug: document.metadata.slug }}
            className={cn(buttonVariants({ variant: 'link', size: 'lg' }), 'mt-7 h-auto p-0')}
          >
            {document.metadata.homepage.routeLabel}
            <ArrowRight aria-hidden="true" data-icon="inline-end" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function WorkingPhilosophySection() {
  const principles = [
    {
      title: 'Close to the problem',
      copy: 'I try to understand where the product is actually difficult: the handoff that can fail, the decision that needs evidence, the edge case that changes trust, or the workflow where a person has to make a judgment under pressure.',
    },
    {
      title: 'Clear about decisions',
      copy: 'Good product engineering is often deciding what not to build yet. I like making those calls visible: what the first version must handle, what it should avoid, and what needs review before becoming real.',
    },
    {
      title: 'Responsible for the outcome',
      copy: 'Shipping is not the end of the work. The product still needs to explain itself, recover from awkward states, support the people operating it, and keep its promises when real users move through it.',
    },
  ]

  return (
    <section id="approach" className="px-6 py-20 sm:py-28" aria-labelledby="approach-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="approach-heading"
          className="max-w-3xl text-3xl leading-tight font-semibold sm:text-5xl"
        >
          Seniority shows up in the shape of the decisions.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {principles.map((principle) => (
            <Card key={principle.title}>
              <CardHeader>
                <CardTitle>
                  <h3>{principle.title}</h3>
                </CardTitle>
                <CardDescription className="leading-7">{principle.copy}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="px-6 py-20 sm:py-28" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-4xl text-center">
        <h2
          id="contact-heading"
          className="text-3xl leading-tight font-semibold text-balance sm:text-5xl"
        >
          If the work is difficult enough to need product judgment and engineering follow through, I
          would like to hear about it.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          I am especially interested in product work where the requirements are tangled, the trust
          boundary matters, and the final system has to be useful in the real world.
        </p>
        <ContactForm />
      </div>
    </section>
  )
}
