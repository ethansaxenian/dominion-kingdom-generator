import { useEffect, useState } from 'react';
import KingdomDisplay from './KingdomDisplay';
import { Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { generateBlackMarket, generateKingdom, swapCard, swapLandscape } from 'lib/kingdom-utils';
import { hasValidExpansion } from 'lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContext } from 'context';
import { setKingdom, setLandscapes, setUsePlatinumColony, setUseShelters, unlockCard, unlockLandscape } from 'redux/kingdomSlice';

export default function KingdomGenerator() {
  const [alert, setAlert] = useState('');

  const { blacklist, whitelist, expansions, promos } = useSelector((state) => state.settings);
  const { kingdom, landscapes } = useSelector((state) => state.kingdom);
  const { cards } = useAppContext();

  const dispatch = useDispatch();

  const pool = cards.filter((card) => !blacklist.includes(card.name) && (hasValidExpansion(card, expansions) || promos.includes(card.name)));

  const alertToast = useToast();

  useEffect(() => {
    if (alert !== '') {
      alertToast({
        title: alert,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      setAlert('');
    }
  }, [alert]);

  const _generateKingdom = () => {
    const { newKingdom, newLandscapes, alertText, usePC, useSh } = generateKingdom(pool, expansions, promos, kingdom, landscapes, whitelist);
    if (alertText !== '') {
      setAlert(alertText);
      return
    }
    dispatch(setKingdom(newKingdom));
    dispatch(setLandscapes(newLandscapes));
    dispatch(setUsePlatinumColony(usePC));
    dispatch(setUseShelters(useSh));
  }

  const _swapCard = (oldCard) => {
    dispatch(unlockCard(oldCard.name))
    const { newKingdom, newLandscapes, alertText } = swapCard(oldCard, kingdom, landscapes, pool, expansions, promos)
    if (alertText !== '') {
      setAlert(alertText);
      return
    }
    dispatch(setKingdom(newKingdom));
    dispatch(setLandscapes(newLandscapes));
  }

  const _swapLandscape = (oldCard) => {
    dispatch(unlockLandscape(oldCard.name));
    const { newKingdom, newLandscapes, alertText } = swapLandscape(oldCard, kingdom, landscapes, pool, expansions, promos);
    if (alertText !== '') {
      setAlert(alertText);
      return
    }
    dispatch(setKingdom(newKingdom));
    dispatch(setLandscapes(newLandscapes));
  }

  const swap = (oldCard, type) => {
    if (type === 'card') {
      _swapCard(oldCard);
    }
    if (type === 'landscape') {
      _swapLandscape(oldCard);
    }
  }

  const blackMarketOptions = generateBlackMarket(pool, kingdom, promos, expansions);

  return (
    <>
      <VStack w="100%" py="20px" spacing="20px">
        <HStack spacing="20px" alignItems="top">
          <Text fontWeight="bold" w="fit-content" whiteSpace="nowrap">Available pool:</Text>
          <Text>{expansions.concat(promos).join(', ') || 'None'}</Text>
        </HStack>
        <Button
          colorScheme="green"
          onClick={() => _generateKingdom()}
          size="lg"
          w="fit-content"
        >
          Generate Kingdom!
        </Button>
      </VStack>
      <KingdomDisplay
        kingdom={kingdom}
        landscapes={landscapes}
        swapCard={swap}
        blackMarketOptions={blackMarketOptions}
      />
    </>
  )
}
