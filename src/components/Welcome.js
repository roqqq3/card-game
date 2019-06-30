import React from 'react'
import styled from 'styled-components'

const WelcomeContainer = styled.div`
  text-align: center
  max-width: 500px
  height: 500px
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledTitle = styled.h1`
  font-size: 3.5em
  font-variant: helvetica
  text-align: center
  color: #FA6E4F
`

const StyledDescription = styled.p`
  font-size: 2em
  font-variant: helvetica
  text-align: center
  color: #FA6E4F
`;

const StyledButton = styled.button`
  color: white;
  font-size: 2em;
  font-variant: helvetica
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 50px;
  align-items: center
  background-color: #FB8E7E
  :hover {
    color: #FB8E7E;
    background-color: white
  }
`

const Welcome = ({quickStartGame, handleSetAddPlayersScreen}) => {
  return (
    <WelcomeContainer>
      <StyledTitle>Drinking game</StyledTitle>
      <StyledDescription>Adding players will track cards. Choose quick start if you just want to get playing.</StyledDescription>
      <ButtonContainer>
        <StyledButton 
          classname='addPlayersButton' 
          value='addPlayers' 
          type='submit'
          onClick={handleSetAddPlayersScreen}>
            Add Players
        </StyledButton>
        <StyledButton
          classname='QuickStartGameButton' 
          value='QuickStartGame' 
          type='submit'
          onClick={quickStartGame}>
            Quick Start
        </StyledButton>
      </ButtonContainer>
    </WelcomeContainer>
  )
}

export default Welcome