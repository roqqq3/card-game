import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from { transform: translateY(-0.6rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const Wrapper = styled.div`
  position: fixed;
  z-index: 90;
  top: calc(var(--safe-t) + 0.75rem);
  left: 50%;
  width: min(calc(100% - 1.5rem), 26rem);
  transform: translateX(-50%);
  pointer-events: none;
`

const Message = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--r-md);
  color: var(--text);
  background: rgba(25, 17, 40, 0.92);
  box-shadow: var(--shadow-2);
  backdrop-filter: blur(12px);
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  text-wrap: balance;
  animation: ${slideIn} 220ms var(--ease-out);
`

interface ToastProps {
  message: string | null
}

/**
 * The live region stays mounted for the life of the game and only its contents
 * change — assistive tech announces mutations inside an existing region far
 * more reliably than the sudden appearance of a whole new one.
 */
const Toast = ({ message }: ToastProps) => (
  <Wrapper role='status' aria-live='polite'>
    {message !== null && <Message>{message}</Message>}
  </Wrapper>
)

export default Toast
