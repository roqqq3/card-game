import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import AddPlayerModal from './AddPlayerModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import RemovePlayerModal from './RemovePlayerModal';

const Panel = styled.section`
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;
  background: rgba(255, 253, 251, 0.88);
  box-shadow: var(--shadow-soft);

  @media (max-width: 820px) {
    display: flex;
    align-items: stretch;
    border-radius: 1rem;
  }
`;

const PanelTitle = styled.h2`
  margin: 0;
  padding: 1rem;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  @media (max-width: 820px) {
    display: none;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 820px) {
    display: flex;
    flex: 1;
  }
`;

const ScrollArea = styled.div`
  min-width: 0;

  @media (max-width: 820px) {
    flex: 1;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

interface ListItemProps {
  current: boolean
}

const ListItem = styled.li<ListItemProps>`
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.8rem 0.75rem;
  border-top: 1px solid var(--color-border);
  background: ${props => props.current ? 'var(--color-accent-soft)' : 'transparent'};

  @media (max-width: 820px) {
    min-width: max-content;
    border-top: 0;
    border-right: 1px solid var(--color-border);
  }
`;

const PlayerInfo = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CurrentLabel = styled.span`
  color: var(--color-primary);
  font-size: 0.62rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const StyledName = styled.span`
  max-width: 8rem;
  overflow: hidden;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 750;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const IconButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  flex: 0 0 2.25rem;
  border: 0;
  border-radius: 0.65rem;
  color: var(--color-danger);
  background: transparent;

  &:hover {
    background: rgba(165, 35, 43, 0.1);
  }
`;

const AddButton = styled.button`
  width: calc(100% - 1.5rem);
  min-height: 2.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin: 0.75rem;
  padding: 0.65rem;
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  color: var(--color-primary);
  background: var(--color-surface);
  font-weight: 800;

  &:hover {
    background: var(--color-surface-muted);
  }

  @media (max-width: 820px) {
    width: 3.25rem;
    min-width: 3.25rem;
    flex: 0 0 3.25rem;
    margin: 0;
    border-width: 0 0 0 1px;
    border-radius: 0;
    font-size: 1.1rem;
  }
`;

const AddButtonLabel = styled.span`
  @media (max-width: 820px) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  }
`;

interface PlayerListProps {
  players: string[];
  currentPlayer: string;
  handleNewPlayer: (name: string) => void;
  handlePlayerRemove: (name: string) => void;
}

const PlayerList = (props: PlayerListProps) => {
  const [addPlayerModal, setAddPlayerModal] = useState(false);
  const [removePlayerModal, setRemovePlayerModal] = useState('');
  const currentPlayerRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    currentPlayerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }, [props.currentPlayer])

  return <>
    {addPlayerModal && <AddPlayerModal players={props.players} handleNewPlayer={props.handleNewPlayer} closeModal={() => setAddPlayerModal(false)} />}
    {removePlayerModal && <RemovePlayerModal handlePlayerRemove={props.handlePlayerRemove} closeModal={() => setRemovePlayerModal('')} player={removePlayerModal} />}
    <Panel>
      <PanelTitle>Pelaajat</PanelTitle>
      <ScrollArea>
        <List>
          {props.players.map(player => {
            const isCurrent = player === props.currentPlayer
            return <ListItem
              ref={isCurrent ? currentPlayerRef : undefined}
              key={player}
              current={isCurrent}>
              <PlayerInfo>
                {isCurrent && <CurrentLabel>Vuorossa</CurrentLabel>}
                <StyledName>{player}</StyledName>
              </PlayerInfo>
              <IconButton
                type='button'
                aria-label={`Poista pelaaja ${player}`}
                onClick={() => setRemovePlayerModal(player)}>
                <FontAwesomeIcon icon={faTrash} fixedWidth />
              </IconButton>
            </ListItem>
          })}
        </List>
      </ScrollArea>
      <AddButton type='button' aria-label='Lisää pelaaja' onClick={() => setAddPlayerModal(true)}>
        <FontAwesomeIcon icon={faPlus} fixedWidth /> <AddButtonLabel>Lisää pelaaja</AddButtonLabel>
      </AddButton>
    </Panel>
  </>
}

export default PlayerList
