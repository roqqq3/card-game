import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { hoverOnly } from '../styles/mixins'
import { isValidNewPlayerName, MAX_PLAYER_NAME_LENGTH } from '../utils/players'

/**
 * Fills whatever bounded container it is dropped into and scrolls the roster
 * internally, so the add field stays put no matter how many players there are.
 */
const Wrapper = styled.div`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const List = styled.ul`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0;
  /* Right padding leaves room for the scrollbar without crowding the buttons. */
  padding: 0.6rem 0.1rem 0 0;
  /* Boundary against the pinned form above: without it a row clipped by the
     scroll edge just looks like a rendering glitch. */
  border-top: 1px solid var(--border);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  list-style: none;
`

const Row = styled.li<{ $current: boolean }>`
  min-width: 0;
  /* Keep full height so the list scrolls instead of compressing rows. */
  flex: 0 0 auto;
  /* Every row reserves room for a two-line name, so a wrapped name never makes
     one row taller than its neighbours. */
  min-height: 3.6rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.4rem 0.45rem 0.6rem;
  border: 1px solid ${props => props.$current ? 'rgba(255, 47, 126, 0.4)' : 'var(--border)'};
  border-radius: var(--r-sm);
  background: ${props => props.$current ? 'rgba(255, 47, 126, 0.12)' : 'var(--surface)'};
  transition: background-color 150ms var(--ease-out);
`

const Turn = styled.span<{ $current: boolean }>`
  min-width: 1.15rem;
  flex: 0 0 auto;
  color: ${props => props.$current ? 'var(--pink-bright)' : 'var(--text-faint)'};
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
  font-weight: ${props => props.$current ? 800 : 600};
  text-align: right;
`

/**
 * Wraps at real word boundaries only — spaces and hyphens. A single long word
 * has no sensible break point, so it stays on one line and is clipped rather
 * than being severed mid-word. Two lines maximum, and the row reserves that
 * height regardless, keeping the list evenly ruled.
 */
const Name = styled.span`
  min-width: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: var(--text);
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.3;
  /* No text-overflow here: alongside -webkit-box-orient it ellipsises every
     line rather than just the clamp point. -webkit-line-clamp already adds the
     single trailing ellipsis; an unbreakable word is simply cut off. */
  overflow-wrap: normal;
  word-break: normal;
`

/** The pink row and turn number carry this visually; this is for screen readers. */
const CurrentLabel = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`

const RemoveButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: var(--r-xs);
  color: var(--text-faint);
  background: transparent;
  transition: color 150ms var(--ease-out), background-color 150ms var(--ease-out);

  ${hoverOnly`
    &:hover {
      color: var(--danger);
      background: rgba(255, 84, 112, 0.14);
    }
  `}
`

const Form = styled.form`
  display: flex;
  gap: 0.4rem;
`

const Input = styled.input`
  min-width: 0;
  flex: 1;
  min-height: 2.85rem;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text);
  background: rgba(0, 0, 0, 0.28);
  font-size: 0.98rem;
  transition: border-color 150ms var(--ease-out), background-color 150ms var(--ease-out);

  &::placeholder {
    color: var(--text-faint);
  }

  &:focus {
    border-color: var(--border-strong);
    background: rgba(0, 0, 0, 0.4);
  }
`

const AddButton = styled.button`
  min-width: 2.85rem;
  min-height: 2.85rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: var(--r-sm);
  color: #fff;
  background: var(--brand);
  box-shadow: 0 0.375rem 1.125rem rgba(255, 47, 126, 0.28);
  transition: filter 150ms var(--ease-out), opacity 150ms var(--ease-out);

  ${hoverOnly`
    &:hover:not(:disabled) {
      filter: brightness(1.08);
    }
  `}

  &:disabled {
    box-shadow: none;
    opacity: 0.4;
  }
`

interface PlayersPanelProps {
  players: string[]
  currentPlayer?: string
  onAddPlayer: (name: string) => void
  onRequestRemove: (name: string) => void
  /** Keeps the active player visible in the scrolling desktop rail. */
  scrollToCurrent?: boolean
}

/**
 * The full player-management surface: turn order, remove buttons and an add
 * field. Rendered inline in the desktop rail and inside a sheet on mobile.
 */
const PlayersPanel = ({
  players,
  currentPlayer,
  onAddPlayer,
  onRequestRemove,
  scrollToCurrent = false
}: PlayersPanelProps) => {
  const [newName, setNewName] = useState('')
  const currentRef = useRef<HTMLLIElement>(null)
  const lastRef = useRef<HTMLLIElement>(null)
  const hasScrolledRef = useRef(false)
  const previousCountRef = useRef(players.length)

  useEffect(() => {
    if (!scrollToCurrent) return
    // Resuming mid-game should open already scrolled to the active player;
    // only later turn changes are worth animating.
    currentRef.current?.scrollIntoView({
      behavior: hasScrolledRef.current ? 'smooth' : 'auto',
      block: 'nearest'
    })
    hasScrolledRef.current = true
  }, [currentPlayer, scrollToCurrent])

  useEffect(() => {
    // New players are appended, so with the form pinned above a scrolled list
    // they would otherwise land out of sight — reveal them as confirmation.
    if (players.length > previousCountRef.current) {
      lastRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
    previousCountRef.current = players.length
  }, [players.length])

  const trimmedName = newName.trim()
  const canAdd = isValidNewPlayerName(trimmedName, players)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!canAdd) return
    onAddPlayer(trimmedName)
    setNewName('')
  }

  return (
    <Wrapper>
      {/* Pinned above the roster: the primary action of this panel should never
          be something you have to scroll a long list to reach. */}
      <Form onSubmit={handleSubmit}>
        <Input
          value={newName}
          placeholder='Lisää pelaaja'
          aria-label='Uuden pelaajan nimi'
          maxLength={MAX_PLAYER_NAME_LENGTH}
          autoComplete='off'
          onChange={event => setNewName(event.target.value)}
        />
        <AddButton type='submit' disabled={!canAdd} aria-label='Lisää pelaaja'>
          <FontAwesomeIcon icon={faPlus} aria-hidden='true' />
        </AddButton>
      </Form>
      <List>
        {players.map((player, index) => {
          const isCurrent = player === currentPlayer
          const isLast = index === players.length - 1
          return (
            <Row
              key={player}
              ref={isCurrent ? currentRef : (isLast ? lastRef : undefined)}
              $current={isCurrent}
              aria-current={isCurrent ? 'true' : undefined}
            >
              <Turn $current={isCurrent} aria-hidden='true'>{index + 1}.</Turn>
              {isCurrent && <CurrentLabel>Vuorossa</CurrentLabel>}
              <Name>{player}</Name>
              <RemoveButton
                type='button'
                aria-label={`Poista pelaaja ${player}`}
                onClick={() => onRequestRemove(player)}
              >
                <FontAwesomeIcon icon={faTrash} aria-hidden='true' />
              </RemoveButton>
            </Row>
          )
        })}
      </List>
    </Wrapper>
  )
}

export default PlayersPanel
