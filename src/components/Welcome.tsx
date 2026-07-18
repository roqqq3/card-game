import { faBoltLightning, faPeoplePulling, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components'

const WelcomeContainer = styled.main`
  width: min(100%, 760px);
  padding: clamp(2rem, 7vw, 5rem);
  border: 1px solid rgba(233, 185, 170, 0.8);
  border-radius: clamp(1.75rem, 5vw, 3rem);
  background: rgba(255, 253, 251, 0.9);
  box-shadow: var(--shadow-card);
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`

const StyledTitle = styled.h1`
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(3rem, 10vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.045em;
`

const StyledDescription = styled.p`
  max-width: 34rem;
  margin: 1.5rem auto 0;
  color: var(--color-text-muted);
  font-size: clamp(1.1rem, 3.5vw, 1.45rem);
  line-height: 1.5;
  text-wrap: balance;
`;

const BaseButton = styled.button`
  min-height: 3.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.9rem 1.25rem;
  border-radius: 1rem;
  font-size: 1.05rem;
  font-weight: 800;
  transition: transform 160ms ease, background-color 160ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 520px) {
    width: 100%;
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

const SecondaryButton = styled(BaseButton)`
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  background: var(--color-surface);

  &:hover {
    background: var(--color-surface-muted);
  }
`

interface WelcomeProps {
  quickStartGame: () => void;
  handleSetAddPlayersScreen: () => void;
  hasSavedGame: boolean;
  resumeGame: () => void;
}

const Welcome = ({ quickStartGame, handleSetAddPlayersScreen, hasSavedGame, resumeGame }: WelcomeProps) => {
  const QuickStartButton = hasSavedGame ? SecondaryButton : PrimaryButton

  return (
    <WelcomeContainer>
      <StyledTitle>Juomapeli</StyledTitle>
      <StyledDescription>
        Lisää pelaajat ja seuraa vuoroja — tai aloita heti nopea peli.
      </StyledDescription>
      <ButtonContainer>
        {hasSavedGame && <PrimaryButton
          value='resumeGame'
          type='button'
          onClick={resumeGame}>
            <FontAwesomeIcon icon={faPlay} fixedWidth />
            Jatka peliä
        </PrimaryButton>}
        <QuickStartButton
          value='QuickStartGame'
          type='button'
          onClick={quickStartGame}>
            <FontAwesomeIcon icon={faBoltLightning} fixedWidth />
            Nopea peli
        </QuickStartButton>
        <SecondaryButton
          value='addPlayers'
          type='button'
          onClick={handleSetAddPlayersScreen}>
            <FontAwesomeIcon icon={faPeoplePulling} fixedWidth />
            Lisää pelaajia
        </SecondaryButton>
      </ButtonContainer>
    </WelcomeContainer>
  )
}

export default Welcome
