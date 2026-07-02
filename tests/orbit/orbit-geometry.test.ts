import { describe, expect, it } from 'vitest'

import {
  HERO_PLANETS,
  ORBIT_ELLIPSES,
  ORBIT_VIEWBOX,
  SOLAR_CENTER,
  pointOnRotatedEllipse,
  toOrbitPercent,
} from '../../src/components/orbit/orbit-geometry'

describe('hero orbit geometry', () => {
  it('uses the supplied path field coordinate system and chosen solar center', () => {
    expect(ORBIT_VIEWBOX).toEqual({ height: 1080, width: 1920 })
    expect(SOLAR_CENTER).toEqual({ x: 1213, y: 475 })
  })

  it('places each planet on its assigned rotated ellipse', () => {
    const expectedPoints = {
      bronze: { x: 1404.519, y: 524.765 },
      coral: { x: 660.848, y: 676.66 },
      pearl: { x: 1039.691, y: 544.121 },
      sage: { x: 1109.239, y: 376.798 },
    }

    expect(new Set(HERO_PLANETS.map(({ ellipse }) => ellipse)).size).toBe(4)

    for (const planet of HERO_PLANETS) {
      const point = pointOnRotatedEllipse(ORBIT_ELLIPSES[planet.ellipse], planet.angleDegrees)

      expect(point.x).toBeCloseTo(expectedPoints[planet.id].x, 3)
      expect(point.y).toBeCloseTo(expectedPoints[planet.id].y, 3)
    }
  })

  it('converts source coordinates into responsive percentages', () => {
    expect(toOrbitPercent(960, 'x')).toBe('50%')
    expect(toOrbitPercent(540, 'y')).toBe('50%')
    expect(Number.parseFloat(toOrbitPercent(SOLAR_CENTER.x, 'x'))).toBeCloseTo(63.177083, 6)
    expect(Number.parseFloat(toOrbitPercent(SOLAR_CENTER.y, 'y'))).toBeCloseTo(43.981481, 6)
  })
})
