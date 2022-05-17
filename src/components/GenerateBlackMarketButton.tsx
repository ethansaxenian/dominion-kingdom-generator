import { Button } from '@chakra-ui/react';
import { useAppDispatch, useCardPool, useKingdom, useSettings } from 'hooks';
import { Promo, generateBlackMarket, hasValidExpansion, sample } from 'lib';
import { setBlackMarket } from 'state';

export const GenerateBlackMarketButton = () => {
  const { kingdom } = useKingdom();
  const { blacklist, expansions, promos } = useSettings();
  const cards = useCardPool();
  const dispatch = useAppDispatch();

  const generateBlackMarketDeck = () => {
    const pool = cards.filter(
      (card) =>
        !blacklist.includes(card.name) &&
        (hasValidExpansion(card, expansions) ||
          promos.includes(card.name as Promo))
    );
    const blackMarketOptions = generateBlackMarket(
      pool,
      kingdom,
      promos,
      expansions
    );
    dispatch(
      setBlackMarket(
        sample(blackMarketOptions, Math.min(blackMarketOptions.length, 60))
      )
    );
  };

  return (
    <Button
      size="lg"
      colorScheme="blue"
      onClick={() => generateBlackMarketDeck()}
      mb="6"
    >
      Generate Black Market Deck
    </Button>
  );
};
