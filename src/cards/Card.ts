import { cardsData } from './cardsData.js'

export interface Card {
  id: number;
  name: string;
  description: string;
  rarity: number;
  continuous: boolean;
}

export const cards = cardsData as Card[];

const cardsById = new Map(cards.map(card => [card.id, card]));

/**
 * Looks a card up by id, used to recover the rule text of a continuous card
 * that is still in play (only its id, name and owner are tracked).
 *
 * Ids come from a card's position in `cardsData`, so inserting or removing
 * cards shifts them. A session saved before such an edit could therefore point
 * at a different card, which is why callers should confirm the name still
 * matches before trusting the result — see `findCardRule`.
 */
export const getCardById = (id: number) => cardsById.get(id);

/**
 * The rule text for a continuous card in play, or undefined when it cannot be
 * established — either the id is unknown or it now resolves to a different
 * card, which means the deck changed since the game was saved.
 */
export const findCardRule = (id: number, name: string) => {
  const card = getCardById(id);
  return card && card.name === name ? card.description : undefined;
};
