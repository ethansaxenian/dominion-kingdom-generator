import { IconButton } from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { toggleLockCard, toggleLockLandscape } from 'redux/kingdomSlice';
import { isLandscape } from 'lib/utils';
import { cardType } from 'lib/types';

export default function LockCardButton({ card }) {
  const dispatch = useDispatch();

  const lock = () => {
    if (isLandscape(card)) {
      dispatch(toggleLockLandscape({ name: card.name, locked: card.locked }));
    } else {
      dispatch(toggleLockCard({ name: card.name, locked: card.locked }));
    }
  }

  return (
    <IconButton
      colorScheme={card.locked ? 'green' : 'blue'}
      icon={card.locked ? <LockIcon/> : <UnlockIcon/>}
      onClick={lock}
    />
  )
}

LockCardButton.propTypes = {
  card: cardType.isRequired
}
