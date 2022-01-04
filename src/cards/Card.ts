import { cardsData } from './cardsData.js'

export interface Card {
  id: number;
  name: string;
  description: string;
  rarity: number;
  continuous: boolean;
}

export const cards = cardsData as Card[];