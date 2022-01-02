import { BASE_2_CARDS, CARDS_TO_REMOVE, CARD_SHAPED_TYPES, INTRIGUE_2_CARDS, NON_SUPPLY_TYPES, ORIGINAL_BASE_CARDS, ORIGINAL_INTRIGUE_CARDS } from './constants';

export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const sample = (collection, n=1) => {
	const oldCollection = [...collection];
	const elements = [];
	let sampled;
	for (let i = 0; i < n; i++) {
		[sampled] = oldCollection.splice(random(0, oldCollection.length), 1);
		elements.push(sampled);
	}

	return elements;
}

export const capitalize = (words) => {
	return words.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export const isValidKingdomCard = (card, onlyRandomizers) =>
	card.in_supply
  && card.types.every((type) => !NON_SUPPLY_TYPES.includes(type))
  && (onlyRandomizers ? !CARDS_TO_REMOVE.includes(card.name) : true);

export const isLandscape = (card) => card.types.every((type) => CARD_SHAPED_TYPES.includes(type));

export const isOfType = (card, types) => card.types.some((t) => types.includes(t));

export const costSortValue = (card) => {
	const coinRep = card.coins ? card.coins : '';
	const potionRep = card.potions ? '100' : '';
	const debtRep = card.debt ? `${card.debt.slice(0, -1)}00000` : '';

	return parseInt(`${coinRep}${potionRep}${debtRep}` || 0);
}

export const sortTwoCards = (card1, card2, sortBy) => {
	const first = (sortBy === 'cost') ? costSortValue(card1) : card1[sortBy];
	const second = (sortBy === 'cost') ? costSortValue(card2) : card2[sortBy];
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

export const drawCards = (cards, num, predicate) => sample(predicate ? cards.filter((card) => predicate(card)) : cards, num);

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
