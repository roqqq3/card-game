import React from 'react'
import styled from 'styled-components'

const WelcomeContainer = styled.div`
  text-align: center
  max-width: 500px
  height: 500px
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

const Welcome = ({handleGameStart}) => {
  return (
    <WelcomeContainer>
      <StyledTitle>Drinking game</StyledTitle>
      <StyledDescription>Click the button below to get started</StyledDescription>
      <StyledButton 
        classname='startGameButton' 
        value='startGame' 
        type='submit'
        onClick={handleGameStart}>
          Start Game
      </StyledButton>
    </WelcomeContainer>
  )
}

export default Welcome