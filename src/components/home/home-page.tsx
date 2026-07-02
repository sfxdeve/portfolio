import { publicExplorationDocuments, publicShippedWorkDocuments } from '@/content/documents'

import { ContactSection } from './contact-section'
import { ExplorationInterlude } from './exploration-interlude'
import { HeroOrbitSection } from './hero-orbit-section'
import { SelectedWorkSection } from './selected-work-section'

const exploration = publicExplorationDocuments.find(
  ({ metadata }) => metadata.slug === 'fraud-detection-system',
)

export function HomePage() {
  return (
    <main>
      <HeroOrbitSection />
      <SelectedWorkSection documents={publicShippedWorkDocuments} />
      {exploration ? <ExplorationInterlude document={exploration} /> : null}
      <ContactSection />
    </main>
  )
}
