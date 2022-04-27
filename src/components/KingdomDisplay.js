import { useEffect } from 'react';
import { arrayIncludesCardName, isOfType, sortTwoCards } from 'lib/utils';
import CardsDisplay from './CardsDisplay';
import { Stack, VStack } from '@chakra-ui/react';
import { useAppContext } from 'context.js';
import { useSelector, useDispatch } from 'react-redux';
import { setBlackMarket } from 'redux/kingdomSlice';
import GenerateBlackMarketButton from './GenerateBlackMarketButton';

export default function KingdomDisplay() {
  const { cards } = useAppContext();
  const { usePlatinumColony, useShelters, blackMarket, kingdom, landscapes } = useSelector((state) => state.kingdom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!arrayIncludesCardName(kingdom, 'Black Market')) {
      dispatch(setBlackMarket([]));
    }
  }, [kingdom]);

  const wotm = kingdom.find((card) => card.wotm);
  const supply = kingdom.filter((card) => card !== wotm);

  const platinumColony = cards.filter((card) => card.name === 'Platinum' || card.name === 'Colony').sort((a, b) => sortTwoCards(a, b, 'cost'));
  const shelters = cards.filter((card) => isOfType(card, ['Shelter'])).sort((a, b) => sortTwoCards(a, b, 'name'));

  const ally = landscapes.find((card) => isOfType(card, ['Ally']));

  const landscapesWithoutAlly = landscapes.filter((card) => !isOfType(card, ['Ally'])).sort((card1, card2) => sortTwoCards(card1, card2, 'name'));

  const blackMarkeyDisplay = blackMarket.sort((card1, card2) => sortTwoCards(card1, card2, 'expansion'));

  return (
    <>
      <CardsDisplay data={supply.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))} swap lock/>
      <Stack direction={{base: 'column', md: 'row'}}>
        {(landscapes.length > 0) && <CardsDisplay data={landscapesWithoutAlly} swap lock/>}
        {wotm && <CardsDisplay data={[wotm]} swap lock={false}/>}
        {usePlatinumColony && <CardsDisplay data={platinumColony} swap={false} lock={false}/>}
      </Stack>
      {ally && <CardsDisplay data={[ally]} swap lock={false}/>}
      {useShelters && <CardsDisplay data={shelters} swap={false} lock={false}/>}
      {arrayIncludesCardName(kingdom, 'Black Market') && (
        <VStack mt="50px">
          <GenerateBlackMarketButton/>
          {(blackMarket.length > 0) && <CardsDisplay data={blackMarkeyDisplay} swap blackMarket/>}
        </VStack>
      )}
    </>
  )
}
