import { Card } from '../cards/Card'
import { ContinuousCard } from '../types/ContinuousCard'

const STORAGE_KEY = 'juomapeli.active-game.v1'
const SESSION_VERSION = 1

export interface SavedGameSession {
  version: typeof SESSION_VERSION
  savedAt: string
  currentCard: Card
  players: string[]
  currentPlayer: number
  continuousCards: ContinuousCard[]
  previousCards: number[]
}

type GameSessionState = Omit<SavedGameSession, 'version' | 'savedAt'>

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isCard = (value: unknown): value is Card => {
  if (!isRecord(value)) return false

  return typeof value.id === 'number'
    && Number.isInteger(value.id)
    && typeof value.name === 'string'
    && typeof value.description === 'string'
    && typeof value.rarity === 'number'
    && typeof value.continuous === 'boolean'
}

const isContinuousCard = (value: unknown): value is ContinuousCard => {
  if (!isRecord(value)) return false

  return typeof value.id === 'number'
    && Number.isInteger(value.id)
    && typeof value.name === 'string'
    && typeof value.player === 'string'
}

const isSavedGameSession = (value: unknown): value is SavedGameSession => {
  if (!isRecord(value)) return false

  return value.version === SESSION_VERSION
    && typeof value.savedAt === 'string'
    && isCard(value.currentCard)
    && Array.isArray(value.players)
    && value.players.every(player => typeof player === 'string')
    && typeof value.currentPlayer === 'number'
    && Number.isInteger(value.currentPlayer)
    && value.currentPlayer >= 0
    && Array.isArray(value.continuousCards)
    && value.continuousCards.every(isContinuousCard)
    && Array.isArray(value.previousCards)
    && value.previousCards.every(cardId => typeof cardId === 'number' && Number.isInteger(cardId))
}

export const loadGameSession = (): SavedGameSession | null => {
  try {
    const storedSession = window.localStorage.getItem(STORAGE_KEY)
    if (!storedSession) return null

    const parsedSession: unknown = JSON.parse(storedSession)
    if (isSavedGameSession(parsedSession)) return parsedSession

    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Browsers may deny storage access or contain malformed legacy data.
  }

  return null
}

export const saveGameSession = (state: GameSessionState): SavedGameSession | null => {
  const session: SavedGameSession = {
    ...state,
    version: SESSION_VERSION,
    savedAt: new Date().toISOString()
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    return session
  } catch {
    return null
  }
}

export const clearGameSession = () => {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Starting a new game should still work when storage is unavailable.
  }
}
