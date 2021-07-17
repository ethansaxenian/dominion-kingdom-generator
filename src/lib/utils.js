import _ from "lodash";
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

export const arrayIncludesCard = (array, card) => array.map((obj) => obj.name.toLowerCase()).includes(card.name.toLowerCase());

export const arrayIncludesCardName = (array, name) => array.map((card) => card.name.toLowerCase()).includes(name.toLowerCase());

export const drawCards = (cards, num, predicate) => _.sampleSize(predicate ? cards.filter((card) => predicate(card)) : cards, num);

export const youngWitchPredicate = (card) => ((card.coins === 2) || (card.coins === 3)) && !card.potions && !card.debt;

export const addExtraCards = (kingdom, availableCards) => {
  const newCards = kingdom;
  if (arrayIncludesCardName(newCards, 'Young Witch') && kingdom.every((card) => !card.bane)) {
    console.log("huh>")
    const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(newCards, card));
    const [bane] = drawCards(notInKingdom, 1, youngWitchPredicate);
    bane && newCards.push({...bane, bane: true});
  }
  if (arrayIncludesCardName(newCards, 'Way of the Mouse')  && kingdom.every((card) => !card.wotm)) {
    const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(newCards, card));
    const [wotm] = drawCards(notInKingdom, 1, youngWitchPredicate);
    wotm && newCards.push({...wotm, wotm: true});
  }
  return newCards
}
