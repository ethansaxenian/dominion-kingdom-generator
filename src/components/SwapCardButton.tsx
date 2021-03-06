import { IconButton } from '@chakra-ui/react';
import { useAppDispatch, useCardPool, useKingdom, useSettings } from 'hooks';
import {
  Card,
  arrayIncludesCard,
  drawCards,
  generateBlackMarket,
  hasValidExpansion,
  isLandscape,
  swapCard,
  swapLandscape,
} from 'lib';
import { FC, useMemo } from 'react';
import { VscArrowSwap } from 'react-icons/vsc';
import {
  setAlert,
  setBlackMarket,
  setKingdom,
  setLandscapes,
  unlockCard,
  unlockLandscape,
} from 'state';

export interface SwapCardButtonProps {
  card: Card;
  isBlackMarket?: boolean;
}

export const SwapCardButton: FC<SwapCardButtonProps> = ({
  card,
  isBlackMarket,
}) => {
  const { blacklist, expansions, promos } = useSettings();
  const { kingdom, landscapes, blackMarket } = useKingdom();
  const cards = useCardPool();

  const dispatch = useAppDispatch();

  const pool = useMemo(
    () =>
      cards.filter(
        (card) =>
          !blacklist.includes(card.name) &&
          (hasValidExpansion(card, expansions) || promos.includes(card.name))
      ),
    [cards, blacklist, expansions, promos]
  );

  const _swapCard = (oldCard: Card) => {
    dispatch(unlockCard(oldCard.name));
    const { newKingdom, newLandscapes, alertText } = swapCard(
      oldCard,
      kingdom,
      landscapes,
      pool,
      expansions,
      promos
    );
    if (alertText !== '') {
      dispatch(setAlert(alertText));
    } else if (newKingdom !== undefined && newLandscapes !== undefined) {
      dispatch(setKingdom(newKingdom));
      dispatch(setLandscapes(newLandscapes));
    }
  };

  const _swapLandscape = (oldCard: Card) => {
    dispatch(unlockLandscape(oldCard.name));
    const { newKingdom, newLandscapes, alertText } = swapLandscape(
      oldCard,
      kingdom,
      landscapes,
      pool,
      expansions,
      promos
    );
    if (alertText !== '') {
      dispatch(setAlert(alertText));
    } else if (newKingdom !== undefined && newLandscapes !== undefined) {
      dispatch(setKingdom(newKingdom));
      dispatch(setLandscapes(newLandscapes));
    }
  };

  const _swapBMCard = (oldCard: Card) => {
    const blackMarketOptions = generateBlackMarket(
      pool,
      kingdom,
      promos,
      expansions
    );
    const newOptions = blackMarketOptions.filter(
      (card) => !arrayIncludesCard(blackMarket, card)
    );
    if (newOptions.length > 0) {
      const newBMDeck = blackMarket.filter(
        (card) => card.name !== oldCard.name
      );
      const [newCard] = drawCards(newOptions, 1);
      dispatch(setBlackMarket([...newBMDeck, newCard]));
    }
  };

  const swap = () => {
    if (isBlackMarket) {
      _swapBMCard(card);
    } else if (isLandscape(card)) {
      _swapLandscape(card);
    } else {
      _swapCard(card);
    }
  };

  return (
    <IconButton
      aria-label="Swap card"
      colorScheme="red"
      icon={<VscArrowSwap />}
      onClick={swap}
    />
  );
};
