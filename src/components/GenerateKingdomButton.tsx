import { Button } from '@chakra-ui/react';
import { useAppDispatch, useCardPool, useKingdom, useSettings } from 'hooks';
import { Promo, generateKingdom, hasValidExpansion } from 'lib';
import { setAlert, setKingdom, setLandscapes, setUsePlatinumColony, setUseShelters } from 'state';

export const GenerateKingdomButton = () => {
  const { blacklist, whitelist, expansions, promos } = useSettings();
  const { kingdom, landscapes } = useKingdom();
  const cards = useCardPool();

  const dispatch = useAppDispatch();

  const pool = cards.filter((card) => !blacklist.includes(card.name) && (hasValidExpansion(card, expansions) || promos.includes(card.name as Promo)));

  const _generateKingdom = () => {
    const { newKingdom, newLandscapes, alertText, usePC, useSh } = generateKingdom(pool, expansions, promos, kingdom, landscapes, whitelist);
    if (alertText !== '') {
      dispatch(setAlert(alertText));
    } else if (
      newKingdom !== undefined
      && newLandscapes !== undefined
      && usePC !== undefined
      && useSh !== undefined
    ) {
      dispatch(setKingdom(newKingdom));
      dispatch(setLandscapes(newLandscapes));
      dispatch(setUsePlatinumColony(usePC));
      dispatch(setUseShelters(useSh));
    }

  };


  return (
    <Button
      colorScheme="green"
      onClick={() => _generateKingdom()}
      size="lg"
      w="fit-content"
    >
      Generate Kingdom!
    </Button>
  );
};
