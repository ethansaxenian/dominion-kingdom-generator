import { CARDS_TO_REMOVE, NON_SUPPLY_TYPES } from "./constants";

export const isValidKingdomCard = (card) =>
  card.in_supply
  && card.types.every((type) => !NON_SUPPLY_TYPES.includes(type))
  && !CARDS_TO_REMOVE.includes(card.name);

export const sortTwoCards = (card1, card2, sortBy) => {
  let first = card1[sortBy];
  let second = card2[sortBy];
  if (sortBy === 'cost') {
    first = parseInt(`${card1.coins ? card1.coins : ''}${card1.potions ? 100 : ''}${card1.debt ? card1.debt.slice(0, -1) + '00000' : ''}` || 0)
    second = parseInt(`${card2.coins ? card2.coins : ''}${card2.potions ? 100 : ''}${card2.debt ? card2.debt.slice(0, -1) + '00000' : ''}` || 0)
  }
  if (first < second) {
    return -1;
  } else if (first === second) {
    return 0;
  }
  return 1;
}
