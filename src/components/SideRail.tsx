import { ReactNode } from 'react'
import styled from 'styled-components'

/* Whether a rail is shown at all is the board layout's call (see App.css). */
const Panel = styled.aside`
  width: 100%;
  max-height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  background: var(--surface);
  box-shadow: var(--shadow-1);
  backdrop-filter: blur(14px);
`

const Header = styled.h2`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
  color: var(--text-faint);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

const Count = styled.span`
  min-width: 1.4rem;
  padding: 0.1rem 0.4rem;
  border-radius: var(--r-pill);
  color: var(--text-muted);
  background: var(--surface-strong);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0;
  text-align: center;
`

/** Bounded flex container; the content component owns its own scroll area. */
const Body = styled.div`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

interface SideRailProps {
  title: string
  count?: number
  children: ReactNode
}

const SideRail = ({ title, count, children }: SideRailProps) => (
  <Panel aria-label={title}>
    <Header>
      {title}
      {count !== undefined && <Count aria-hidden='true'>{count}</Count>}
    </Header>
    <Body>{children}</Body>
  </Panel>
)

export default SideRail
