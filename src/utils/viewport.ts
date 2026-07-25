/**
 * Publishes the visual viewport as CSS custom properties.
 *
 * The on-screen keyboard shrinks the *visual* viewport but, on iOS Safari and
 * under Chrome's default `interactive-widget: resizes-visual`, leaves the
 * *layout* viewport untouched. `100dvh` therefore still reports the full screen
 * height, and anything sized or bottom-anchored against it — like the setup
 * screen's start button — ends up hidden behind the keyboard.
 *
 * `--app-height` is the height actually visible to the user, and
 * `--app-viewport-top` is how far the visual viewport has been scrolled inside
 * the layout viewport, which iOS uses when it pans to reveal a focused field.
 * Both have sensible CSS defaults in index.css, so browsers without the
 * VisualViewport API simply keep the dvh-based behaviour.
 */
export const trackViewportSize = () => {
  const viewport = window.visualViewport
  if (!viewport) return () => undefined

  const apply = () => {
    const root = document.documentElement
    root.style.setProperty('--app-height', `${viewport.height}px`)
    root.style.setProperty('--app-viewport-top', `${viewport.offsetTop}px`)
  }

  apply()
  viewport.addEventListener('resize', apply)
  viewport.addEventListener('scroll', apply)

  return () => {
    viewport.removeEventListener('resize', apply)
    viewport.removeEventListener('scroll', apply)
    const root = document.documentElement
    root.style.removeProperty('--app-height')
    root.style.removeProperty('--app-viewport-top')
  }
}
