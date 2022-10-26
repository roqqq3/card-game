import React, { useState } from 'react'; 
import styled from 'styled-components';

const AddPlayersContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-left: 10px;
  margin-right: 10px;
  height: 90vh;
  text-align: center;
`

const TopButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const StyledTitle = styled.h1`
  font-size: 3.5em;
  font-variant: helvetica;
  text-align: center;
  color: #FA6E4F;
`

const StyledDescription = styled.p`
  font-size: 1em;
  font-variant: helvetica;
  text-align: center;
  color: #FA6E4F;
  width: 156px;
  margin: 1em;
  padding: 0.25em 1em;
`;

const StyledInput = styled.input`
  padding: 1rem;
  margin: 0.25em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  font-size: 1.3em;
  max-width: 300px;
`

const StyledNavigationButton = styled.button`
  color: white;
  font-size: 1.5rem;
  font-variant: helvetica;
  margin: 0.5rem;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 1rem;
  align-items: center;
  background-color: #FB8E7E;
  outline: 0;
  :hover {
    color: #FB8E7E;
    background-color: white;
  }
`

const StyledAddButton = styled.button`
  color: white;
  font-size: 2rem;
  font-variant: helvetica;
  margin: 0.25rem;
  padding: 0.5rem 0.5rem;
  border: 2px solid palevioletred;
  border-radius: 1rem;
  align-items: center;
  background-color: #FB8E7E;
  outline: 0;
  :hover {
    color: #FB8E7E;
    background-color: white;
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0px 20px;
  background-color: #E9C8B7;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
  text-align: center;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  :first-child {
    border-top: none;
  }
  border-top: 2px solid rgba(250, 110, 79, 0.2);
`;

const StyledName = styled.span`
  font-size: 25px;
  color: #FA6E4F;
  margin-bottom: 5px;
`;

interface Props {
  players: string[];
  startGame: () => void;
  handleNewPlayer: (name: string) => void;
  handleGoToWelcome: () => void;
}

const AddPlayersScreen = (props: Props) => {

  const [ newPlayerName, setNewPlayerName ] = useState('') // The value of the name field when adding a new player

  const renderStartGameButton = () => {
    if (props.players.length >= 2) {
      return ( 
        <StyledNavigationButton type='submit' onClick={props.startGame}>
          Aloita peli
        </StyledNavigationButton>
      )
    } else if (props.players.length === 0) {
      return (
        <StyledDescription>
          Lisää kaksi pelaajaa
        </StyledDescription>
      )
    } else {
      return (
        <StyledDescription>
          Lisää yksi pelaaja
        </StyledDescription>
      )
    }
  }

  const handleNewPlayerName = (evt: React.FormEvent) => {
    evt.preventDefault()
    if (!props.players.includes(newPlayerName) && newPlayerName !== '' && newPlayerName.length < 30) {
      props.handleNewPlayer(newPlayerName)
      setNewPlayerName('')
    }
  }

  const handleNewPlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayerName(event.target.value)
  }

  return (
    <AddPlayersContainer>
      <TopButtonContainer>
        <StyledNavigationButton type='submit' onClick={props.handleGoToWelcome}>
          Takaisin
        </StyledNavigationButton>
        {renderStartGameButton()}
      </TopButtonContainer>
        <StyledTitle>Lisää pelaajia</StyledTitle>
        <ButtonContainer>
          <StyledInput
            value={newPlayerName} 
            placeholder='Kirjoita nimi'
            onChange={handleNewPlayerNameChange} 
          />
          <StyledAddButton type='submit' onClick={handleNewPlayerName}>
              Lisää
          </StyledAddButton>
        </ButtonContainer>
      <List>
        {props.players.map(i => 
          <ListItem key={i}>
            <StyledName>{i}</StyledName>
          </ListItem>)}
      </List>
    </AddPlayersContainer>
  )
}

export default AddPlayersScreen