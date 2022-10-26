import { faBoltLightning, faPeoplePulling } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  font-size: 2rem;
  font-variant: helvetica;
  text-align: center;
  color: #FA6E4F;
`;

const StyledButton = styled.button`
  color: white;
  font-size: 1.75rem;
  font-variant: helvetica;
  margin: 0.3rem;
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
            <FontAwesomeIcon icon={faPeoplePulling} fixedWidth /> Lisää pelaajia
        </StyledButton>
        <StyledButton
          value='QuickStartGame' 
          type='submit'
          onClick={quickStartGame}>
            <FontAwesomeIcon icon={faBoltLightning} fixedWidth />Nopea peli
        </StyledButton>
      </ButtonContainer>
    </WelcomeContainer>
  )
}

export default Welcome