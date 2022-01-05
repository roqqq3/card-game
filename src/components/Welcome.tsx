import styled from 'styled-components'

const WelcomeContainer = styled.div`
  text-align: center;
  max-width: 500px;
  min-width: 100px;
  height: 70vh;
  padding: 5vw;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledTitle = styled.h1`
  font-size: 3.5rem;
  font-variant: helvetica;
  text-align: center;
  color: #FA6E4F;
`

const StyledDescription = styled.p`
  font-size: 2em;
  font-variant: helvetica;
  text-align: center;
  color: #FA6E4F;
`;

const StyledButton = styled.button`
  color: white;
  font-size: 2em;
  font-variant: helvetica;
  margin: 0.7em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 50px;
  align-items: center;
  background-color: #FB8E7E;
  outline: 0;
  :hover {
    color: #FB8E7E;
    background-color: white;
  }
`

interface WelcomeProps {
  quickStartGame: () => void;
  handleSetAddPlayersScreen: () => void;
}

const Welcome = ({ quickStartGame, handleSetAddPlayersScreen }: WelcomeProps) => {
  return (
    <WelcomeContainer>
      <StyledTitle>Juomapeli</StyledTitle>
      <StyledDescription>Pelaajien lisääminen näyttää vuorot ja jatkuvat kortit. Valitse nopea peli jos haluat vain päästä pelaamaan.</StyledDescription>
      <ButtonContainer>
        <StyledButton
          value='addPlayers' 
          type='submit'
          onClick={handleSetAddPlayersScreen}>
            Lisää pelaajia
        </StyledButton>
        <StyledButton
          value='QuickStartGame' 
          type='submit'
          onClick={quickStartGame}>
            Nopea peli
        </StyledButton>
      </ButtonContainer>
    </WelcomeContainer>
  )
}

export default Welcome