import { faLayerGroup, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components'
import { ContinuousCard } from '../types/ContinuousCard';

interface PanelProps {
  $open: boolean;
}

const MobileBackdrop = styled.button<PanelProps>`
  display: none;

  @media (max-width: 820px) {
    position: fixed;
    z-index: 30;
    inset: 0;
    display: ${props => props.$open ? 'block' : 'none'};
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    background: rgba(69, 38, 49, 0.34);
    backdrop-filter: blur(3px);
  }
`;

const Panel = styled.section<PanelProps>`
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 1.25rem;
  background: rgba(255, 253, 251, 0.96);
  box-shadow: var(--shadow-soft);

  @media (max-width: 820px) {
    position: fixed;
    z-index: 40;
    right: 0.75rem;
    bottom: calc(max(0.75rem, env(safe-area-inset-bottom)) + 7rem);
    left: 0.75rem;
    max-height: min(55dvh, 28rem);
    border-radius: 1.35rem;
    box-shadow: var(--shadow-card);
    opacity: ${props => props.$open ? 1 : 0};
    visibility: ${props => props.$open ? 'visible' : 'hidden'};
    transform: translateY(${props => props.$open ? '0' : '1rem'});
    transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease;
  }
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PanelTitle = styled.h2`
  margin: 0;
  padding: 1rem 1rem 0.5rem;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;

  @media (max-width: 820px) {
    padding: 1rem;
    color: var(--color-primary);
    font-size: 0.9rem;
  }
`;

const CloseButton = styled.button`
  display: none;

  @media (max-width: 820px) {
    width: 2.65rem;
    height: 2.65rem;
    display: inline-grid;
    place-items: center;
    margin-right: 0.65rem;
    border: 0;
    border-radius: 0.75rem;
    color: var(--color-primary);
    background: var(--color-surface-muted);
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0.5rem 0.75rem 0.75rem;
  list-style: none;

  @media (max-width: 820px) {
    max-height: calc(min(55dvh, 28rem) - 4.75rem);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
    overflow-y: auto;
    padding: 0 0.75rem 0.75rem;
  }
`;

const ListItem = styled.li`
  min-width: 0;
  padding: 0.7rem 0.8rem;
  border-radius: 0.8rem;
  background: var(--color-accent-soft);
`;

const StyledName = styled.strong`
  display: block;
  overflow: hidden;
  color: var(--color-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlayerName = styled.span`
  display: block;
  margin-top: 0.2rem;
  color: var(--color-text-muted);
  font-size: 0.85rem;
`;

const MobileToggle = styled.button`
  display: none;

  @media (max-width: 820px) {
    width: 3.15rem;
    height: 3.15rem;
    position: relative;
    z-index: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    padding: 0;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    color: var(--color-primary);
    background: var(--color-surface);
    box-shadow: var(--shadow-soft);
    font-size: 1rem;
    font-weight: 850;
  }
`;

const EffectCount = styled.span`
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;
  min-width: 1.35rem;
  height: 1.35rem;
  display: grid;
  place-items: center;
  padding: 0 0.25rem;
  border: 2px solid var(--color-surface);
  border-radius: 999px;
  color: white;
  background: var(--color-primary);
  font-size: 0.68rem;
  font-weight: 900;
  line-height: 1;
`;

interface CardEffectsProps {
  continuousCards: ContinuousCard[]
}

const CardEffects = ({ continuousCards }: CardEffectsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const effectLabel = continuousCards.length === 1 ? '1 vaikutus' : `${continuousCards.length} vaikutusta`

  return <>
    <MobileToggle
      type='button'
      aria-label={`${effectLabel}. Näytä jatkuvat kortit`}
      aria-expanded={isOpen}
      aria-controls='continuous-card-drawer'
      onClick={() => setIsOpen(true)}>
      <FontAwesomeIcon icon={faLayerGroup} />
      <EffectCount aria-hidden='true'>{continuousCards.length}</EffectCount>
    </MobileToggle>
    <MobileBackdrop
      type='button'
      $open={isOpen}
      aria-label='Sulje jatkuvat kortit'
      onClick={() => setIsOpen(false)}
    />
    <Panel id='continuous-card-drawer' $open={isOpen}>
      <PanelHeader>
        <PanelTitle>Jatkuvat kortit</PanelTitle>
        <CloseButton type='button' aria-label='Sulje jatkuvat kortit' onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
      </PanelHeader>
      <List>
        {continuousCards.map(card =>
          <ListItem key={card.id}>
            <StyledName>{card.name}</StyledName>
            <PlayerName>{card.player}</PlayerName>
          </ListItem>)}
      </List>
    </Panel>
  </>
}

export default CardEffects
