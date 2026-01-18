import { type Card, isLandscape } from "@/lib";
import { SwapCardButton } from "./SwapCardButton";
import { LockCardButton } from "./LockCardButton";
import { useState, type FC } from "react";

export interface CardDisplayProps {
  card: Card;
  swap: boolean;
  lock: boolean;
  blackMarket?: boolean;
}

export const CardDisplay: FC<CardDisplayProps> = ({
  card,
  swap,
  lock,
  blackMarket,
}) => {
  const [showNameFallback, setShowNameFallback] = useState(true);

  const cardWidth = isLandscape(card) ? "18rem" : "11rem";
  const fallbackImg = isLandscape(card)
    ? "card-back-landscape.png"
    : "card-back.png";
  const aspectRatio = isLandscape(card) ? "325/200" : "200/320";

  return (
    <div className="relative rounded-lg" style={{ width: cardWidth }}>
      <div style={{ aspectRatio }}>
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative"
        >
          <img
            src={card.img_path}
            alt={card.name}
            className="w-full border-4 border-black rounded-lg"
            onError={(e) => {
              e.currentTarget.src = `/${fallbackImg}`;
            }}
            onLoad={() => setShowNameFallback(false)}
          />
          {showNameFallback && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="px-2 bg-white/80 rounded-lg text-base font-bold">
                {card.name}
              </span>
            </div>
          )}
        </a>
      </div>
      {swap && (
        <div className="flex py-1 justify-evenly gap-2">
          <SwapCardButton card={card} isBlackMarket={blackMarket} />
          {lock && <LockCardButton card={card} />}
        </div>
      )}
      {swap && (card.bane || card.wotm) && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
          <span className="inline-block px-3 py-1 rounded-full bg-gray-600 text-white text-sm">
            {card.bane ? "Bane Card" : "Way of the Mouse"}
          </span>
        </div>
      )}
    </div>
  );
};
