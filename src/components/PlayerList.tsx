import { useState } from 'react';
import styled from 'styled-components'
import AddPlayerModal from './AddPlayerModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import RemovePlayerModal from './RemovePlayerModal';

const List = styled.ul`
  overflow: hidden;
  list-style: none;
  padding: 0px 0px;
  background-color: #E9C8B7;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
  text-align: center;
`;

interface ListItemProps {
  current: boolean
}

const ListItem = styled.li<ListItemProps>`
  background-color: ${props => props.current ? '#C7A290' : '#E9C8B7'};
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  :first-child {
    border-top: none;
  }
`;

const StyledName = styled.span`
  font-size: 25px;
  color: #FA6E4F;
  margin-bottom: 5px;
`;

const StyledButton = styled.button`
  color: white;
  font-size: 1.5rem;
  font-variant: helvetica;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid palevioletred;
  border-radius: 1rem;
  align-items: center;
  background-color: #FB8E7E;
  outline: 0;
  :hover {
    color: #FB8E7E;
    background-color: white;
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

  return <>
    {addPlayerModal && <AddPlayerModal players={props.players} handleNewPlayer={props.handleNewPlayer} closeModal={() => setAddPlayerModal(false)} />}
    {removePlayerModal && <RemovePlayerModal handlePlayerRemove={props.handlePlayerRemove} closeModal={() => setRemovePlayerModal('')} player={removePlayerModal} />}
    <List>
      {props.players.map(player => 
        <ListItem
          onMouseDown={() => setRemovePlayerModal(player)}
          key={player}
          current={player === props.currentPlayer}>
          <StyledName>
            {player}
          </StyledName>
        </ListItem>)}
        <StyledButton onClick={() => setAddPlayerModal(true)}>
          <FontAwesomeIcon icon={faPlus} fixedWidth />
        </StyledButton>
    </List>
  </>
}

export default PlayerList