import { IconButton } from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { toggleLockCard, toggleLockLandscape } from 'state';
import { Card, isLandscape } from 'lib';
import { FC } from 'react';
import { useAppDispatch } from 'hooks';

export interface LockCardButtonProps {
  card: Card;
}

export const LockCardButton: FC<LockCardButtonProps> = ({ card }) => {
  const dispatch = useAppDispatch();

  const lock = () => {
    if (isLandscape(card)) {
      dispatch(toggleLockLandscape({ name: card.name, locked: card.locked }));
    } else {
      dispatch(toggleLockCard({ name: card.name, locked: card.locked }));
    }
  };

  return (
    <IconButton
      aria-label={card.locked ? 'Unlock card' : 'Lock card'}
      colorScheme={card.locked ? 'green' : 'blue'}
      icon={card.locked ? <LockIcon/> : <UnlockIcon/>}
      onClick={lock}
    />
  );
};
