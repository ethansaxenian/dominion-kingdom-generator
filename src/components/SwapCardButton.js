import { IconButton } from '@chakra-ui/react';
import { useAppContext } from 'context';
import { generateBlackMarket, swapCard, swapLandscape } from 'lib/kingdom-utils';
import { cardType } from 'lib/types';
import { arrayIncludesCard, drawCards, hasValidExpansion, isLandscape } from 'lib/utils';
import { VscArrowSwap } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, setBlackMarket, setKingdom, setLandscapes, unlockCard, unlockLandscape } from 'redux/kingdomSlice';
import PropTypes from 'prop-types';

export default function SwapCardButton({ card, isBlackMarket }) {
  const { blacklist, expansions, promos } = useSelector((state) => state.settings);
  const { kingdom, landscapes, blackMarket } = useSelector((state) => state.kingdom);
  const { cards } = useAppContext();

  const dispatch = useDispatch();

  const pool = cards.filter((card) => !blacklist.includes(card.name) && (hasValidExpansion(card, expansions) || promos.includes(card.name)));

  const _swapCard = (oldCard) => {
    dispatch(unlockCard(oldCard.name))
    const { newKingdom, newLandscapes, alertText } = swapCard(oldCard, kingdom, landscapes, pool, expansions, promos)
    if (alertText !== '') {
      dispatch(setAlert(alertText));
      return
    }
    dispatch(setKingdom(newKingdom));
    dispatch(setLandscapes(newLandscapes));
  }

  const _swapLandscape = (oldCard) => {
    dispatch(unlockLandscape(oldCard.name));
    const { newKingdom, newLandscapes, alertText } = swapLandscape(oldCard, kingdom, landscapes, pool, expansions, promos);
    if (alertText !== '') {
      dispatch(setAlert(alertText));
      return
    }
    dispatch(setKingdom(newKingdom));
    dispatch(setLandscapes(newLandscapes));
  }

  const _swapBMCard = (oldCard) => {
    const blackMarketOptions = generateBlackMarket(pool, kingdom, promos, expansions);
    const newOptions = blackMarketOptions.filter((card) => !arrayIncludesCard(blackMarket, card));
    if (newOptions.length > 0) {
      const newBMDeck = blackMarket.filter((card) => card.name !== oldCard.name);
      const [newCard] = drawCards(newOptions, 1);
      dispatch(setBlackMarket([...newBMDeck, newCard]));
    }
  }

  const swap = () => {
    if (isBlackMarket) {
      _swapBMCard(card);
    } else if (isLandscape(card)) {
      _swapLandscape(card);
    } else {
      _swapCard(card);
    }
  }

  return (
    <IconButton
      colorScheme="red"
      icon={<VscArrowSwap/>}
      onClick={swap}
    />
  )
}

SwapCardButton.propTypes = {
  card: cardType.isRequired,
  isBlackMarket: PropTypes.bool
}
