import { OrbitChip } from '@/components/orbit/orbit-chip'
import type { PortfolioDocument } from '@/content/document-schema'

const signals = [
  ['risk-score', 'Risk score'],
  ['severity', 'Severity'],
  ['evidence', 'Evidence'],
  ['analyst-judgment', 'Analyst judgment'],
] as const

export function ExplorationInterlude({ document }: { document: PortfolioDocument }) {
  return (
    <section
      className="relative overflow-hidden border-y border-orbit-line/80 bg-white/24 px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-24"
      aria-labelledby="exploration-heading"
    >
      <div className="mx-auto grid max-w-7xl min-w-0 gap-8 lg:grid-cols-[0.86fr_1.04fr] lg:items-center">
        <div>
          <OrbitChip tone="sage">{document.metadata.statusLabel}</OrbitChip>
          <h2
            id="exploration-heading"
            className="mt-4 text-2xl leading-tight font-medium text-balance sm:text-3xl lg:text-4xl"
          >
            {document.metadata.homepage.claim}
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {document.metadata.homepage.summary}
          </p>
        </div>
        <div
          className="relative border-y border-orbit-line/70 py-6"
          aria-label="Fraud detection exploration signals"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {signals.map(([id, label]) => (
              <div key={id} className="min-w-0">
                <p className="font-heading text-xl">{label}</p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                  Connected to scoring, explanation, review, and retained evidence without implying
                  shipped commercial deployment.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
