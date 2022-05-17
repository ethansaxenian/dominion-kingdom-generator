import { useEffect } from 'react';
import { arrayIncludesCardName, isOfType, sortTwoCards } from 'lib';
import { CardsDisplay } from './CardsDisplay';
import { Stack, VStack } from '@chakra-ui/react';
import { setBlackMarket } from 'state';
import { GenerateBlackMarketButton } from './GenerateBlackMarketButton';
import { useAppDispatch, useCardPool, useKingdom } from 'hooks';

export const KingdomDisplay = () => {
  const cards = useCardPool();
  const { usePlatinumColony, useShelters, blackMarket, kingdom, landscapes } = useKingdom();
  const dispatch = useAppDispatch();

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

  const blackMarketDisplay = [...blackMarket].sort((card1, card2) => sortTwoCards(card1, card2, 'name'));

  return (
    <>
      <CardsDisplay data={supply.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))} swap lock/>
      <Stack direction={{ base: 'column', md: 'row' }}>
        {(landscapes.length > 0) && <CardsDisplay data={landscapesWithoutAlly} swap lock/>}
        {wotm && <CardsDisplay data={[wotm]} swap lock={false}/>}
        {usePlatinumColony && <CardsDisplay data={platinumColony} swap={false} lock={false}/>}
      </Stack>
      {ally && <CardsDisplay data={[ally]} swap lock={false}/>}
      {useShelters && <CardsDisplay data={shelters} swap={false} lock={false}/>}
      {arrayIncludesCardName(kingdom, 'Black Market') && (
        <VStack mt="50px">
          <GenerateBlackMarketButton/>
          {(blackMarket.length > 0) && <CardsDisplay data={blackMarketDisplay} swap lock={false} blackMarket/>}
        </VStack>
      )}
    </>
  );
};
