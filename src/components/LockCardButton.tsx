import { IconButton, Icon } from "@chakra-ui/react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { toggleLockCard, toggleLockLandscape } from "state";
import { type Card, isLandscape } from "lib";
import type { FC } from "react";
import { useAppDispatch } from "hooks";

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
      aria-label={card.locked ? "Unlock card" : "Lock card"}
      colorScheme={card.locked ? "green" : "blue"}
      icon={<Icon as={card.locked ? FaLock : FaUnlock} />}
      onClick={lock}
    />
  );
};
