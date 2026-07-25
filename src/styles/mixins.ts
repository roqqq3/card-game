import { css, FlattenSimpleInterpolation, SimpleInterpolation } from 'styled-components'

/**
 * Gates styles behind a pointer that can actually hover.
 *
 * A touch device leaves `:hover` applied to the last element tapped until
 * something else is tapped, so an ungated hover style reads as a stuck
 * highlight — or, where hover also moves the element, as a button frozen
 * mid-press. Every hover rule in the app goes through here.
 *
 * Used as a tagged template so call sites need no extra import:
 *
 *   ${hoverOnly`
 *     &:hover { background: var(--surface-hover); }
 *   `}
 */
export const hoverOnly = (
  strings: TemplateStringsArray,
  ...interpolations: SimpleInterpolation[]
): FlattenSimpleInterpolation => css`
  @media (hover: hover) {
    ${css(strings, ...interpolations)}
  }
`
