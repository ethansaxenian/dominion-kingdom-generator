import { BASIC_CARDS, SECONDARY_CARDS, SUPPLY_TYPES } from "./constants";
import type { Card, Expansion, Promo } from "./types";
import {
  arrayIncludesCard,
  arrayIncludesCardName,
  drawCards,
  hasValidExpansion,
  isLandscape,
  isOfType,
  isValidKingdomCard,
  sample,
  sortTwoCards,
} from "./utils";

export const getAvailableCards = (
  pool: Array<Card>,
  expansions: Array<Expansion>,
  promos: Array<Promo>,
  ignore?: Array<string>,
): Array<Card> => {
  return pool.filter(
    (card) =>
      isValidKingdomCard(card, true) &&
      (hasValidExpansion(card, expansions) ||
        promos.includes(card.name as Promo)) &&
      (ignore ? !ignore.includes(card.name) : true),
  );
};

export const getAvailableLandscapes = (
  pool: Array<Card>,
  expansions: Array<Expansion>,
  promos: Array<Promo>,
): Array<Card> => {
  return pool.filter(
    (card) =>
      isLandscape(card) &&
      (hasValidExpansion(card, expansions) ||
        promos.includes(card.name as Promo)),
  );
};

export const youngWitchPredicate = (card: Card): boolean =>
  (card.coins === 2 || card.coins === 3) &&
  !card.potions &&
  !card.debt &&
  isOfType(card, SUPPLY_TYPES);

export interface AddExtraCards {
  extraCards: Array<Card>;
  extraLandscapes: Array<Card>;
}

export const addExtraCards = (
  kingdom: Array<Card>,
  landscapes: Array<Card>,
  availableCards: Array<Card>,
): AddExtraCards => {
  const newCards = [];
  const newLandscapes = [];
  if (
    arrayIncludesCardName(kingdom, "Young Witch") &&
    kingdom.every((card) => !card.bane)
  ) {
    const notInKingdom = availableCards.filter(
      (card) => !arrayIncludesCard(kingdom, card),
    );
    const [bane] = drawCards(notInKingdom, 1, youngWitchPredicate);
    if (bane) {
      newCards.push({ ...bane, bane: true });
    }
  }
  if (
    arrayIncludesCardName(landscapes, "Way of the Mouse") &&
    kingdom.every((card) => !card.wotm)
  ) {
    const notInKingdom = availableCards.filter(
      (card) => !arrayIncludesCard(kingdom, card) && isOfType(card, ["Action"]),
    );
    const [wotm] = drawCards(notInKingdom, 1, youngWitchPredicate);
    if (wotm) {
      newCards.push({ ...wotm, wotm: true });
    }
  }
  if (kingdom.some((card) => isOfType(card, ["Liaison"]))) {
    const allies = landscapes.filter((card) => isOfType(card, ["Ally"]));
    if (allies.length === 0) {
      const notInKingdom = availableCards.filter(
        (card) =>
          !arrayIncludesCard(landscapes, card) && isOfType(card, ["Ally"]),
      );
      const [ally] = drawCards(notInKingdom, 1);
      if (ally) {
        newLandscapes.push(ally);
      }
    }
  }
  return { extraCards: newCards, extraLandscapes: newLandscapes };
};

export interface GenerateKingdom {
  newKingdom?: Array<Card>;
  newLandscapes?: Array<Card>;
  alertText: string;
  usePC?: boolean;
  useSh?: boolean;
}

export const generateKingdom = (
  pool: Array<Card>,
  expansions: Array<Expansion>,
  promos: Array<Promo>,
  oldKingdom: Array<Card>,
  oldLandscapes: Array<Card>,
  whitelist: Array<string>,
): GenerateKingdom => {
  const availableCards = getAvailableCards(pool, expansions, promos, whitelist);
  if (availableCards.length < 10) {
    return { alertText: "Not enough cards available." };
  }
  const availableLandscapes = getAvailableLandscapes(pool, expansions, promos);
  const lockedCards = oldKingdom.filter((card) => card.locked);
  const lockedLandscapes = oldLandscapes.filter((card) => card.locked);

  const filteredWhitelist = pool.filter(
    (card) =>
      whitelist.includes(card.name) &&
      !lockedCards.map(({ name }) => name).includes(card.name) &&
      !lockedLandscapes.map(({ name }) => name).includes(card.name),
  );
  const whitelistedCards = filteredWhitelist.filter(
    (card) => !isLandscape(card),
  );
  const whitelistedLandscapes = filteredWhitelist.filter((card) =>
    isLandscape(card),
  );

  const newKingdom = drawCards(
    availableCards,
    10 - lockedCards.length - whitelistedCards.length,
    (card) => {
      if (arrayIncludesCard(lockedCards, card)) {
        return false;
      }
      return (
        hasValidExpansion(card, expansions) ||
        promos.includes(card.name as Promo)
      );
    },
  )
    .concat(lockedCards)
    .concat(whitelistedCards.map((card) => ({ ...card, locked: true })));

  let newLandscapes = drawCards(
    availableLandscapes,
    Math.min(2, availableLandscapes.length) -
      lockedLandscapes.length -
      whitelistedLandscapes.length,
    (card) => {
      if (arrayIncludesCard(lockedLandscapes, card)) {
        return false;
      }
      if (isOfType(card, ["Ally"])) {
        return false;
      }
      return (
        hasValidExpansion(card, expansions) ||
        promos.includes(card.name as Promo)
      );
    },
  )
    .concat(lockedLandscapes)
    .concat(whitelistedLandscapes.map((card) => ({ ...card, locked: true })))
    .filter((obj) => obj !== undefined);

  const leftovers = [...availableCards, ...availableLandscapes].filter(
    (card) => !arrayIncludesCard([...newKingdom, ...newLandscapes], card),
  );
  const { extraCards, extraLandscapes } = addExtraCards(
    newKingdom,
    newLandscapes,
    leftovers,
  );
  newKingdom.push(...extraCards);
  newLandscapes.push(...extraLandscapes);
  let usePC = false;
  let useSh = false;
  if (newKingdom.length > 0) {
    const [randomCard1] = sample(newKingdom);
    usePC = randomCard1.expansion === "Prosperity";
    const [randomCard2] = sample(newKingdom);
    useSh = randomCard2.expansion === "Dark Ages";
  }
  if (!newKingdom.some((card) => isOfType(card, ["Liaison"]))) {
    newLandscapes = newLandscapes.filter((card) => !isOfType(card, ["Ally"]));
  }
  // Sort kingdom by cost and landscapes by name initially
  newKingdom.sort((card1, card2) => sortTwoCards(card1, card2, "cost"));
  newLandscapes.sort((card1, card2) => sortTwoCards(card1, card2, "name"));
  return { newKingdom, newLandscapes, alertText: "", usePC, useSh };
};

