import { BASIC_CARDS, SECONDARY_CARDS } from './constants';
import { arrayIncludesCard, arrayIncludesCardName, drawCards, hasValidExpansion, isLandscape, isValidKingdomCard, sample } from './utils';

export const getAvailableCards = (pool, expansions, promos) => {
	return pool.filter((card) => isValidKingdomCard(card, true) && (hasValidExpansion(card, expansions) || promos.includes(card.name)));
}

export const getAvailableLandscapes = (pool, expansions, promos) => {
	return pool.filter((card) => isLandscape(card) && (hasValidExpansion(card, expansions) || promos.includes(card.name)));
}

export const youngWitchPredicate = (card) => ((card.coins === 2) || (card.coins === 3)) && !card.potions && !card.debt;

export const addExtraCards = (kingdom, landscapes, availableCards) => {
	const newCards = [];
	if (arrayIncludesCardName(kingdom, 'Young Witch') && kingdom.every((card) => !card.bane)) {
		const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(kingdom, card));
		const [bane] = drawCards(notInKingdom, 1, youngWitchPredicate);
		if (bane) {
			newCards.push({...bane, bane: true});
		}
	}
	if (arrayIncludesCardName(landscapes, 'Way of the Mouse') && kingdom.every((card) => !card.wotm)) {
		const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(kingdom, card) && card.types.includes('Action'));
		const [wotm] = drawCards(notInKingdom, 1, youngWitchPredicate);
		if (wotm) {
			newCards.push({...wotm, wotm: true});
		}
	}
	return newCards;
}

export const generateKingdom = (pool, expansions, promos, oldKingdom, oldLandscapes) => {
	const availableCards = getAvailableCards(pool, expansions, promos);
	if (availableCards.length < 10) {
		return { alertText: 'Not enough cards available.' }
	}
	const availableLandscapes = getAvailableLandscapes(pool, expansions, promos);
	const lockedCards = oldKingdom.filter((card) => card.locked);
	const newKingdom = drawCards(availableCards, 10 - lockedCards.length, ((card) => {
		if (arrayIncludesCard(lockedCards, card)) {
			return false;
		}
		return hasValidExpansion(card, expansions) || promos.includes(card.name);
	})).concat(lockedCards);
	const lockedLandscapes = oldLandscapes.filter((card) => card.locked);
	const newLandscapes = drawCards(availableLandscapes, Math.min(2, availableLandscapes.length) - lockedLandscapes.length, ((card) => !card.locked)).concat(lockedLandscapes);
	const leftovers = availableCards.filter((card) => !arrayIncludesCard(newKingdom, card));
	const extraCards = addExtraCards(newKingdom, newLandscapes, leftovers);
	newKingdom.push(...extraCards);
	let usePC = false;
	let useSh = false;
	if (newKingdom.length > 0) {
		const [randomCard1] = sample(newKingdom);
		usePC = randomCard1.expansion === 'Prosperity';
		const [randomCard2] = sample(newKingdom);
		useSh = randomCard2.expansion === 'Dark Ages';
	}
	return { newKingdom, newLandscapes, alertText: '', usePC, useSh }
}

export const swapCard = (oldCard, kingdom, landscapes, pool, expansions, promos) => {
	const remaining = getAvailableCards(pool, expansions, promos).filter((card) => !arrayIncludesCard(kingdom, card));
	if (remaining.length < 10) {
		return { alertText: 'There are no available kingdom cards to swap!' }
	}
	let newKingdom = kingdom.filter((card) => card.name !== oldCard.name);
	if (oldCard.name === 'Young Witch') {
		newKingdom = newKingdom.filter((card) => !card.bane);
	}
	if (!oldCard.bane && !oldCard.wotm) {
		const [newCard] = drawCards(remaining, 1);
		newKingdom.push(newCard);
	}
	const extraCards = addExtraCards(newKingdom, landscapes, remaining);
	newKingdom.push(...extraCards);
	return { newKingdom, alertText: '' }
}

export const swapLandscape = (oldCard, kingdom, landscapes, pool, expansions, promos) => {
	const remaining = getAvailableLandscapes(pool, expansions, promos).filter((card) => !arrayIncludesCard(landscapes, card));
	if (remaining.length < 2) {
		return { alertText: 'There are no available kingdom cards to swap!' }
	}
	let newLandscapes = landscapes.filter((card) => card.name !== oldCard.name);
	let newKingdom = kingdom;
	if (oldCard.name === 'Way of the Mouse') {
		newKingdom = newKingdom.filter((card) => !card.wotm);
	}
	const [newCard] = drawCards(remaining, 1);
	newLandscapes = [...newLandscapes, newCard];
	const remainingCards = getAvailableCards(pool, expansions, promos).filter((card) => !arrayIncludesCard(newKingdom, card));
	const extraCards = addExtraCards(newKingdom, newLandscapes, remainingCards);
	newKingdom.push(...extraCards);
	return { newKingdom, newLandscapes, alertText: '' }
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
