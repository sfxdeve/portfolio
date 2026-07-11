import { readdir } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'

import sharp from 'sharp'

import { responsiveEvidenceWidths, variantPath } from '../src/config/evidence-images.ts'

const evidenceRoot = join(import.meta.dirname, '..', 'public', 'evidence')
const projectDirectories = await readdir(evidenceRoot, { withFileTypes: true })

for (const projectDirectory of projectDirectories) {
  if (!projectDirectory.isDirectory()) {
    continue
  }

  const projectPath = join(evidenceRoot, projectDirectory.name)
  const files = await readdir(projectPath)
  const sourceFiles = files.filter((file) => file.endsWith('.webp') && !/-\d+w\.webp$/.test(file))

  for (const sourceFile of sourceFiles) {
    const sourcePath = join(projectPath, sourceFile)
    const metadata = await sharp(sourcePath).metadata()

    for (const width of responsiveEvidenceWidths) {
      if (!metadata.width || width >= metadata.width) {
        continue
      }

      const outputSrc = variantPath(`/${sourceFile}`, width)
      const outputPath = join(dirname(sourcePath), basename(outputSrc))

      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ effort: 5, quality: 82 })
        .toFile(outputPath)
    }
  }
}
