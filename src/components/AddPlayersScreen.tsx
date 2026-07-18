import { faArrowLeft, faPlay, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';

const AddPlayersContainer = styled.main`
  width: min(100%, 620px);
  height: min(46rem, calc(100dvh - 2rem));
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PlayerFormPanel = styled.section`
  flex: 0 0 auto;
  padding: clamp(1.25rem, 5vw, 3rem);
  border: 1px solid var(--color-border);
  border-radius: clamp(1.5rem, 4vw, 2.5rem);
  background: var(--surface-glass);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
  text-align: center;
`

const TopButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`

const PlayerForm = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0.65rem;
  margin-top: 1.5rem;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`

const StyledTitle = styled.h1`
  margin: clamp(1.5rem, 5vw, 2.5rem) 0 0;
  color: var(--color-primary);
  font-size: clamp(2.25rem, 8vw, 4rem);
  line-height: 1;
`

const StyledDescription = styled.p`
  margin: 0.75rem 0 0;
  color: var(--color-text-muted);
  font-size: 1rem;
`;

const StyledInput = styled.input`
  min-width: 0;
  flex: 1;
  padding: 0.95rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.9rem;
  color: var(--color-text);
  background: var(--surface-control);
  font-size: 1.05rem;

  &::placeholder {
    color: #8a7070;
  }
`

const BaseButton = styled.button`
  min-height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.9rem;
  font-weight: 800;
  transition: transform 160ms ease, background-color 160ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
`

const NavigationButton = styled(BaseButton)`
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  background: var(--surface-control);

  &:hover {
    background: var(--color-surface-muted);
  }
`

const PrimaryButton = styled(BaseButton)`
  border: 1px solid var(--color-primary);
  color: white;
  background: var(--color-primary);

  &:hover {
    background: var(--color-primary-hover);
  }
`

const PlayersPanel = styled.section`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  background: var(--surface-glass);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px);
`

const PlayersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
  padding: 0 0.25rem;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 800;
`

const PlayerCount = styled.span`
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  color: var(--color-primary);
  background: var(--surface-control);
  font-size: 0.85rem;
`

const List = styled.ul`
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-content: start;
  gap: 0.6rem;
  flex: 1;
  margin: 0;
  padding: 0.1rem 0.25rem 0.25rem;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.25rem 0.35rem 0.25rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.9rem;
  background: var(--surface-control);
`;

const StyledName = styled.span`
  overflow: hidden;
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  flex: 0 0 2.25rem;
  border: 0;
  border-radius: 0.75rem;
  color: var(--color-danger);
  background: #fff0f4;

  &:hover {
    background: #ffdde7;
  }
`;

interface Props {
  players: string[];
  startGame: () => void;
  handleNewPlayer: (name: string) => void;
  handleRemovePlayer: (name: string) => void;
  handleGoToWelcome: () => void;
}

const AddPlayersScreen = (props: Props) => {
  const [newPlayerName, setNewPlayerName] = useState('')

  const handleNewPlayerName = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmedName = newPlayerName.trim()
    if (!props.players.includes(trimmedName) && trimmedName !== '' && trimmedName.length < 30) {
      props.handleNewPlayer(trimmedName)
      setNewPlayerName('')
    }
  }

  const playersNeeded = Math.max(0, 2 - props.players.length)

  return (
    <AddPlayersContainer>
      <PlayerFormPanel>
        <TopButtonContainer>
          <NavigationButton type='button' onClick={props.handleGoToWelcome}>
            <FontAwesomeIcon icon={faArrowLeft} /> Takaisin
          </NavigationButton>
          {props.players.length >= 2 &&
            <PrimaryButton type='button' onClick={props.startGame}>
              Aloita peli <FontAwesomeIcon icon={faPlay} />
            </PrimaryButton>}
        </TopButtonContainer>
        <StyledTitle>Lisää pelaajat</StyledTitle>
        <StyledDescription aria-live='polite'>
          {playersNeeded > 0
            ? `Lisää vielä ${playersNeeded === 1 ? 'yksi pelaaja' : 'kaksi pelaajaa'}`
            : `${props.players.length} pelaajaa valmiina`}
        </StyledDescription>
        <PlayerForm onSubmit={handleNewPlayerName}>
          <StyledInput
            value={newPlayerName}
            placeholder='Pelaajan nimi'
            aria-label='Pelaajan nimi'
            maxLength={29}
            onChange={event => setNewPlayerName(event.target.value)}
          />
          <PrimaryButton type='submit'>
            <FontAwesomeIcon icon={faUserPlus} /> Lisää
          </PrimaryButton>
        </PlayerForm>
      </PlayerFormPanel>
      {props.players.length > 0 && <PlayersPanel>
        <PlayersHeader>
          <span>Pelaajat</span>
          <PlayerCount>{props.players.length}</PlayerCount>
        </PlayersHeader>
        <List aria-label='Lisätyt pelaajat'>
          {props.players.map(player =>
            <ListItem key={player}>
              <StyledName>{player}</StyledName>
              <RemoveButton
                type='button'
                aria-label={`Poista pelaaja ${player}`}
                onClick={() => props.handleRemovePlayer(player)}>
                <FontAwesomeIcon icon={faTrash} />
              </RemoveButton>
            </ListItem>)}
        </List>
      </PlayersPanel>}
    </AddPlayersContainer>
  )
}

export default AddPlayersScreen