export interface SwapCard {
  newKingdom?: Array<Card>;
  newLandscapes?: Array<Card>;
  alertText: string;
}

export const swapCard = (
  oldCard: Card,
  kingdom: Array<Card>,
  landscapes: Array<Card>,
  pool: Array<Card>,
  expansions: Array<Expansion>,
  promos: Array<Promo>,
) => {
  const remainingCards = getAvailableCards(pool, expansions, promos).filter(
    (card) => !arrayIncludesCard(kingdom, card),
  );

  if (remainingCards.length < 10) {
    return { alertText: "There are no available kingdom cards to swap!" };
  }

  let newKingdom = kingdom.filter((card) => card.name !== oldCard.name);
  if (oldCard.name === "Young Witch") {
    newKingdom = newKingdom.filter((card) => !card.bane);
  }
  if (!oldCard.bane && !oldCard.wotm) {
    const [newCard] = drawCards(remainingCards, 1);

    const oldCardIndex = kingdom.findIndex(
      (card) => card.name === oldCard.name,
    );

    if (oldCardIndex >= 0) {
      newKingdom.splice(oldCardIndex, 0, newCard);
    } else {
      newKingdom.push(newCard);
    }
  }
  const remainingLanscapes = getAvailableLandscapes(
    pool,
    expansions,
    promos,
  ).filter((card) => !arrayIncludesCard(landscapes, card));
  const { extraCards, extraLandscapes } = addExtraCards(
    newKingdom,
    landscapes,
    [...remainingCards, ...remainingLanscapes],
  );
  newKingdom.push(...extraCards);
  let newLandscapes = [...landscapes, ...extraLandscapes];
  if (!newKingdom.some((card) => isOfType(card, ["Liaison"]))) {
    newLandscapes = newLandscapes.filter((card) => !isOfType(card, ["Ally"]));
  }
  return { newKingdom, newLandscapes, alertText: "" };
};

export const swapLandscape = (
  oldCard: Card,
  kingdom: Array<Card>,
  landscapes: Array<Card>,
  pool: Array<Card>,
  expansions: Array<Expansion>,
  promos: Array<Promo>,
): SwapCard => {
  let remaining = getAvailableLandscapes(pool, expansions, promos).filter(
    (card) => !arrayIncludesCard(landscapes, card),
  );
  if (isOfType(oldCard, ["Ally"])) {
    remaining = remaining.filter((card) => isOfType(card, ["Ally"]));
  } else {
    remaining = remaining.filter((card) => !isOfType(card, ["Ally"]));
  }
  if (remaining.length < 2) {
    return { alertText: "There are no available kingdom cards to swap!" };
  }
  let newLandscapes = landscapes.filter((card) => card.name !== oldCard.name);
  let newKingdom = [...kingdom];
  if (oldCard.name === "Way of the Mouse") {
    newKingdom = newKingdom.filter((card) => !card.wotm);
  }
  const [newCard] = drawCards(remaining, 1);
  const oldCardIndex = landscapes.findIndex(
    (card) => card.name === oldCard.name,
  );
  if (oldCardIndex >= 0) {
    newLandscapes.splice(oldCardIndex, 0, newCard);
  } else {
    newLandscapes.push(newCard);
  }
  const remainingCards = getAvailableCards(pool, expansions, promos).filter(
    (card) => !arrayIncludesCard(newKingdom, card),
  );
  const { extraCards } = addExtraCards(
    newKingdom,
    newLandscapes,
    remainingCards,
  );
  newKingdom.push(...extraCards);
  return { newKingdom, newLandscapes, alertText: "" };
};

export const generateBlackMarket = (
  cards: Array<Card>,
  kingdom: Array<Card>,
  promos: Array<Promo>,
  expansions: Array<Expansion>,
): Array<Card> => {
  if (!arrayIncludesCardName(kingdom, "Black Market")) {
    return [];
  }
  const blackMarketOptions = cards.filter(
    (card) =>
      isValidKingdomCard(card, false) &&
      (hasValidExpansion(card, expansions) ||
        promos.includes(card.name as Promo)) &&
      ![...BASIC_CARDS, ...SECONDARY_CARDS].includes(card.name) &&
      !arrayIncludesCard(kingdom, card),
  );
  if (!kingdom.some((card) => card.potions)) {
    return blackMarketOptions.filter((card) => !card.potions);
  }
  return blackMarketOptions;
};
