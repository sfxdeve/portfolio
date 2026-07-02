type OrbitAxis = 'x' | 'y'

type OrbitPoint = {
  x: number
  y: number
}

type OrbitEllipse = {
  center: OrbitPoint
  radius: OrbitPoint
  rotationDegrees: number
}

export const ORBIT_VIEWBOX = {
  height: 1080,
  width: 1920,
} as const

export const SOLAR_CENTER = {
  x: 1213,
  y: 475,
} as const

export const ORBIT_ELLIPSES = {
  inner: {
    center: { x: 1198, y: 468 },
    radius: { x: 210, y: 62 },
    rotationDegrees: -14,
  },
  middle: {
    center: { x: 1210, y: 476 },
    radius: { x: 324, y: 92 },
    rotationDegrees: -8,
  },
  outer: {
    center: { x: 1218, y: 485 },
    radius: { x: 672, y: 184 },
    rotationDegrees: -10,
  },
  wide: {
    center: { x: 1238, y: 482 },
    radius: { x: 518, y: 142 },
    rotationDegrees: -18,
  },
} as const satisfies Record<string, OrbitEllipse>

type OrbitEllipseName = keyof typeof ORBIT_ELLIPSES

type HeroPlanet = {
  angleDegrees: number
  ellipse: OrbitEllipseName
  id: 'bronze' | 'coral' | 'pearl' | 'sage'
  opacity: number
  sizePercent: number
  src: string
}

export const HERO_PLANETS = [
  {
    angleDegrees: 150,
    ellipse: 'outer',
    id: 'coral',
    opacity: 0.92,
    sizePercent: 2.3,
    src: '/orbit/orbit-bead-coral.svg',
  },
  {
    angleDegrees: 260,
    ellipse: 'wide',
    id: 'sage',
    opacity: 0.84,
    sizePercent: 1.9,
    src: '/orbit/orbit-bead-sage.svg',
  },
  {
    angleDegrees: 55,
    ellipse: 'middle',
    id: 'bronze',
    opacity: 0.88,
    sizePercent: 2.1,
    src: '/orbit/orbit-bead-bronze.svg',
  },
  {
    angleDegrees: 145,
    ellipse: 'inner',
    id: 'pearl',
    opacity: 0.9,
    sizePercent: 1.7,
    src: '/orbit/orbit-bead-pearl.svg',
  },
] as const satisfies readonly HeroPlanet[]

export function pointOnRotatedEllipse(ellipse: OrbitEllipse, angleDegrees: number): OrbitPoint {
  const angle = degreesToRadians(angleDegrees)
  const rotation = degreesToRadians(ellipse.rotationDegrees)
  const localX = ellipse.radius.x * Math.cos(angle)
  const localY = ellipse.radius.y * Math.sin(angle)

  return {
    x: ellipse.center.x + localX * Math.cos(rotation) - localY * Math.sin(rotation),
    y: ellipse.center.y + localX * Math.sin(rotation) + localY * Math.cos(rotation),
  }
}

export function toOrbitPercent(value: number, axis: OrbitAxis): string {
  const dimension = axis === 'x' ? ORBIT_VIEWBOX.width : ORBIT_VIEWBOX.height

  return `${(value / dimension) * 100}%`
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}
