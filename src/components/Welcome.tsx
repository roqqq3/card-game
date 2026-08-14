import { faBoltLightning, faPlay, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { getRandomQuote } from '../copy/quotes'
import { hoverOnly } from '../styles/mixins'
import BrandMark from './BrandMark'

const riseIn = keyframes`
  from { transform: translateY(1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const Screen = styled.main`
  width: min(100%, 30rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(1.5rem, 4vh, 2.25rem);
  text-align: center;
`

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  animation: ${riseIn} 420ms var(--ease-out) both;
`

const Wordmark = styled.h1`
  margin: 0;
  /* Plain white so the pink is spent on the quote and the primary action rather
     than three stacked elements competing in the same hue. */
  color: var(--text);
  font-size: clamp(2.75rem, 13vw, 4.75rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.05em;
`

const Quote = styled.p`
  max-width: 20rem;
  margin: 0.15rem 0 0;
  color: var(--pink-bright);
  font-size: clamp(1rem, 3.6vw, 1.15rem);
  font-style: italic;
  font-weight: 500;
  line-height: 1.5;
  text-wrap: balance;
`

const Actions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  animation: ${riseIn} 460ms var(--ease-out) 100ms both;
`

const BaseButton = styled.button`
  width: 100%;
  min-height: 3.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 1rem 1.25rem;
  border-radius: var(--r-md);
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  transition: transform 160ms var(--ease-out), background-color 160ms var(--ease-out), box-shadow 160ms var(--ease-out), filter 160ms var(--ease-out);

  &:active {
    transform: scale(0.99);
  }
`

const PrimaryButton = styled(BaseButton)`
  border: 0;
  color: #fff;
  background: var(--brand);
  box-shadow: var(--glow-brand), inset 0 1px 0 rgba(255, 255, 255, 0.25);

  ${hoverOnly`
    &:hover {
      box-shadow: var(--glow-brand-lg), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      filter: saturate(1.12) brightness(1.06);
      transform: translateY(-0.125rem);
    }
  `}
`

const SecondaryButton = styled(BaseButton)`
  border: 1px solid var(--border);
  color: var(--text);
  background: var(--surface);

  ${hoverOnly`
    &:hover {
      border-color: var(--border-strong);
      background: var(--surface-hover);
      transform: translateY(-0.125rem);
    }
  `}
`

const ResumeCard = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  background: var(--surface);
  box-shadow: var(--shadow-1);
  text-align: left;
  animation: ${riseIn} 500ms var(--ease-out) 180ms both;
`

const ResumeInfo = styled.div`
  min-width: 0;
  flex: 1;
`

const ResumeLabel = styled.h2`
  margin: 0;
  color: var(--text-faint);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

const ResumeSummary = styled.p`
  margin: 0.25rem 0 0;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.35;
  overflow-wrap: anywhere;
`

const ResumeTime = styled.p`
  margin: 0.15rem 0 0;
  color: var(--text-faint);
  font-size: 0.78rem;
  line-height: 1.4;
`

const ResumeButton = styled.button`
  width: 3.25rem;
  height: 3.25rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 47, 126, 0.4);
  border-radius: var(--r-md);
  color: var(--pink-bright);
  background: rgba(255, 47, 126, 0.14);
  font-size: 1rem;
  transition: background-color 150ms var(--ease-out), color 150ms var(--ease-out);

  ${hoverOnly`
    &:hover {
      color: #fff;
      background: var(--pink-deep);
    }
  `}
`

interface WelcomeProps {
  quickStartGame: () => void
  handleSetAddPlayersScreen: () => void
  hasSavedGame: boolean
  savedGameSummary?: string
  savedGameSavedAt?: string
  resumeGame: () => void
}

const Welcome = ({
  quickStartGame,
  handleSetAddPlayersScreen,
  hasSavedGame,
  savedGameSummary,
  savedGameSavedAt,
  resumeGame
}: WelcomeProps) => {
  // Picked once per visit to the menu, so returning from a game rolls a new one.
  const [quote] = useState(getRandomQuote)

  return (
    <Screen>
      <Hero>
        <BrandMark size='clamp(3.75rem, 17vw, 5rem)' />
        <Wordmark>Juomapeli</Wordmark>
        <Quote>”{quote}”</Quote>
      </Hero>

      <Actions>
        <PrimaryButton type='button' onClick={handleSetAddPlayersScreen}>
          <FontAwesomeIcon icon={faUserGroup} fixedWidth aria-hidden='true' />
          Lisää pelaajat
        </PrimaryButton>
        <SecondaryButton type='button' onClick={quickStartGame}>
          <FontAwesomeIcon icon={faBoltLightning} fixedWidth aria-hidden='true' />
          Nopea peli
        </SecondaryButton>
      </Actions>

      {hasSavedGame && <ResumeCard aria-labelledby='resume-label'>
        <ResumeInfo>
          <ResumeLabel id='resume-label'>Jatka edellistä</ResumeLabel>
          {savedGameSummary && <ResumeSummary>{savedGameSummary}</ResumeSummary>}
          {savedGameSavedAt && <ResumeTime>Tallennettu {savedGameSavedAt}</ResumeTime>}
        </ResumeInfo>
        <ResumeButton type='button' aria-label='Jatka edellistä peliä' onClick={resumeGame}>
          <FontAwesomeIcon icon={faPlay} aria-hidden='true' />
        </ResumeButton>
      </ResumeCard>}
    </Screen>
  )
}

export default Welcome
