import styled from 'styled-components'
import { ContinuousCard } from '../types/ContinuousCard';

const List = styled.ul`
  overflow: hidden;
  list-style: none;
  padding: 0px 0px;
  background-color: #E9C8B7
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
  text-align: center;
`;

const ListItem = styled.li`
  background-color: #E9C8B7;
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

interface CardEffectsProps {
  continuousCards: ContinuousCard[]
}

const CardEffects = ({continuousCards}: CardEffectsProps) => {
  return (
    <List>
    {continuousCards.map((card) => 
      <ListItem
        key={card.id}>
        <StyledName>
          {card.name}
        </StyledName>
        <StyledName>
          {card.player}
        </StyledName>
      </ListItem>)}
  </List>
  )
}

export default CardEffects