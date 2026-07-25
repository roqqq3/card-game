import { faArrowLeft, faPlay, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { hoverOnly } from '../styles/mixins'
import { isValidNewPlayerName, MAX_PLAYER_NAME_LENGTH } from '../utils/players'

const MIN_PLAYERS = 2

const riseIn = keyframes`
  from { transform: translateY(0.6rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const Screen = styled.main`
  width: min(100%, 32rem);
  /* Fill the shell's content box exactly, up to a comfortable maximum. The
     padding variables come from .screen-center so the two stay in step, and
     --app-height shrinks with the keyboard so the start button below stays on
     screen instead of sitting behind it. */
  height: min(48rem, calc(var(--app-height) - var(--menu-pad-top, 1.25rem) - var(--menu-pad-bottom, 1.25rem)));
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Header = styled.header`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const BackButton = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text-muted);
  background: var(--surface);
  transition: color 150ms var(--ease-out), background-color 150ms var(--ease-out);

  ${hoverOnly`
    &:hover {
      color: var(--text);
      background: var(--surface-hover);
    }
  `}
`

const Heading = styled.div`
  min-width: 0;
  flex: 1;
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 6vw, 2rem);
  line-height: 1.1;
`

const Subtitle = styled.p`
  margin: 0.2rem 0 0;
  color: var(--text-muted);
  font-size: 0.88rem;
  line-height: 1.4;
`

const Form = styled.form`
  flex: 0 0 auto;
  display: flex;
  gap: 0.5rem;
`

const Input = styled.input`
  min-width: 0;
  min-height: 3.4rem;
  flex: 1;
  padding: 0.9rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  color: var(--text);
  background: rgba(0, 0, 0, 0.3);
  font-size: 1.02rem;
  transition: border-color 150ms var(--ease-out), background-color 150ms var(--ease-out);

  &::placeholder {
    color: var(--text-faint);
  }

  &:focus {
    border-color: rgba(255, 47, 126, 0.5);
    background: rgba(0, 0, 0, 0.42);
  }
`

const AddButton = styled.button`
  min-width: 3.4rem;
  min-height: 3.4rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: var(--r-md);
  color: #fff;
  background: var(--brand);
  box-shadow: 0 8px 22px rgba(255, 47, 126, 0.3);
  font-size: 1.05rem;
  transition: filter 150ms var(--ease-out), opacity 150ms var(--ease-out);

  ${hoverOnly`
    &:hover:not(:disabled) {
      filter: brightness(1.08);
    }
  `}

  &:disabled {
    box-shadow: none;
    opacity: 0.35;
  }
`

const Roster = styled.div`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const RosterHeader = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0 0.15rem;
  color: var(--text-faint);
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

const List = styled.ul`
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  align-content: start;
  gap: 0.5rem;
  flex: 1;
  margin: 0;
  padding: 0.15rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  list-style: none;
`

const Row = styled.li`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.4rem 0.4rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  background: var(--surface);
  animation: ${riseIn} 220ms var(--ease-out) both;
`

const Name = styled.span`
  min-width: 0;
  flex: 1;
  overflow: hidden;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 600;
  text-overflow: ellipsis;
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
  font-size: 0.85rem;
  transition: color 150ms var(--ease-out), background-color 150ms var(--ease-out);

  ${hoverOnly`
    &:hover {
      color: var(--danger);
      background: rgba(255, 84, 112, 0.14);
    }
  `}
`

const EmptyState = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  border: 1px dashed var(--border);
  border-radius: var(--r-lg);
  color: var(--text-faint);
  font-size: 0.9rem;
  line-height: 1.5;
  text-align: center;
  text-wrap: balance;
`

const StartButton = styled.button`
  flex: 0 0 auto;
  min-height: 3.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 1rem 1.25rem;
  border: 0;
  border-radius: var(--r-md);
  color: #fff;
  background: var(--brand);
  box-shadow: var(--glow-brand), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  transition: filter 160ms var(--ease-out), box-shadow 160ms var(--ease-out), opacity 160ms var(--ease-out);

  ${hoverOnly`
    &:hover:not(:disabled) {
      box-shadow: var(--glow-brand-lg), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      filter: saturate(1.12) brightness(1.06);
    }
  `}

  &:disabled {
    box-shadow: none;
    color: var(--text-faint);
    background: var(--surface);
    opacity: 1;
  }
`

interface AddPlayersScreenProps {
  players: string[]
  startGame: () => void
  handleNewPlayer: (name: string) => void
  handleRemovePlayer: (name: string) => void
  handleGoToWelcome: () => void
}

const AddPlayersScreen = ({
  players,
  startGame,
  handleNewPlayer,
  handleRemovePlayer,
  handleGoToWelcome
}: AddPlayersScreenProps) => {
  const [newName, setNewName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep the caret in the name field so a whole group can be typed in one go.
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const trimmedName = newName.trim()
  const canAdd = isValidNewPlayerName(trimmedName, players)
  const playersNeeded = Math.max(0, MIN_PLAYERS - players.length)
  const canStart = playersNeeded === 0

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!canAdd) return
    handleNewPlayer(trimmedName)
    setNewName('')
    inputRef.current?.focus()
  }

  return (
    <Screen>
      <Header>
        <BackButton type='button' aria-label='Takaisin' onClick={handleGoToWelcome}>
          <FontAwesomeIcon icon={faArrowLeft} aria-hidden='true' />
        </BackButton>
        <Heading>
          <Title>Ketkä pelaavat?</Title>
          <Subtitle aria-live='polite'>
            {playersNeeded > 0
              ? `Vielä ${playersNeeded === 1 ? 'yksi pelaaja' : `${playersNeeded} pelaajaa`}, sitten mennään`
              : `${players.length} pelaajaa valmiina. Anna palaa.`}
          </Subtitle>
        </Heading>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          value={newName}
          placeholder='Pelaajan nimi'
          aria-label='Pelaajan nimi'
          maxLength={MAX_PLAYER_NAME_LENGTH}
          autoComplete='off'
          onChange={event => setNewName(event.target.value)}
        />
        <AddButton type='submit' disabled={!canAdd} aria-label='Lisää pelaaja'>
          <FontAwesomeIcon icon={faPlus} aria-hidden='true' />
        </AddButton>
      </Form>

      <Roster>
        {players.length === 0
          ? <EmptyState>Kuka uskaltaa ensimmäisenä?</EmptyState>
          : <>
              <RosterHeader>
                <span>Pelaajat</span>
                <span>{players.length}</span>
              </RosterHeader>
              <List aria-label='Lisätyt pelaajat'>
                {players.map(player => (
                  <Row key={player}>
                    <Name>{player}</Name>
                    <RemoveButton
                      type='button'
                      aria-label={`Poista pelaaja ${player}`}
                      onClick={() => handleRemovePlayer(player)}
                    >
                      <FontAwesomeIcon icon={faTrash} aria-hidden='true' />
                    </RemoveButton>
                  </Row>
                ))}
              </List>
            </>}
      </Roster>

      <StartButton type='button' disabled={!canStart} onClick={startGame}>
        <FontAwesomeIcon icon={faPlay} aria-hidden='true' />
        {canStart ? 'Aloita peli' : `Lisää vielä ${playersNeeded}`}
      </StartButton>
    </Screen>
  )
}

export default AddPlayersScreen
