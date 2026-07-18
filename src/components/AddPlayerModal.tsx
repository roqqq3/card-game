import { useState } from 'react';
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(69, 38, 49, 0.4);
  backdrop-filter: blur(4px);
`;

const Modal = styled.form`
  width: min(100%, 24rem);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  background: var(--surface-glass);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(18px);
`;

const Title = styled.h2`
  margin: 0;
  color: var(--color-primary);
  font-size: 1.65rem;
`;

const Description = styled.p`
  margin: 0.5rem 0 1rem;
  color: var(--color-text-muted);
  line-height: 1.45;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.9rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.85rem;
  color: var(--color-text);
  background: var(--surface-control);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.65rem;
  margin-top: 1rem;
`;

const BaseButton = styled.button`
  min-height: 2.9rem;
  padding: 0.7rem 1rem;
  border-radius: 0.8rem;
  font-weight: 800;
`;

const CancelButton = styled(BaseButton)`
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  background: var(--color-surface);
`;

const AddButton = styled(BaseButton)`
  border: 1px solid var(--color-primary);
  color: white;
  background: var(--color-primary);
`;

interface AddPlayerModalProps {
  players: string[];
  handleNewPlayer: (name: string) => void;
  closeModal: () => void;
}

const AddPlayerModal = (props: AddPlayerModalProps) => {
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleNewPlayerName = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmedName = newPlayerName.trim()
    if (!props.players.includes(trimmedName) && trimmedName !== '' && trimmedName.length < 30) {
      props.handleNewPlayer(trimmedName)
      props.closeModal()
    }
  }

  return (
    <Overlay>
      <Modal onSubmit={handleNewPlayerName} role='dialog' aria-modal='true' aria-labelledby='add-player-title'>
        <Title id='add-player-title'>Lisää pelaaja</Title>
        <Description>Uusi pelaaja liittyy mukaan seuraavalle kierrokselle.</Description>
        <StyledInput
          autoFocus
          value={newPlayerName}
          placeholder='Pelaajan nimi'
          aria-label='Pelaajan nimi'
          maxLength={29}
          onChange={event => setNewPlayerName(event.target.value)}
        />
        <ButtonContainer>
          <CancelButton type='button' onClick={props.closeModal}>Peruuta</CancelButton>
          <AddButton type='submit'>Lisää</AddButton>
        </ButtonContainer>
      </Modal>
    </Overlay>
  )
}

export default AddPlayerModal;
