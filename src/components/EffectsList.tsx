import { faChevronDown, faInfinity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styled from 'styled-components'
import { findCardRule } from '../cards/Card'
import { hoverOnly } from '../styles/mixins'
import { ContinuousCard } from '../types/ContinuousCard'

const List = styled.ul`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0;
  padding: 0.6rem 0.1rem 0 0;
  /* Same scroll boundary as the players list: a row clipped by the scroll edge
     needs a line above it to read as content rather than a glitch. */
  border-top: 1px solid var(--border);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  list-style: none;
`

const Item = styled.li`
  min-width: 0;
  /* Keep full height so the list scrolls instead of compressing rows. */
  flex: 0 0 auto;
  overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.26);
  border-radius: var(--r-sm);
  background: rgba(139, 92, 246, 0.1);
`

/** The row itself. A button when a rule can be shown, a plain div otherwise. */
const Row = styled.div<{ $interactive: boolean }>`
  width: 100%;
  min-height: 2.9rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.7rem;
  border: 0;
  color: inherit;
  background: transparent;
  text-align: left;
  transition: background-color 150ms var(--ease-out);

  ${props => props.$interactive && hoverOnly`
    &:hover {
      background: rgba(139, 92, 246, 0.14);
    }
  `}
`

const Mark = styled.span`
  width: 1.6rem;
  height: 1.6rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: var(--r-xs);
  color: var(--violet-bright);
  background: rgba(139, 92, 246, 0.2);
  font-size: 0.72rem;
`

const Body = styled.div`
  min-width: 0;
  flex: 1;
`

const Name = styled.strong`
  display: block;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.3;
  overflow-wrap: anywhere;
`

/** Wraps like the roster names rather than truncating the same data twice. */
const Owner = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 0.1rem;
  overflow: hidden;
  color: var(--violet-bright);
  font-size: 0.8rem;
  line-height: 1.35;
  overflow-wrap: normal;
`

const Chevron = styled(FontAwesomeIcon)<{ $open: boolean }>`
  flex: 0 0 auto;
  color: var(--text-faint);
  font-size: 0.72rem;
  transition: transform 180ms var(--ease-out), color 180ms var(--ease-out);
  transform: rotate(${props => props.$open ? '180deg' : '0deg'});
`

const Rule = styled.p`
  margin: 0;
  padding: 0 0.7rem 0.7rem calc(1.6rem + 1.3rem);
  color: var(--text-muted);
  font-size: 0.84rem;
  line-height: 1.5;
  text-wrap: pretty;
`

const Empty = styled.p`
  margin: 0;
  color: var(--text-faint);
  font-size: 0.88rem;
  line-height: 1.5;
`

interface EffectsListProps {
  continuousCards: ContinuousCard[]
}

/**
 * Continuous cards stay in play for the rest of the game, so their rules are
 * exactly what a table forgets. Each row expands to show the card's original
 * text; rows stay collapsed by default so the list is still a quick answer to
 * "who has what".
 */
const EffectsList = ({ continuousCards }: EffectsListProps) => {
  const [expanded, setExpanded] = useState<number[]>([])

  const toggle = (id: number) => setExpanded(current =>
    current.includes(id) ? current.filter(openId => openId !== id) : [...current, id])

  if (continuousCards.length === 0) {
    return <Empty>Ei jatkuvia kortteja käynnissä.</Empty>
  }

  return (
    <List>
      {continuousCards.map(card => {
        const rule = findCardRule(card.id, card.name)
        const isOpen = expanded.includes(card.id)
        const ruleId = `effect-rule-${card.id}`

        return (
          <Item key={card.id}>
            <Row
              // A row with no recoverable rule has nothing to reveal, so it is
              // left as plain content rather than a control that does nothing.
              as={rule ? 'button' : 'div'}
              $interactive={Boolean(rule)}
              {...(rule ? {
                type: 'button',
                onClick: () => toggle(card.id),
                'aria-expanded': isOpen,
                'aria-controls': ruleId
              } : {})}
            >
              <Mark aria-hidden='true'>
                <FontAwesomeIcon icon={faInfinity} />
              </Mark>
              <Body>
                <Name>{card.name}</Name>
                <Owner>{card.player}</Owner>
              </Body>
              {rule && <Chevron icon={faChevronDown} $open={isOpen} aria-hidden='true' />}
            </Row>
            {rule && isOpen && <Rule id={ruleId}>{rule}</Rule>}
          </Item>
        )
      })}
    </List>
  )
}

export default EffectsList
