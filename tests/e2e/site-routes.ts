export const publicShippedWorkPaths = [
  '/work/ecobuiltconnect',
  '/work/artisanconnect',
  '/work/rushuploads',
] as const

export const publicExplorationPath = '/work/fraud-detection-system' as const

export const hiddenWorkPaths = ['/work/foundation-smoke-test', '/work/unknown-work-story'] as const

export const viewportPresets = {
  desktop: { height: 720, width: 1280 },
  mobile: { height: 844, width: 390 },
  narrow: { height: 700, width: 320 },
} as const
