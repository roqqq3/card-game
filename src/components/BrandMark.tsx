import { useRef } from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  display: block;
  flex: 0 0 auto;
  filter: drop-shadow(0 0.35rem 1.1rem rgba(255, 47, 126, 0.45));
`

let instanceCount = 0

interface BrandMarkProps {
  /** Any CSS length; the mark is square. */
  size?: string
  /**
   * Accessible name. Omit wherever adjacent text already names the app — the
   * mark is then hidden from assistive tech instead of repeating it.
   */
  label?: string
  className?: string
}

/**
 * Cocktail glass with a game die — inline so it can carry the neon gradient
 * and glow of the dark theme instead of being a flat raster asset.
 */
const BrandMark = ({ size = '2rem', label, className }: BrandMarkProps) => {
  // Gradient ids must be document-unique when several marks render at once,
  // and stable across renders so the SVG defs aren't rewritten every draw.
  const uidRef = useRef<string>()
  if (uidRef.current === undefined) uidRef.current = `brand-${instanceCount++}`
  const uid = uidRef.current

  return (
    <Svg
      className={className}
      style={{ width: size, height: size }}
      viewBox='0 0 64 64'
      xmlns='http://www.w3.org/2000/svg'
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`${uid}-liquid`} x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stopColor='#ff2f7e' />
          <stop offset='1' stopColor='#8b5cf6' />
        </linearGradient>
        <linearGradient id={`${uid}-die`} x1='0' y1='0' x2='0.6' y2='1'>
          <stop offset='0' stopColor='#ffffff' />
          <stop offset='1' stopColor='#e6dcff' />
        </linearGradient>
      </defs>

      {/* Liquid, then glass outline on top of it */}
      <path d='M15 20h34L32 39z' fill={`url(#${uid}-liquid)`} />
      <g
        fill='none'
        stroke='#f7f3ff'
        strokeWidth='3.2'
        strokeLinecap='round'
        strokeLinejoin='round'
        opacity='0.92'
      >
        <path d='M11 15h42L32 39z' />
        <path d='M32 39v13' />
        <path d='M22 54h20' />
      </g>

      {/* Die perched on the rim */}
      <g transform='rotate(14 42 15)'>
        <rect x='31' y='4' width='22' height='22' rx='5.5' fill={`url(#${uid}-die)`} />
        <g fill='#ff2f7e'>
          <circle cx='37.5' cy='10.5' r='2.1' />
          <circle cx='46.5' cy='10.5' r='2.1' />
          <circle cx='42' cy='15' r='2.1' />
          <circle cx='37.5' cy='19.5' r='2.1' />
          <circle cx='46.5' cy='19.5' r='2.1' />
        </g>
      </g>
    </Svg>
  )
}

export default BrandMark
