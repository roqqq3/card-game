import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { railsUp } from '../styles/breakpoints'

const FADE = '1.25rem'

/**
 * Fades only the edges that actually have roster hidden beyond them. Fading
 * unconditionally dims the first and last chip even when the rail is fully
 * scrolled, or not scrollable at all, which reads as a rendering fault rather
 * than a scroll cue.
 */
const edgeMask = (fadeStart: boolean, fadeEnd: boolean) => {
  if (!fadeStart && !fadeEnd) return 'none'
  const start = fadeStart ? 'transparent' : '#000'
  const end = fadeEnd ? 'transparent' : '#000'
  return `linear-gradient(90deg, ${start}, #000 ${FADE}, #000 calc(100% - ${FADE}), ${end})`
}

interface RailProps {
  $fadeStart: boolean
  $fadeEnd: boolean
}

const Rail = styled.ol<RailProps>`
  flex: 0 0 auto;
  display: flex;
  gap: 0.4rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  margin: 0;
  padding: 0.15rem 0;
  list-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  -webkit-mask-image: ${props => edgeMask(props.$fadeStart, props.$fadeEnd)};
  mask-image: ${props => edgeMask(props.$fadeStart, props.$fadeEnd)};

  /* Wide screens show the full roster in the players rail instead. */
  ${railsUp} {
    display: none;
  }
`

const Chip = styled.li<{ $current: boolean }>`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.05rem;
  padding: ${props => props.$current ? '0.4rem 0.85rem' : '0.55rem 0.85rem'};
  border: 1px solid ${props => props.$current ? 'transparent' : 'var(--border)'};
  border-radius: var(--r-pill);
  background: ${props => props.$current ? 'var(--brand)' : 'var(--surface)'};
  /* Deliberately no outer glow. The rail scrolls horizontally, which makes
     overflow-y compute to auto, and there are only a couple of pixels of
     padding around a chip — so a wide soft shadow gets sliced off square and
     reads as a box drawn around the chip. An inset highlight cannot overflow. */
  box-shadow: ${props => props.$current ? 'inset 0 1px 0 rgba(255, 255, 255, 0.3)' : 'none'};
  transition: background-color 200ms var(--ease-out);
`

const Label = styled.span`
  color: rgba(255, 255, 255, 0.92);
  font-family: var(--font-display);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  line-height: 1.2;
  text-transform: uppercase;
`

const Name = styled.span<{ $current: boolean }>`
  max-width: 9rem;
  overflow: hidden;
  color: ${props => props.$current ? '#fff' : 'var(--text-muted)'};
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: ${props => props.$current ? 700 : 500};
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface TurnRailProps {
  players: string[]
  currentPlayer: string
}

/**
 * Compact horizontal turn order for narrow screens. Read-only by design — it
 * has one job during play, which is to answer "whose turn is it?" instantly.
 * Editing lives in the players sheet.
 */
const TurnRail = ({ players, currentPlayer }: TurnRailProps) => {
  const railRef = useRef<HTMLOListElement>(null)
  const currentRef = useRef<HTMLLIElement>(null)
  const hasScrolledRef = useRef(false)
  const [fade, setFade] = useState({ start: false, end: false })

  const updateFade = useCallback(() => {
    const rail = railRef.current
    if (!rail) return

    const maxScroll = rail.scrollWidth - rail.clientWidth
    const scrollable = maxScroll > 1
    setFade({
      start: scrollable && rail.scrollLeft > 1,
      end: scrollable && rail.scrollLeft < maxScroll - 1
    })
  }, [])

  useEffect(() => {
    // Resuming mid-game should open already centred on the active player;
    // only later turn changes are worth animating.
    currentRef.current?.scrollIntoView({
      behavior: hasScrolledRef.current ? 'smooth' : 'auto',
      block: 'nearest',
      inline: 'center'
    })
    hasScrolledRef.current = true
  }, [currentPlayer])

  // Whether the rail overflows depends on the roster and the viewport, and no
  // scroll event fires when it stops overflowing — so recheck on both.
  useEffect(() => {
    updateFade()
    window.addEventListener('resize', updateFade)
    return () => window.removeEventListener('resize', updateFade)
  }, [players, updateFade])

  return (
    <Rail
      ref={railRef}
      aria-label='Vuorojärjestys'
      $fadeStart={fade.start}
      $fadeEnd={fade.end}
      onScroll={updateFade}
    >
      {players.map(player => {
        const isCurrent = player === currentPlayer
        return (
          <Chip
            key={player}
            ref={isCurrent ? currentRef : undefined}
            $current={isCurrent}
            aria-current={isCurrent ? 'true' : undefined}
          >
            {isCurrent && <Label>Vuorossa</Label>}
            <Name $current={isCurrent}>{player}</Name>
          </Chip>
        )
      })}
    </Rail>
  )
}

export default TurnRail
