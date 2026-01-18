import { CardDisplay } from "./CardDisplay";
import { Container, Wrap, WrapItem } from "@chakra-ui/react";
import type { Card } from "lib";
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
    <Container centerContent maxW="container.lg" p="10px">
      <Wrap spacing="5" justify="center">
        {data.map((card) => (
          <WrapItem key={card.name}>
            <CardDisplay
              card={card}
              swap={swap}
              lock={lock}
              blackMarket={blackMarket}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  );
};
