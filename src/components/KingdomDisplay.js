import { useEffect } from 'react';
import { arrayIncludesCard, arrayIncludesCardName, drawCards, isOfType, sample, sortTwoCards } from 'lib/utils';
import CardsDisplay from './CardsDisplay';
import PropTypes from 'prop-types';
import { cardType } from 'lib/types';
import { Button, Stack, VStack } from '@chakra-ui/react';
import { useAppContext } from 'context.js';
import { useSelector, useDispatch } from 'react-redux';
import { setBlackMarket, toggleLockCard, toggleLockLandscape } from 'redux/kingdomSlice';

export default function KingdomDisplay({ kingdom, landscapes, swapCard, blackMarketOptions }) {
  const { cards } = useAppContext();
  const { usePlatinumColony, useShelters, blackMarketDeck } = useSelector((state) => state.kingdom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!arrayIncludesCardName(kingdom, 'Black Market')) {
      dispatch(setBlackMarket([]));
    }
  }, [kingdom]);

  const generateBlackMarketDeck = () => {
    dispatch(setBlackMarket(sample(blackMarketOptions, Math.min(blackMarketOptions.length, 60))));
  }

  const swapBMCard = (oldCard) => {
    const newOptions = blackMarketOptions.filter((card) => !arrayIncludesCard(blackMarketDeck, card));
    if (newOptions.length > 0) {
      const newBMDeck = blackMarketDeck.filter((card) => card.name !== oldCard.name);
      const [newCard] = drawCards(newOptions, 1);
      dispatch(setBlackMarket([...newBMDeck, newCard]));
    }
  }

  const wotm = kingdom.find((card) => card.wotm);
  const supply = kingdom.filter((card) => card !== wotm);

  const platinumColony = cards.filter((card) => card.name === 'Platinum' || card.name === 'Colony');
  const shelters = cards.filter((card) => isOfType(card, ['Shelter']));

  const ally = landscapes.find((card) => isOfType(card, ['Ally']));

  return (
    <>
      <CardsDisplay
        data={supply.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))}
        swapCard={(card) => swapCard(card, 'card')}
        lockCard={({ name, locked }) => dispatch(toggleLockCard({ name, locked }))}
      />
      <Stack direction={{base: 'column', md: 'row'}}>
        {(landscapes.length > 0) && (
          <CardsDisplay
            data={landscapes.filter((card) => !isOfType(card, ['Ally'])).sort((card1, card2) => sortTwoCards(card1, card2, 'name'))}
            swapCard={(card) => swapCard(card, 'landscape')}
            lockCard={({ name, locked }) => dispatch(toggleLockLandscape({ name, locked }))}
          />
        )}
        {wotm && (
          <CardsDisplay data={[wotm]} swapCard={(card) => swapCard(card, 'card')}/>
        )}
        {usePlatinumColony && (
          <CardsDisplay data={platinumColony.sort((a, b) => sortTwoCards(a, b, 'cost'))}/>
        )}
      </Stack>
      {ally && (
        <CardsDisplay data={[ally]} swapCard={(card) => swapCard(card, 'landscape')}/>
      )}
      {useShelters && (
        <CardsDisplay data={shelters.sort((a, b) => sortTwoCards(a, b, 'name'))}/>
      )}
      {arrayIncludesCardName(kingdom, 'Black Market') && (
        <VStack mt="50px">
          <Button
            size="lg"
            colorScheme="blue"
            onClick={() => generateBlackMarketDeck()}
            mb="25px"
          >
            Generate Black Market Deck
          </Button>
          {(blackMarketDeck.length > 0) && (
            <CardsDisplay
              data={blackMarketDeck.sort((card1, card2) => sortTwoCards(card1, card2, 'expansion'))}
              swapCard={(blackMarketOptions.length > 60) ? swapBMCard : undefined}
            />
          )}
        </VStack>
      )}
    </>
  )
}

KingdomDisplay.propTypes = {
  kingdom: PropTypes.arrayOf(cardType).isRequired,
  landscapes: PropTypes.arrayOf(cardType).isRequired,
  swapCard: PropTypes.func.isRequired,
  blackMarketOptions: PropTypes.arrayOf(cardType).isRequired
}
