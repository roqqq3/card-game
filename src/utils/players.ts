export const MAX_PLAYER_NAME_LENGTH = 29

/**
 * A name is addable when it is non-empty, short enough to fit the UI and not
 * already taken — names double as React keys and as the identity used to match
 * continuous cards to their owner.
 */
export const isValidNewPlayerName = (trimmedName: string, players: string[]) =>
  trimmedName.length > 0
  && trimmedName.length <= MAX_PLAYER_NAME_LENGTH
  && !players.includes(trimmedName)
