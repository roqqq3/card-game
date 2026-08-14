import styled, { keyframes } from 'styled-components'
import { hoverOnly } from '../styles/mixins'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const popIn = keyframes`
  from { transform: scale(0.94) translateY(0.75rem); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
`

const Overlay = styled.div`
  position: fixed;
  z-index: 80;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(5, 4, 10, 0.72);
  backdrop-filter: blur(6px);
  animation: ${fadeIn} 140ms var(--ease-out);
`

const Dialog = styled.div`
  width: min(100%, 25rem);
  padding: clamp(1.25rem, 4vw, 1.75rem);
  border: 1px solid var(--border-strong);
  border-radius: var(--r-xl);
  background: linear-gradient(160deg, var(--elev-3), var(--elev-1));
  box-shadow: var(--shadow-3);
  animation: ${popIn} 200ms var(--ease-spring);
`

const Title = styled.h2`
  margin: 0;
  font-size: clamp(1.35rem, 4vw, 1.6rem);
`

const Text = styled.p`
  margin: 0.6rem 0 1.5rem;
  color: var(--text-muted);
  font-size: 0.98rem;
  line-height: 1.55;
  overflow-wrap: anywhere;
`

const Actions = styled.div`
  display: flex;
  gap: 0.65rem;

  > * {
    flex: 1;
  }
`

const BaseButton = styled.button`
  min-height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  border-radius: var(--r-md);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  transition: background-color 150ms var(--ease-out), transform 150ms var(--ease-out);

  &:active {
    transform: scale(0.98);
  }
`

const CancelButton = styled(BaseButton)`
  border: 1px solid var(--border);
  color: var(--text);
  background: var(--surface);

  ${hoverOnly`
    &:hover {
      background: var(--surface-hover);
    }
  `}
`

const DestructiveButton = styled(BaseButton)`
  border: 1px solid transparent;
  color: #fff;
  background: var(--danger-deep);
  box-shadow: 0 0.5rem 1.5rem rgba(207, 31, 63, 0.35);

  ${hoverOnly`
    &:hover {
      background: #b81936;
    }
  `}
`

interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

/** Escape is handled centrally in App, which knows the overlay stacking order. */
const ConfirmDialog = ({
  title,
  message,
  confirmLabel,
  cancelLabel = 'Peruuta',
  onConfirm,
  onCancel
}: ConfirmDialogProps) => {
  return (
    <Overlay onPointerDown={event => {
      if (event.target === event.currentTarget) onCancel()
    }}>
      <Dialog role='dialog' aria-modal='true' aria-labelledby='confirm-title'>
        <Title id='confirm-title'>{title}</Title>
        <Text>{message}</Text>
        <Actions>
          <CancelButton type='button' autoFocus onClick={onCancel}>{cancelLabel}</CancelButton>
          <DestructiveButton type='button' onClick={onConfirm}>{confirmLabel}</DestructiveButton>
        </Actions>
      </Dialog>
    </Overlay>
  )
}

export default ConfirmDialog
