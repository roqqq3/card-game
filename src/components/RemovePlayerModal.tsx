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

const Modal = styled.div`
  width: min(100%, 24rem);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
`;

const Title = styled.h2`
  margin: 0;
  color: var(--color-primary);
  font-size: 1.65rem;
`;

const Text = styled.p`
  margin: 0.75rem 0 1.25rem;
  color: var(--color-text-muted);
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.65rem;
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

const RemoveButton = styled(BaseButton)`
  border: 1px solid var(--color-danger);
  color: white;
  background: var(--color-danger);
`;

interface RemovePlayerModalProps {
  player: string;
  closeModal: () => void;
  handlePlayerRemove: (name: string) => void;
}

const RemovePlayerModal = (props: RemovePlayerModalProps) => {
  const submitRemove = () => {
    props.handlePlayerRemove(props.player);
    props.closeModal();
  }

  return (
    <Overlay>
      <Modal role='dialog' aria-modal='true' aria-labelledby='remove-player-title'>
        <Title id='remove-player-title'>Poistetaanko pelaaja?</Title>
        <Text>{props.player} poistetaan pelistä ja hänen jatkuvat korttinsa tyhjennetään.</Text>
        <ButtonContainer>
          <CancelButton type='button' autoFocus onClick={props.closeModal}>Peruuta</CancelButton>
          <RemoveButton type='button' onClick={submitRemove}>Poista</RemoveButton>
        </ButtonContainer>
      </Modal>
    </Overlay>
  )
}

export default RemovePlayerModal;
