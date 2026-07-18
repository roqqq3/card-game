import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from {
    transform: translateY(-0.75rem);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const StyledNotification = styled.p`
  margin: 0;
  padding: 0.85rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.9rem;
  color: var(--color-text);
  background: rgba(255, 253, 251, 0.96);
  box-shadow: var(--shadow-soft);
  font-size: 0.92rem;
  font-weight: 700;
  text-align: center;
  animation: ${slideIn} 180ms ease-out;
  backdrop-filter: blur(10px);
`

interface NotificationProps {
  message: string | null
}

const Notification = ({ message }: NotificationProps) => {
  if (message === null) return null

  return (
    <div className='message' role='status' aria-live='polite'>
      <StyledNotification>{message}</StyledNotification>
    </div>
  )
}

export default Notification
