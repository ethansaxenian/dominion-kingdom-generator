import { CardDisplay } from "./CardDisplay";
import type { Card } from "@/lib";
import type { FC } from "react";

export interface CardsDisplayProps {
  data: Array<Card>;
  swap: boolean;
  lock: boolean;
  blackMarket?: boolean;
}

export const CardsDisplay: FC<CardsDisplayProps> = ({
  data,
  swap,
  lock,
  blackMarket,
}) => {
  return (
    <div className="container max-w-4xl mx-auto p-2">
      <div className="flex flex-wrap gap-5 justify-center">
        {data.map((card) => (
          <CardDisplay
            key={card.name}
            card={card}
            swap={swap}
            lock={lock}
            blackMarket={blackMarket}
          />
        ))}
      </div>
    </div>
  );
};
