import { Button } from "@/components/ui/button";
import { FaLock, FaUnlock } from "react-icons/fa";
import { toggleLockCard, toggleLockLandscape } from "@/state";
import { type Card, isLandscape } from "@/lib";
import type { FC } from "react";
import { useAppDispatch } from "@/hooks";

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
    <Button
      variant="outline"
      size="icon"
      aria-label={card.locked ? "Unlock card" : "Lock card"}
      className={
        card.locked
          ? "bg-green-200 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600 border-green-400 dark:border-green-600"
          : ""
      }
      onClick={lock}
    >
      {card.locked ? (
        <FaLock className="h-4 w-4" />
      ) : (
        <FaUnlock className="h-4 w-4" />
      )}
    </Button>
  );
};
