import { Button } from '@chakra-ui/react';
import { useAppContext } from 'context';
import { generateBlackMarket } from 'lib/kingdom-utils';
import { hasValidExpansion, sample } from 'lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setBlackMarket } from 'redux/kingdomSlice';

export default function GenerateBlackMarketButton() {
  const kingdom = useSelector((state) => state.kingdom.kingdom);
  const { blacklist, expansions, promos } = useSelector((state) => state.settings);
  const { cards } = useAppContext();
  const dispatch = useDispatch();

  const generateBlackMarketDeck = () => {
    const pool = cards.filter((card) => !blacklist.includes(card.name) && (hasValidExpansion(card, expansions) || promos.includes(card.name)));
    const blackMarketOptions = generateBlackMarket(pool, kingdom, promos, expansions);
    dispatch(setBlackMarket(sample(blackMarketOptions, Math.min(blackMarketOptions.length, 60))));
  }

  return (
    <Button
      size="lg"
      colorScheme="blue"
      onClick={() => generateBlackMarketDeck()}
      mb="25px"
    >
      Generate Black Market Deck
    </Button>
  )
}
