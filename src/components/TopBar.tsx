import { faLayerGroup, faRightFromBracket, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { railsUp } from '../styles/breakpoints'
import { hoverOnly } from '../styles/mixins'
import BrandMark from './BrandMark'

const Bar = styled.header`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`

const Brand = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
`

const BrandName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 400px) {
    display: none;
  }
`

const Actions = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

const IconButton = styled.button`
  min-width: 2.75rem;
  height: 2.75rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 0.8rem;
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text-muted);
  background: var(--surface);
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 600;
  transition: color 150ms var(--ease-out), background-color 150ms var(--ease-out), border-color 150ms var(--ease-out);

  ${hoverOnly`
    &:hover {
      color: var(--text);
      background: var(--surface-hover);
      border-color: var(--border-strong);
    }
  `}
`

const ButtonLabel = styled.span`
  @media (max-width: 900px) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`

const Count = styled.span`
  position: absolute;
  top: -0.35rem;
  right: -0.35rem;
  min-width: 1.3rem;
  height: 1.3rem;
  display: grid;
  place-items: center;
  padding: 0 0.28rem;
  border: 2px solid var(--bg);
  border-radius: var(--r-pill);
  color: #fff;
  background: var(--violet-deep);
  font-size: 0.66rem;
  font-weight: 700;
  line-height: 1;
`

/** Only shown on narrow screens — the desktop board keeps these lists in rails. */
const MobileOnly = styled(IconButton)`
  ${railsUp} {
    display: none;
  }
`

interface TopBarProps {
  effectCount: number
  playerCount: number
  onOpenEffects: () => void
  onOpenPlayers: () => void
  onExit: () => void
}

const TopBar = ({ effectCount, playerCount, onOpenEffects, onOpenPlayers, onExit }: TopBarProps) => {
  const iconProps: Partial<FontAwesomeIconProps> = { fixedWidth: true, 'aria-hidden': true }

  return (
    <Bar>
      <Brand>
        <BrandMark size='1.6rem' />
        <BrandName>Juomapeli</BrandName>
      </Brand>
      <Actions>
        {playerCount > 0 && <MobileOnly
          type='button'
          aria-label={`Pelaajat (${playerCount})`}
          onClick={onOpenPlayers}
        >
          <FontAwesomeIcon icon={faUserGroup} {...iconProps} />
        </MobileOnly>}
        {effectCount > 0 && <MobileOnly
          type='button'
          aria-label={`Jatkuvat kortit (${effectCount})`}
          onClick={onOpenEffects}
        >
          <FontAwesomeIcon icon={faLayerGroup} {...iconProps} />
          <Count aria-hidden='true'>{effectCount}</Count>
        </MobileOnly>}
        <IconButton type='button' aria-label='Lopeta peli' onClick={onExit}>
          <FontAwesomeIcon icon={faRightFromBracket} {...iconProps} />
          <ButtonLabel>Lopeta</ButtonLabel>
        </IconButton>
      </Actions>
    </Bar>
  )
}

export default TopBar
