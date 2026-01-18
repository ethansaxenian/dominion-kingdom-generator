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
    <div className="container w-auto md:max-w-6xl mx-auto p-2">
      <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-5 justify-items-center">
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
