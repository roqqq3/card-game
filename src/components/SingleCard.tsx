import { ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { Card } from '../cards/Card'

const fadeIn = keyframes`
  from {
    transform: translateY(12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const CardContainer = styled.article`
  width: min(100%, 640px);
  min-height: clamp(20rem, 54vh, 32rem);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: clamp(2rem, 6vw, 4.5rem);
  border: 1px solid rgba(233, 185, 170, 0.78);
  border-radius: clamp(1.5rem, 4vw, 2.5rem);
  background: var(--surface-glass-light);
  box-shadow: var(--shadow-card);
  text-align: center;

  @media (max-width: 820px) {
    width: 100%;
    height: 100%;
    min-height: 0;
    max-height: none;
    padding: clamp(1.5rem, 7vw, 3rem);
    box-shadow: 0 12px 30px rgba(103, 43, 65, 0.13);
  }

  @media (max-width: 820px) and (max-height: 650px) {
    min-height: 0;
    padding: 1.25rem;
  }
`

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  animation: ${fadeIn} 220ms ease-out;

  @media (max-width: 820px) {
    max-height: 100%;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const MobileAction = styled.div`
  display: none;

  @media (max-width: 820px) {
    position: absolute;
    z-index: 4;
    top: 1rem;
    right: 1rem;
    display: flex;
  }
`

const StyledTitle = styled.h1`
  margin: 0;
  color: var(--color-primary);
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.05;
  text-wrap: balance;
`

const Divider = styled.div`
  width: 3rem;
  height: 0.25rem;
  margin: 1.35rem auto;
  border-radius: 999px;
  background: var(--color-accent);
`

const StyledDescription = styled.p`
  max-width: 32rem;
  margin: 0 auto;
  color: var(--color-text);
  font-size: clamp(1.15rem, 2.5vw, 1.65rem);
  font-weight: 550;
  line-height: 1.45;
  text-wrap: balance;
`

interface SingleCardProps {
  card?: Card
  mobileAction?: ReactNode
}

const SingleCard = ({ card, mobileAction }: SingleCardProps) => {
  return card
    ? <CardContainer key={card.id} aria-live='polite'>
        {mobileAction && <MobileAction>{mobileAction}</MobileAction>}
        <CardContent>
          <StyledTitle>{card.name}</StyledTitle>
          <Divider aria-hidden='true' />
          <StyledDescription>{card.description}</StyledDescription>
        </CardContent>
      </CardContainer>
    : null;
}

export default SingleCard
