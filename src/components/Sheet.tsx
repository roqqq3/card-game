import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PointerEvent as ReactPointerEvent, ReactNode, useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { hoverOnly } from '../styles/mixins'

/** How far the sheet must be dragged down before releasing dismisses it. */
const DISMISS_DISTANCE = 96
/** A flick faster than this dismisses regardless of how far it travelled. */
const DISMISS_VELOCITY = 0.5
/** Length of the slide-out once a dismissing drag is released. */
const EXIT_DURATION = 180

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`

/**
 * Sized to the visible viewport rather than `inset: 0`, so when the keyboard
 * opens for the add-player field the sheet sits on top of it instead of behind
 * it. The offset keeps it aligned when iOS pans the visual viewport.
 */
const Backdrop = styled.div`
  position: fixed;
  z-index: 60;
  top: var(--app-viewport-top);
  left: 0;
  right: 0;
  height: var(--app-height);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(5, 4, 10, 0.7);
  backdrop-filter: blur(6px);
  animation: ${fadeIn} 160ms var(--ease-out);

  @media (min-width: 700px) {
    align-items: center;
    padding: 1.5rem;
  }
`

interface PanelProps {
  /** Pixels the sheet is currently dragged down by. */
  $offset: number
  /** True while a finger is down: the sheet tracks it with no easing. */
  $dragging: boolean
  $closing: boolean
}

const Panel = styled.div<PanelProps>`
  width: 100%;
  /* Percentages resolve against the backdrop, which tracks the visible
     viewport — so this shrinks with the keyboard too. */
  max-height: min(84%, 40rem);
  display: flex;
  flex-direction: column;
  padding-bottom: var(--safe-b);
  border-top: 1px solid var(--border-strong);
  border-radius: var(--r-2xl) var(--r-2xl) 0 0;
  background: linear-gradient(180deg, var(--elev-3), var(--elev-1) 40%);
  box-shadow: var(--shadow-3);
  transform: translateY(${props => props.$closing ? '100%' : `${props.$offset}px`});
  /* No easing while the finger is down, or the sheet lags behind it. */
  transition: ${props => props.$dragging
    ? 'none'
    : `transform ${props.$closing ? EXIT_DURATION : 220}ms var(--ease-out)`};
  /* The entry animation sets its own transform and so wins over the drag offset
     while it runs. It is over in 260ms — long before a drag can realistically
     start — after which, having no fill mode, it stops applying and the offset
     takes effect. Interpolating the Keyframes object (rather than its name) is
     what makes styled-components emit the @keyframes rule at all. */
  animation: ${slideUp} 260ms var(--ease-out);

  @media (min-width: 700px) {
    width: min(100%, 30rem);
    max-height: min(80%, 40rem);
    padding-bottom: 0;
    border: 1px solid var(--border-strong);
    border-radius: var(--r-xl);
    animation: ${fadeIn} 160ms var(--ease-out);
  }
`

/**
 * The grab area. It covers the grip and the title row rather than just the grip
 * itself, which is only a few pixels tall — and it deliberately excludes the
 * scrolling body, so dragging the list never dismisses the sheet by accident.
 */
const DragArea = styled.div`
  flex: 0 0 auto;
  touch-action: none;
`

const Grip = styled.div`
  width: 2.75rem;
  height: 0.25rem;
  flex: 0 0 auto;
  margin: 0.7rem auto 0;
  border-radius: var(--r-pill);
  background: var(--border-strong);

  @media (min-width: 700px) {
    display: none;
  }
`

const Header = styled.header`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem 0.75rem;
`

const Title = styled.h2`
  margin: 0;
  font-size: 1.35rem;
`

const CloseButton = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  color: var(--text-muted);
  background: var(--surface);
  transition: background-color 150ms var(--ease-out), color 150ms var(--ease-out);

  ${hoverOnly`
    &:hover {
      color: var(--text);
      background: var(--surface-hover);
    }
  `}
`

/**
 * A bounded flex container, not a scroller: the content component decides what
 * scrolls, so panels can pin their own controls outside the scroll area.
 */
const Body = styled.div`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 1.25rem 1.25rem;
`

interface SheetProps {
  title: string
  onClose: () => void
  children: ReactNode
}

/**
 * Mobile-first bottom sheet that becomes a centred dialog on wider screens.
 * Used for both the players list and the continuous-effects list.
 *
 * Escape is handled centrally in App, which knows the overlay stacking order.
 */
const Sheet = ({ title, onClose, children }: SheetProps) => {
  const gripRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startY: number; startedAt: number } | null>(null)
  const exitTimeoutRef = useRef<number>()
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => () => window.clearTimeout(exitTimeoutRef.current), [])

  const dismiss = () => {
    setClosing(true)
    setDragging(false)
    exitTimeoutRef.current = window.setTimeout(onClose, EXIT_DURATION)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (closing) return
    // Tie the gesture to the affordance: the grip is hidden in the wide-screen
    // dialog layout, and a dialog that slides away downwards makes no sense.
    if (!gripRef.current || getComputedStyle(gripRef.current).display === 'none') return
    // Let the close button behave as a button.
    if ((event.target as HTMLElement).closest('button')) return

    dragRef.current = { startY: event.clientY, startedAt: event.timeStamp }
    setDragging(true)
    // Capture keeps the move/up events coming once the finger leaves the grab
    // area, which it immediately does when dragging downwards. Not fatal if the
    // browser refuses it, so don't let it break the gesture.
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Ignore: the drag still works while the pointer stays over the handle.
    }
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    // Downward only — dragging up must not detach the sheet from the bottom.
    setOffset(Math.max(0, event.clientY - dragRef.current.startY))
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag) return
    dragRef.current = null

    const travelled = Math.max(0, event.clientY - drag.startY)
    const elapsed = Math.max(1, event.timeStamp - drag.startedAt)
    const flicked = travelled / elapsed > DISMISS_VELOCITY

    if (travelled > DISMISS_DISTANCE || (flicked && travelled > 16)) {
      dismiss()
      return
    }

    // Not far enough: settle back against the bottom edge.
    setDragging(false)
    setOffset(0)
  }

  return (
    <Backdrop onPointerDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <Panel
        role='dialog'
        aria-modal='true'
        aria-label={title}
        $offset={offset}
        $dragging={dragging}
        $closing={closing}
      >
        <DragArea
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <Grip ref={gripRef} aria-hidden='true' />
          <Header>
            <Title>{title}</Title>
            <CloseButton type='button' aria-label='Sulje' onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} />
            </CloseButton>
          </Header>
        </DragArea>
        <Body>{children}</Body>
      </Panel>
    </Backdrop>
  )
}

export default Sheet
