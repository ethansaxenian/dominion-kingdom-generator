import { BASIC_CARDS, SECONDARY_CARDS } from './constants';
import { arrayIncludesCard, arrayIncludesCardName, drawCards, hasValidExpansion, isLandscape, isOfType, isValidKingdomCard, sample } from './utils';

export const getAvailableCards = (pool, expansions, promos, ignore) => {
  return pool.filter((card) =>
    isValidKingdomCard(card, true)
		&& (hasValidExpansion(card, expansions) || promos.includes(card.name))
		&& (ignore ? !ignore.includes(card.name) : true)
  );
}

export const getAvailableLandscapes = (pool, expansions, promos) => {
  return pool.filter((card) => isLandscape(card) && (hasValidExpansion(card, expansions) || promos.includes(card.name)));
}

export const youngWitchPredicate = (card) => ((card.coins === 2) || (card.coins === 3)) && !card.potions && !card.debt;

export const addExtraCards = (kingdom, landscapes, availableCards) => {
  const newCards = [];
  const newLandscapes = [];
  if (arrayIncludesCardName(kingdom, 'Young Witch') && kingdom.every((card) => !card.bane)) {
    const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(kingdom, card));
    const [bane] = drawCards(notInKingdom, 1, youngWitchPredicate);
    if (bane) {
      newCards.push({...bane, bane: true});
    }
  }
  if (arrayIncludesCardName(landscapes, 'Way of the Mouse') && kingdom.every((card) => !card.wotm)) {
    const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(kingdom, card) && isOfType(card, ['Action']));
    const [wotm] = drawCards(notInKingdom, 1, youngWitchPredicate);
    if (wotm) {
      newCards.push({...wotm, wotm: true});
    }
  }
  if (kingdom.some((card) => isOfType(card, ['Liaison']))) {
    const allies = landscapes.filter((card) => isOfType(card, ['Ally']));
    if (allies.length === 0) {
      const notInKingdom = availableCards.filter((card) => !arrayIncludesCard(landscapes, card) && isOfType(card, ['Ally']));
      const [ally] = drawCards(notInKingdom);
      if (ally) {
        newLandscapes.push(ally);
      }
    }
  }
  return {extraCards: newCards, extraLandscapes: newLandscapes};
}

export const generateKingdom = (pool, expansions, promos, oldKingdom, oldLandscapes, whitelist) => {
  const availableCards = getAvailableCards(pool, expansions, promos, whitelist);
  if (availableCards.length < 10) {
    return { alertText: 'Not enough cards available.' }
  }
  const availableLandscapes = getAvailableLandscapes(pool, expansions, promos);
  const lockedCards = oldKingdom.filter((card) => card.locked);
  const lockedLandscapes = oldLandscapes.filter((card) => card.locked);

  const filteredWhitelist = pool.filter((card) =>
    whitelist.includes(card.name)
		&& !lockedCards.map(({name}) => name).includes(card.name)
		&& !lockedLandscapes.map(({name}) => name).includes(card.name)
  );
  const whitelistedCards = filteredWhitelist.filter((card) => !isLandscape(card));
  const whitelistedLandscapes = filteredWhitelist.filter((card) => isLandscape(card));

  const newKingdom = drawCards(availableCards, 10 - lockedCards.length - whitelistedCards.length, ((card) => {
    if (arrayIncludesCard(lockedCards, card)) {
      return false;
    }
    return hasValidExpansion(card, expansions) || promos.includes(card.name);
  })).concat(lockedCards).concat(whitelistedCards.map((card) => ({...card, locked: true})));

  let newLandscapes = drawCards(
    availableLandscapes,
    Math.min(2, availableLandscapes.length) - lockedLandscapes.length - whitelistedLandscapes.length,
    ((card) => {
      if (arrayIncludesCard(lockedLandscapes, card)) {
        return false;
      }
      if (isOfType(card, ['Ally'])) {
        return false;
      }
      return hasValidExpansion(card, expansions) || promos.includes(card.name);
    })).concat(lockedLandscapes).concat(whitelistedLandscapes.map((card) => ({...card, locked: true}))).filter((obj) => obj !== undefined);

  const leftovers = [...availableCards, ...availableLandscapes].filter((card) => !arrayIncludesCard([...newKingdom, ...newLandscapes], card));
  const {extraCards, extraLandscapes} = addExtraCards(newKingdom, newLandscapes, leftovers);
  newKingdom.push(...extraCards);
  newLandscapes.push(...extraLandscapes);
  let usePC = false;
  let useSh = false;
  if (newKingdom.length > 0) {
    const [randomCard1] = sample(newKingdom);
    usePC = randomCard1.expansion === 'Prosperity';
    const [randomCard2] = sample(newKingdom);
    useSh = randomCard2.expansion === 'Dark Ages';
  }
  if (!newKingdom.some((card) => isOfType(card, ['Liaison']))) {
    newLandscapes = newLandscapes.filter((card) => !isOfType(card, ['Ally']));
  }
  return { newKingdom, newLandscapes, alertText: '', usePC, useSh }
}

export const swapCard = (oldCard, kingdom, landscapes, pool, expansions, promos) => {
  const remainingCards = getAvailableCards(pool, expansions, promos).filter((card) => !arrayIncludesCard(kingdom, card));

  if (remainingCards.length < 10) {
    return { alertText: 'There are no available kingdom cards to swap!' }
  }
  let newKingdom = kingdom.filter((card) => card.name !== oldCard.name);
  if (oldCard.name === 'Young Witch') {
    newKingdom = newKingdom.filter((card) => !card.bane);
  }
  if (!oldCard.bane && !oldCard.wotm) {
    const [newCard] = drawCards(remainingCards, 1);
    newKingdom.push(newCard);
  }
  const remainingLanscapes = getAvailableLandscapes(pool, expansions, promos).filter((card) => !arrayIncludesCard(landscapes, card));
  const {extraCards, extraLandscapes} = addExtraCards(newKingdom, landscapes, [...remainingCards, ...remainingLanscapes]);
  newKingdom.push(...extraCards);
  let newLandscapes = [...landscapes, ...extraLandscapes];
  if (!newKingdom.some((card) => isOfType(card, ['Liaison']))) {
    newLandscapes = newLandscapes.filter((card) => !isOfType(card, ['Ally']));
  }
  return { newKingdom, newLandscapes, alertText: '' }
}

export const swapLandscape = (oldCard, kingdom, landscapes, pool, expansions, promos) => {
  let remaining = getAvailableLandscapes(pool, expansions, promos).filter((card) => !arrayIncludesCard(landscapes, card));
  if (isOfType(oldCard, ['Ally'])) {
    remaining = remaining.filter((card) => isOfType(card, ['Ally']));
  } else {
    remaining = remaining.filter((card) => !isOfType(card, ['Ally']));
  }
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
  const {extraCards} = addExtraCards(newKingdom, newLandscapes, remainingCards);
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
