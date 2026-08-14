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
  border: 0;
  border-radius: var(--r-md);
  color: #fff;
  background: var(--brand);
  box-shadow: var(--glow-brand), inset 0 1px 0 rgba(255, 255, 255, 0.25);
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.6vw, 1.1rem);
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 160ms var(--ease-out), box-shadow 160ms var(--ease-out), filter 160ms var(--ease-out);

  ${hoverOnly`
    &:hover {
      box-shadow: var(--glow-brand-lg), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      filter: saturate(1.12) brightness(1.06);
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
  font-size: 1.1em;
`

const Shortcut = styled.kbd`
  margin-left: 0.15rem;
  padding: 0.2rem 0.45rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: var(--r-xs);
  background: rgba(0, 0, 0, 0.14);
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
