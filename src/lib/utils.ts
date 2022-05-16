import { BASE_2_CARDS, CARDS_TO_REMOVE, CARD_SHAPED_TYPES, INTRIGUE_2_CARDS, NON_SUPPLY_TYPES, ORIGINAL_BASE_CARDS, ORIGINAL_INTRIGUE_CARDS } from './constants';
import { Card, CardType, Expansion } from './types';

export const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

export const sample = (collection: Array<any>, n=1): any => {
  const oldCollection = [...collection];
  const elements = [];
  let sampled;
  for (let i = 0; i < n; i++) {
    [sampled] = oldCollection.splice(random(0, oldCollection.length), 1);
    elements.push(sampled);
  }

  return elements;
};

export const isValidKingdomCard = (card: Card, onlyRandomizers: boolean): boolean =>
  card.in_supply
  && card.types.every((type) => !NON_SUPPLY_TYPES.includes(type))
  && (onlyRandomizers ? !CARDS_TO_REMOVE.includes(card.name) : true);

export const isLandscape = (card: Card): boolean => card.types.every((type) => CARD_SHAPED_TYPES.includes(type));

export const isOfType = (card: Card, types: Array<CardType>): boolean => card.types.some((t) => types.includes(t));

export const costSortValue = (card: Card): number => {
  const coinRep = card.coins ? card.coins : '';
  const potionRep = card.potions ? '100' : '';
  const debtRep = card.debt ? `${card.debt.slice(0, -1)}00000` : '';

  return parseInt(`${coinRep}${potionRep}${debtRep}` || '0');
};

export const sortTwoCards = (card1: Card, card2: Card, sortBy: 'cost' | 'name') => {
  const first = (sortBy === 'cost') ? costSortValue(card1) : card1[sortBy];
  const second = (sortBy === 'cost') ? costSortValue(card2) : card2[sortBy];
  if (first < second) {
    return -1;
  } else if (first > second) {
    return 1;
  } else {
    if (card1.name < card2.name) {
      return -1;
    } else if (card1.name > card2.name) {
      return 1;
    }
    return 0;
  }
};

export const arrayIncludesCard = (array: Array<Card>, card: Card): boolean => array.map((obj) => obj.name.toLowerCase()).includes(card.name.toLowerCase());

export const arrayIncludesCardName = (array: Array<Card>, name: string): boolean => array.map((card) => card.name.toLowerCase()).includes(name.toLowerCase());

export const drawCards = (cards: Array<Card>, num: number, predicate?: (card: Card) => boolean): Array<Card> => sample(predicate ? cards.filter((card) => predicate(card)) : cards, num);

export const hasValidExpansion = (card: Card, expansions: Array<Expansion>): boolean => {
  if (ORIGINAL_BASE_CARDS.includes(card.name)) {
    return expansions.includes('Base 1st Edition');
  } else if (BASE_2_CARDS.includes(card.name)) {
    return expansions.includes('Base');
  } else if (card.expansion === 'Base') {
    return expansions.includes('Base') || expansions.includes('Base 1st Edition');
  } else if (ORIGINAL_INTRIGUE_CARDS.includes(card.name)) {
    return expansions.includes('Intrigue 1st Edition');
  } else if (INTRIGUE_2_CARDS.includes(card.name)) {
    return expansions.includes('Intrigue');
  } else if (card.expansion === 'Intrigue') {
    return expansions.includes('Intrigue') || expansions.includes('Intrigue 1st Edition');
  } else {
    return expansions.includes(card.expansion);
  }
};

export const sortStrings = (a: string, b: string): number => {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }

  return 0;
};
