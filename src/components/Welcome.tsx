import { faBoltLightning, faPeoplePulling, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components'

const WelcomeContainer = styled.main`
  width: min(100%, 720px);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(1.25rem, 4vw, 3rem);
  border: 1px solid rgba(218, 125, 151, 0.42);
  border-radius: clamp(1.75rem, 5vw, 2.75rem);
  background: var(--surface-glass);
  box-shadow: 0 24px 64px rgba(103, 43, 65, 0.14);
  backdrop-filter: blur(18px);
  text-align: center;

`

const BrandIcon = styled.img`
  width: clamp(5.25rem, 11vw, 7rem);
  height: clamp(5.25rem, 11vw, 7rem);
  display: block;
  margin: 0 auto 0.25rem;
  filter: drop-shadow(0 10px 16px rgba(103, 43, 65, 0.12));
`

const StyledTitle = styled.h1`
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(3rem, 10vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.045em;
`

const ActionSections = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 1.8rem;
`

const NewGameSection = styled.section`
  text-align: center;
`

const ContinueSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 0.25rem 0;
  border-top: 1px solid rgba(184, 63, 99, 0.22);
  text-align: left;

  @media (max-width: 520px) {
    align-items: stretch;
    flex-direction: column;
  }
`

const SectionHeading = styled.div`
  min-width: 0;
`

const SectionTitle = styled.h2`
  margin: 0;
  color: var(--color-text);
  font-size: 1.25rem;
  line-height: 1.2;
`

const SavedGameSummary = styled.p`
  margin: 0.4rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.4;
  overflow-wrap: anywhere;
`

const SavedGameTime = styled.p`
  margin: 0.2rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  line-height: 1.4;
`

const NewGameActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`

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
  flex: 1;
  border: 1px solid var(--color-primary);
  color: white;
  background: var(--color-primary);

  &:hover {
    background: var(--color-primary-hover);
  }
`

const SecondaryButton = styled(BaseButton)`
  flex: 1;
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  background: var(--color-surface);

  &:hover {
    background: var(--color-surface-muted);
  }
`

const ContinueButton = styled(SecondaryButton)`
  min-width: 10rem;
  flex: 0 0 auto;
  background: var(--surface-control);

  @media (max-width: 520px) {
    width: 100%;
  }
`

interface WelcomeProps {
  quickStartGame: () => void;
  handleSetAddPlayersScreen: () => void;
  hasSavedGame: boolean;
  savedGameSummary?: string;
  savedGameSavedAt?: string;
  resumeGame: () => void;
}

const Welcome = ({ quickStartGame, handleSetAddPlayersScreen, hasSavedGame, savedGameSummary, savedGameSavedAt, resumeGame }: WelcomeProps) => {
  return (
    <WelcomeContainer>
      <BrandIcon src={`${process.env.PUBLIC_URL}/start-icons/02-cocktail-die.svg`} alt='' aria-hidden='true' />
      <StyledTitle>Juomapeli</StyledTitle>
      <ActionSections>
        <NewGameSection aria-labelledby='new-game-title'>
          <SectionHeading>
            <SectionTitle id='new-game-title'>Aloita uusi peli</SectionTitle>
          </SectionHeading>
          <NewGameActions>
            <PrimaryButton
              value='addPlayers'
              type='button'
              onClick={handleSetAddPlayersScreen}>
                <FontAwesomeIcon icon={faPeoplePulling} fixedWidth />
                Lisää pelaajia
            </PrimaryButton>
            <SecondaryButton
              value='QuickStartGame'
              type='button'
              onClick={quickStartGame}>
                <FontAwesomeIcon icon={faBoltLightning} fixedWidth />
                Nopea peli
            </SecondaryButton>
          </NewGameActions>
        </NewGameSection>
        {hasSavedGame && <ContinueSection aria-labelledby='continue-game-title'>
          <SectionHeading>
            <SectionTitle id='continue-game-title'>Jatka edellistä peliä</SectionTitle>
            {savedGameSummary && <SavedGameSummary>{savedGameSummary}</SavedGameSummary>}
            {savedGameSavedAt && <SavedGameTime>Tallennettu {savedGameSavedAt}</SavedGameTime>}
          </SectionHeading>
          <ContinueButton
            value='resumeGame'
            type='button'
            onClick={resumeGame}>
              <FontAwesomeIcon icon={faPlay} fixedWidth />
              Jatka peliä
          </ContinueButton>
        </ContinueSection>}
      </ActionSections>
    </WelcomeContainer>
  )
}

export default Welcome
