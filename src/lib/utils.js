import _ from 'lodash';
import { BASE_2_CARDS, BASIC_CARDS, CARDS_TO_REMOVE, CARD_SHAPED_TYPES, INTRIGUE_2_CARDS, NON_SUPPLY_TYPES, ORIGINAL_BASE_CARDS, ORIGINAL_INTRIGUE_CARDS, SECONDARY_CARDS } from './constants';

export const isValidKingdomCard = (card, onlyRandomizers) =>
  card.in_supply
  && card.types.every((type) => !NON_SUPPLY_TYPES.includes(type))
  && (onlyRandomizers ? !CARDS_TO_REMOVE.includes(card.name) : true);

export const isLandscape = (card) => card.types.every((type) => CARD_SHAPED_TYPES.includes(type));

export const sortTwoCards = (card1, card2, sortBy) => {
  let first = card1[sortBy];
  let second = card2[sortBy];
  if (sortBy === 'cost') {
    first = parseInt(`
			${card1.coins ? card1.coins : ''}
			${card1.potions ? 100 : ''}
			${card1.debt ? `${card1.debt.slice(0, -1)  }00000` : ''}`
			|| 0);
    second = parseInt(`
			${card2.coins ? card2.coins : ''}
			${card2.potions ? 100 : ''}
			${card2.debt ? `${card2.debt.slice(0, -1)  }00000` : ''}`
			|| 0);
  }
  if (first < second) {
    return -1;
  } else if (first > second) {
    return 1;
  } else {
    if (card1.name < card2.name) {
      return -1
    } else if (card1.name > card2.name) {
      return 1
    }
    return 0
  }
}

export const arrayIncludesCard = (array, card) => array.map((obj) => obj.name.toLowerCase()).includes(card.name.toLowerCase());

export const arrayIncludesCardName = (array, name) => array.map((card) => card.name.toLowerCase()).includes(name.toLowerCase());

export const drawCards = (cards, num, predicate) => _.sampleSize(predicate ? cards.filter((card) => predicate(card)) : cards, num);

export const youngWitchPredicate = (card) => ((card.coins === 2) || (card.coins === 3)) && !card.potions && !card.debt;

export const addExtraCards = (kingdom, landscapes, availableCards) => {
  const newCards = kingdom;
  if (arrayIncludesCardName(newCards, 'Young Witch') && kingdom.every((card) => !card.bane)) {
    const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(newCards, card));
    const [bane] = drawCards(notInKingdom, 1, youngWitchPredicate);
    bane && newCards.push({...bane, bane: true});
  }
  if (arrayIncludesCardName(landscapes, 'Way of the Mouse')  && kingdom.every((card) => !card.wotm)) {
    const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(newCards, card) && card.types.includes('Action'));
    const [wotm] = drawCards(notInKingdom, 1, youngWitchPredicate);
    wotm && newCards.push({...wotm, wotm: true});
  }
  return newCards
}

export const hasValidExpansion = (card, expansions) => {
  if (ORIGINAL_BASE_CARDS.includes(card.name)) {
    return expansions.includes('Base 1st Edition')
  } else if (BASE_2_CARDS.includes(card.name)) {
    return expansions.includes('Base')
  } else if (card.expansion === 'Base') {
    return expansions.includes('Base') || expansions.includes('Base 1st Edition')
  } else if (ORIGINAL_INTRIGUE_CARDS.includes(card.name)) {
    return expansions.includes('Intrigue 1st Edition')
  } else if (INTRIGUE_2_CARDS.includes(card.name)) {
    return expansions.includes('Intrigue')
  } else if (card.expansion === 'Intrigue') {
    return expansions.includes('Intrigue') || expansions.includes('Intrigue 1st Edition')
  } else {
    return expansions.includes(card.expansion)
  }
}

export const generateBlackMarket = (cards, kingdom, promos, expansions) => {
  if (!arrayIncludesCardName(kingdom, 'Black Market')) {
    return [];
  }
  const blackMarketOptions = cards.filter((card) =>
    isValidKingdomCard(card, false)
    && (hasValidExpansion(card, expansions) || promos.includes(card.name))
    && ![...BASIC_CARDS, ...SECONDARY_CARDS].includes(card.name)
    && !arrayIncludesCard(kingdom, card));
  if (!kingdom.some((card) => card.potions)) {
    return blackMarketOptions.filter((card) => !card.potions)
  }
  return blackMarketOptions;
}
