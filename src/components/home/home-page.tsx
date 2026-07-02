import { publicDocuments } from '@/content/documents'

import { ContactSection } from './contact-section'
import { ExplorationInterlude } from './exploration-interlude'
import { HeroOrbitSection } from './hero-orbit-section'
import { SelectedWorkSection } from './selected-work-section'

const shippedWork = publicDocuments.filter(({ metadata }) => metadata.kind === 'shipped-work')
const exploration = publicDocuments.find(
  ({ metadata }) => metadata.slug === 'fraud-detection-system',
)

export function HomePage() {
  return (
    <main>
      <HeroOrbitSection />
      <SelectedWorkSection documents={shippedWork} />
      {exploration ? <ExplorationInterlude document={exploration} /> : null}
      <ContactSection />
    </main>
  )
}
