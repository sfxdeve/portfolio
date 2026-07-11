export const responsiveEvidenceWidths = [480, 768] as const

export function createEvidenceSrcSet(src: string, sourceWidth: number): string {
  const variants = responsiveEvidenceWidths
    .filter((width) => width < sourceWidth)
    .map((width) => `${variantPath(src, width)} ${width}w`)

  return [...variants, `${src} ${sourceWidth}w`].join(', ')
}

export function variantPath(src: string, width: number): string {
  return src.replace(/\.webp$/, `-${width}w.webp`)
}
