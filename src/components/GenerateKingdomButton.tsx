import { Button } from '@chakra-ui/react';
import { useAppContext } from 'context';
import { Promo, generateKingdom, hasValidExpansion } from 'lib';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAlert, setKingdom, setLandscapes, setUsePlatinumColony, setUseShelters } from 'state';

export const GenerateKingdomButton = () => {
  const { blacklist, whitelist, expansions, promos } = useSelector((state: RootState) => state.settings);
  const { kingdom, landscapes } = useSelector((state: RootState) => state.kingdom);
  const { cards } = useAppContext();

  const dispatch = useDispatch();

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
