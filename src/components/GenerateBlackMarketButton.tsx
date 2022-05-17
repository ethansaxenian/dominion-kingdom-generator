import { Button } from '@chakra-ui/react';
import { useAppContext } from 'context';
import { Promo, generateBlackMarket, hasValidExpansion, sample } from 'lib';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setBlackMarket } from 'state';


export const GenerateBlackMarketButton = () => {
  const { kingdom } = useSelector((state: RootState) => state.kingdom);
  const { blacklist, expansions, promos } = useSelector((state: RootState) => state.settings);
  const { cards } = useAppContext();
  const dispatch = useDispatch();

  const generateBlackMarketDeck = () => {
    const pool = cards.filter((card) => !blacklist.includes(card.name) && (hasValidExpansion(card, expansions) || promos.includes(card.name as Promo)));
    const blackMarketOptions = generateBlackMarket(pool, kingdom, promos, expansions);
    dispatch(setBlackMarket(sample(blackMarketOptions, Math.min(blackMarketOptions.length, 60))));
  };

  return (
    <Button
      size="lg"
      colorScheme="blue"
      onClick={() => generateBlackMarketDeck()}
      mb="25px"
    >
      Generate Black Market Deck
    </Button>
  );
};
