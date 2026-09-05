import { faInfinity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Card } from '../cards/Card'
import { getRarityTier } from '../cards/rarity'
import { railsDown } from '../styles/breakpoints'

const dealIn = keyframes`
  from {
    transform: perspective(75rem) rotateX(9deg) translateY(1.5rem) scale(0.95);
    opacity: 0;
  }
  to {
    transform: perspective(75rem) rotateX(0) translateY(0) scale(1);
    opacity: 1;
  }
`

const riseIn = keyframes`
  from { transform: translateY(0.75rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const shimmer = keyframes`
  0% { transform: translateX(-120%) skewX(-18deg); }
  55%, 100% { transform: translateX(220%) skewX(-18deg); }
`

const Frame = styled.article<{ $showcase: boolean; $clickable: boolean }>`
  width: min(100%, 36rem);
  /* A generous fixed floor rather than content-hugging: the deck mixes one-line
     cards with five-line ones, and a card that resized on every draw would
     drag the draw button up and down the screen with it. */
  min-height: clamp(19rem, 56vh, 32rem);
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: clamp(1.5rem, 4.5vw, 3rem);
  border: 1px solid var(--tier-dim);
  border-radius: clamp(1.5rem, 4vw, 2.25rem);
  /* The face stays a clean neutral gradient. Tinting it with the tier colour —
     at any strength — just lays a murky wash over the surface, because a
     translucent colour over a dark base muddies rather than glows. The tier
     lives on the edges instead: border, top hairline and outer glow. */
  background: linear-gradient(168deg, var(--elev-3) 0%, var(--elev-1) 58%, var(--bg) 100%);
  /* The outer tier glow is what makes rarity readable at a glance now that the
     label is gone. It is safe to bleed outwards: the nearest clipping ancestor
     is .board, whose box is the viewport, so the falloff is only ever cut at
     the screen edge. */
  box-shadow:
    var(--shadow-2),
    0 0.5rem 4rem -1rem var(--tier-glow),
    inset 0 1px 0 rgba(255, 255, 255, 0.07),
    0 0 0 0.5rem rgba(255, 255, 255, 0.012);
  user-select: none;
  animation: ${dealIn} 380ms var(--ease-out) both;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};

  /* Hairline of tier colour along the top edge, with its own bloom. */
  &::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    right: 10%;
    left: 10%;
    height: 3px;
    border-radius: var(--r-pill);
    background: linear-gradient(90deg, transparent, var(--tier), transparent);
    box-shadow: 0 0 1.25rem var(--tier-glow);
  }

  ${props => props.$showcase && css`
    /* Legendary draws get a single light sweep across the surface.

       The 'both' fill mode is essential, not cosmetic: without it the band has
       no transform outside the animation's active window, so it parks at its
       base position and shows as a static white stripe over the left of the
       card — both during the start delay and permanently after the sweep ends.
       With 'both' it holds off-canvas left beforehand and off-canvas right
       afterwards, so it is only ever visible while actually sweeping. */
    &::after {
      content: "";
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      left: 0;
      width: 45%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.11), transparent);
      animation: ${shimmer} 2.6s var(--ease-out) 380ms both;
      pointer-events: none;
    }
  `}

  /* Fill the stage vertically, but keep the width cap: without it the card
     stretches into a letterbox on tablet-width screens. */
  ${railsDown} {
    height: 100%;
    min-height: 0;
    padding: clamp(1.25rem, 5.5vw, 2rem);
  }
`

const Content = styled.div`
  min-height: 0;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.85rem, 2.2vh, 1.4rem);
  text-align: center;

  ${railsDown} {
    justify-content: center;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

/* The title names the card; the description is the rule. The title is still
   large, but it is no longer the only thing the eye lands on. There is
   deliberately no text glow here — the frame already carries the tier glow,
   and two glows on a legendary draw read as noise rather than emphasis. */
const Title = styled.h1`
  margin: 0;
  color: var(--text);
  font-size: clamp(1.9rem, 6.5vw, 3rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-wrap: balance;
  animation: ${riseIn} 380ms var(--ease-out) 60ms both;

  ${railsDown} {
    font-size: clamp(2.2rem, 9vw, 3rem);
  }
`

/* Full text colour, not muted: this is the instruction the table has to read
   from across the room. The longest cards in the deck run to about 170
   characters, which is five lines at this size within the width cap. */
const Description = styled.p`
  max-width: 30rem;
  margin: 0;
  color: var(--text);
  font-size: clamp(1.25rem, 2.6vw, 1.7rem);
  font-weight: 500;
  line-height: 1.45;
  text-wrap: pretty;
  animation: ${riseIn} 420ms var(--ease-out) 160ms both;

  ${railsDown} {
    font-size: clamp(1.25rem, 5vw, 1.65rem);
  }
`

const Footer = styled.footer`
  flex: 0 0 auto;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: clamp(0.85rem, 2.5vh, 1.5rem);
  animation: ${riseIn} 440ms var(--ease-out) 220ms both;
`

/* A continuous card changes the rules for the rest of the game, so the badge
   sits at the description's visual weight rather than as a footnote. */
const ContinuousBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.1rem;
  border: 1px solid rgba(139, 92, 246, 0.45);
  border-radius: var(--r-pill);
  color: var(--violet-bright);
  background: rgba(139, 92, 246, 0.16);
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  overflow-wrap: anywhere;

  ${railsDown} {
    font-size: 1.05rem;
  }
`

const Placeholder = styled.div`
  color: var(--text-faint);
  font-family: var(--font-display);
  font-size: 1.1rem;
  text-align: center;
`

interface GameCardProps {
  card?: Card
  /** Player the card was dealt to, when the game is tracking turns. */
  owner?: string
  /** Tapping the card is a redundant shortcut for the draw button. */
  onDraw?: () => void
}

const GameCard = ({ card, owner, onDraw }: GameCardProps) => {
  if (!card) {
    return (
      <Frame $showcase={false} $clickable={false}>
        <Content>
          <Placeholder>Ei korttia</Placeholder>
        </Content>
      </Frame>
    )
  }

  const tier = getRarityTier(card)
  /**
   * Rarity is communicated only through these colours. It is decorative — a
   * frequency hint, not an instruction — so there is deliberately no text or
   * ARIA equivalent; naming a tier would assert an intensity the data does not
   * carry, to sighted and assistive users alike.
   */
  const tierStyle = {
    '--tier': tier.color,
    '--tier-glow': tier.glow,
    '--tier-dim': tier.dim
  } as CSSProperties

  return (
    <Frame
      key={card.id}
      style={tierStyle}
      $showcase={tier.showcase}
      $clickable={Boolean(onDraw)}
      onClick={onDraw}
    >
      <Content>
        <Title>{card.name}</Title>
        <Description>{card.description}</Description>
      </Content>
      {card.continuous && <Footer>
        <ContinuousBadge>
          <FontAwesomeIcon icon={faInfinity} aria-hidden='true' />
          {owner ? `Jatkuva — ${owner}` : 'Jatkuva vaikutus'}
        </ContinuousBadge>
      </Footer>}
    </Frame>
  )
}

export default GameCard
