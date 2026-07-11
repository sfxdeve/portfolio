import { useRef, type CSSProperties } from 'react'

import { useHeroOrbitMotion } from '@/components/motion/use-hero-orbit-motion'

import {
  HERO_PLANETS,
  ORBIT_ELLIPSES,
  SOLAR_CENTER,
  pointOnRotatedEllipse,
  toOrbitPercent,
} from './orbit-geometry'

const solarCenterStyle = pointStyle(SOLAR_CENTER)

export function HeroSolarSystem() {
  const scope = useRef<HTMLDivElement>(null)

  useHeroOrbitMotion(scope)

  return (
    <div
      ref={scope}
      data-orbit-coordinate-space
      className="absolute top-[46%] left-[55%] aspect-video w-160 -translate-x-1/2 -translate-y-1/2 sm:w-3xl md:w-216 lg:w-240 xl:w-272"
    >
      <img
        src="/orbit/orbit-specular-wash.svg"
        alt=""
        className="absolute w-[40%] max-w-none opacity-42"
        style={centeredStyle(SOLAR_CENTER)}
        loading="eager"
      />
      <img
        src="/orbit/orbit-path-field.svg"
        alt=""
        className="absolute inset-0 size-full max-w-none opacity-58"
        loading="eager"
      />
      <img
        src="/orbit/orbit-soft-shadow.svg"
        alt=""
        className="absolute w-[48%] max-w-none opacity-44"
        style={centeredStyle({ x: SOLAR_CENTER.x, y: SOLAR_CENTER.y + 110 })}
        loading="eager"
      />
      <img
        src="/orbit/orbit-peach-core.svg"
        alt=""
        data-orbit-sun
        className="absolute w-[18.75%] max-w-none opacity-90"
        style={{
          ...solarCenterStyle,
          transform: 'translate(-50%, -46.8181818%)',
        }}
        loading="eager"
      />
      {HERO_PLANETS.map((planet) => {
        const point = pointOnRotatedEllipse(ORBIT_ELLIPSES[planet.ellipse], planet.angleDegrees)

        return (
          <img
            key={planet.id}
            src={planet.src}
            alt=""
            data-orbit-planet={planet.id}
            className="absolute max-w-none"
            style={{
              ...centeredStyle(point),
              opacity: planet.opacity,
              width: `${planet.sizePercent}%`,
            }}
            loading="eager"
          />
        )
      })}
    </div>
  )
}

function pointStyle(point: { x: number; y: number }): CSSProperties {
  return {
    left: toOrbitPercent(point.x, 'x'),
    top: toOrbitPercent(point.y, 'y'),
  }
}

function centeredStyle(point: { x: number; y: number }): CSSProperties {
  return {
    ...pointStyle(point),
    transform: 'translate(-50%, -50%)',
  }
}
