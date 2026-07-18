import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 820px) {
    position: static;
    z-index: 5;
    flex: 0 0 auto;
    padding: 0.5rem;
    border: 1px solid rgba(233, 184, 199, 0.8);
    border-radius: 1.25rem;
    background: rgba(255, 246, 249, 0.92);
    backdrop-filter: blur(12px);
  }
`;

const NextButton = styled.button`
  min-width: 14rem;
  min-height: 3.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 1.4rem;
  border: 0;
  border-radius: 1rem;
  color: white;
  background: var(--color-primary);
  box-shadow: 0 10px 24px rgba(184, 63, 99, 0.24);
  font-weight: 800;
  transition: transform 160ms ease, background-color 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-2px);
    background: var(--color-primary-hover);
    box-shadow: 0 12px 28px rgba(184, 63, 99, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 820px) {
    width: 100%;
    box-shadow: 0 8px 18px rgba(184, 63, 99, 0.22);
  }
`;

const Shortcut = styled.span`
  padding: 0.15rem 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  opacity: 0.86;

  @media (max-width: 820px) {
    display: none;
  }
`;

const FullLabel = styled.span`
  @media (max-width: 360px) {
    display: none;
  }
`;

const CompactLabel = styled.span`
  display: none;

  @media (max-width: 360px) {
    display: inline;
  }
`;

interface ButtonProps {
  handleTurnChange: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ handleTurnChange }: ButtonProps) => {
  return (
    <ButtonContainer>
      <NextButton
        value='newCard'
        type='button'
        aria-label='Seuraava kortti'
        onClick={handleTurnChange}
      >
        <FontAwesomeIcon icon={faDice} fixedWidth />
        <FullLabel>Seuraava kortti</FullLabel>
        <CompactLabel>Uusi kortti</CompactLabel>
        <Shortcut aria-hidden='true'>SPACE</Shortcut>
      </NextButton>
    </ButtonContainer>
  );
};

export default Button;
