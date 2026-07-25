import { Card } from './Card'

/**
 * Cards carry a `rarity` from 0 (drawn almost every game) to 100. It is purely
 * a frequency knob — a high value means "show this seldom", NOT "drink more" —
 * so the tier is expressed only as ambient colour on the card. Naming the tiers
 * on screen would claim an intensity the data does not encode.
 *
 * Each tier ships pre-mixed alpha variants rather than relying on `color-mix`,
 * so the accent still renders on older mobile browsers.
 */
export type RarityTier = {
  id: 'common' | 'uncommon' | 'rare' | 'legendary'
  /** Solid accent, used for the hairline along the top edge. */
  color: string
  /** Soft halo: the card's outer glow, its inner wash and the title shadow. */
  glow: string
  /** Accent at border strength. */
  dim: string
  /** Legendary cards additionally get a one-off shimmer sweep. */
  showcase: boolean
}

/**
 * Alphas are deliberately high: colour is now the only channel carrying rarity,
 * so it has to register at a glance from across a table.
 *
 * Hues are ordered by how strongly they actually separate from the card, not by
 * loot-game convention (which would put violet above cyan). The card surface is
 * a violet-grey and the page glow is pink, so violet has the least to contrast
 * against and reads as the quietest step — it belongs on the lower tier, or a
 * rare draw ends up looking tamer than an uncommon one.
 */
const TIERS: Record<RarityTier['id'], RarityTier> = {
  common: {
    id: 'common',
    color: '#b9c5da',
    glow: 'rgba(185, 197, 218, 0.3)',
    dim: 'rgba(185, 197, 218, 0.4)',
    showcase: false
  },
  uncommon: {
    id: 'uncommon',
    color: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.42)',
    dim: 'rgba(192, 132, 252, 0.52)',
    showcase: false
  },
  rare: {
    id: 'rare',
    color: '#3ddbf0',
    glow: 'rgba(61, 219, 240, 0.5)',
    dim: 'rgba(61, 219, 240, 0.6)',
    showcase: false
  },
  legendary: {
    id: 'legendary',
    color: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.58)',
    dim: 'rgba(251, 191, 36, 0.68)',
    showcase: true
  }
}

export const getRarityTier = (card: Card): RarityTier => {
  if (card.rarity >= 70) return TIERS.legendary
  if (card.rarity >= 50) return TIERS.rare
  if (card.rarity >= 20) return TIERS.uncommon
  return TIERS.common
}
