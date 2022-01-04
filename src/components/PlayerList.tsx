import styled from 'styled-components'

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

interface PlayerListProps {
  players: string[]
  currentPlayer: string
}
 
const PlayerList = (props: PlayerListProps) => {
  return (
    <List>
      {props.players.map(player => 
        <ListItem
          key={player}
          current={player === props.currentPlayer}>
          <StyledName>
            {player}
          </StyledName>
        </ListItem>)}
    </List>
  )
}

export default PlayerList