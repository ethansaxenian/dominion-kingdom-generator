import { Button } from '@chakra-ui/react';
import { useAppContext } from 'context';
import { generateKingdom } from 'lib/kingdom-utils';
import { hasValidExpansion } from 'lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setKingdom, setLandscapes, setUsePlatinumColony, setUseShelters } from 'redux/kingdomSlice';

export default function GenerateKingdomButton() {
  const { blacklist, whitelist, expansions, promos } = useSelector((state) => state.settings);
  const { kingdom, landscapes } = useSelector((state) => state.kingdom);
  const { cards } = useAppContext();

  const dispatch = useDispatch();

  const pool = cards.filter((card) => !blacklist.includes(card.name) && (hasValidExpansion(card, expansions) || promos.includes(card.name)));

  const _generateKingdom = () => {
    const { newKingdom, newLandscapes, alertText, usePC, useSh } = generateKingdom(pool, expansions, promos, kingdom, landscapes, whitelist);
    if (alertText !== '') {
      dispatch(setAlert(alertText));
      return
    }
    dispatch(setKingdom(newKingdom));
    dispatch(setLandscapes(newLandscapes));
    dispatch(setUsePlatinumColony(usePC));
    dispatch(setUseShelters(useSh));
  }


  return (
    <Button
      colorScheme="green"
      onClick={() => _generateKingdom()}
      size="lg"
      w="fit-content"
    >
      Generate Kingdom!
    </Button>
  )
}
