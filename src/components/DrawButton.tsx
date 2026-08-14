import { faDice } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { hoverOnly } from '../styles/mixins'

const Button = styled.button`
  width: min(100%, 24rem);
  min-height: 3.75rem;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  padding: 0.9rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  color: var(--text);
  background: var(--surface);
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.6vw, 1.1rem);
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 160ms var(--ease-out), background-color 160ms var(--ease-out), border-color 160ms var(--ease-out);

  ${hoverOnly`
    &:hover {
      border-color: var(--border-strong);
      background: var(--surface-hover);
      transform: translateY(-0.125rem);
    }
  `}

  &:active {
    transform: translateY(0) scale(0.985);
  }

  @media (max-width: 820px) {
    width: 100%;
    min-height: 4rem;
  }
`

const Icon = styled(FontAwesomeIcon)`
  color: var(--pink-bright);
  font-size: 1.1em;
`

const Shortcut = styled.kbd`
  margin-left: 0.15rem;
  padding: 0.2rem 0.45rem;
  border: 1px solid var(--border-strong);
  border-radius: var(--r-xs);
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.06);
  font-family: var(--font-body);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.08em;

  /* Space bar hint is meaningless without a physical keyboard. */
  @media (hover: none), (max-width: 820px) {
    display: none;
  }
`

interface DrawButtonProps {
  onDraw: () => void
}

const DrawButton = ({ onDraw }: DrawButtonProps) => (
  <Button type='button' onClick={onDraw}>
    <Icon icon={faDice} fixedWidth aria-hidden='true' />
    Seuraava kortti
    <Shortcut aria-hidden='true'>SPACE</Shortcut>
  </Button>
)

export default DrawButton
