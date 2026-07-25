/**
 * Width at which the board switches from the mobile pattern (turn rail across
 * the top, players and effects in sheets) to the desktop pattern (side rails
 * flanking the card).
 *
 * Set by what a rail needs to be useful rather than by device categories: below
 * this, three columns leave the rail so narrow that names are cut mid-word, and
 * the full-width sheets are simply better. App.css hard-codes the same numbers
 * because CSS files cannot read this constant — keep them in step.
 */
export const RAILS_MIN_WIDTH = 1100

/** Desktop board: side rails visible. */
export const railsUp = `@media (min-width: ${RAILS_MIN_WIDTH}px)`

/** Mobile board: turn rail plus sheets. */
export const railsDown = `@media (max-width: ${RAILS_MIN_WIDTH - 1}px)`
