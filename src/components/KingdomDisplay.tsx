import { useEffect, useMemo } from "react";
import { arrayIncludesCardName, isOfType, sortTwoCards } from "@/lib";
import { CardsDisplay } from "./CardsDisplay";
import { setBlackMarket } from "@/state";
import { GenerateBlackMarketButton } from "./GenerateBlackMarketButton";
import { useAppDispatch, useCardPool, useKingdom } from "@/hooks";

export const KingdomDisplay = () => {
  const cards = useCardPool();
  const { usePlatinumColony, useShelters, blackMarket, kingdom, landscapes } =
    useKingdom();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!arrayIncludesCardName(kingdom, "Black Market")) {
      dispatch(setBlackMarket([]));
    }
  }, [kingdom, dispatch]);

  const platinumColony = useMemo(
    () =>
      cards
        .filter((card) => card.name === "Platinum" || card.name === "Colony")
        .sort((a, b) => sortTwoCards(a, b, "cost")),
    [cards],
  );

  const shelters = useMemo(
    () =>
      cards
        .filter((card) => isOfType(card, ["Shelter"]))
        .sort((a, b) => sortTwoCards(a, b, "name")),
    [cards],
  );

  const wotm = useMemo(() => kingdom.find((card) => card.wotm), [kingdom]);
  const supply = useMemo(
    () => kingdom.filter((card) => card !== wotm),
    [kingdom, wotm],
  );

  const ally = useMemo(
    () => landscapes.find((card) => isOfType(card, ["Ally"])),
    [landscapes],
  );

  const landscapesWithoutAlly = useMemo(
    () =>
      landscapes
        .filter((card) => !isOfType(card, ["Ally"]))
        .sort((card1, card2) => sortTwoCards(card1, card2, "name")),
    [landscapes],
  );

  const blackMarketDisplay = useMemo(
    () =>
      [...blackMarket].sort((card1, card2) =>
        sortTwoCards(card1, card2, "name"),
      ),
    [blackMarket],
  );

  return (
    <>
      <CardsDisplay
        data={supply.sort((card1, card2) => sortTwoCards(card1, card2, "cost"))}
        swap
        lock
      />
      <div className="flex flex-col md:flex-row gap-4">
        {landscapes.length > 0 && (
          <CardsDisplay data={landscapesWithoutAlly} swap lock />
        )}
        {wotm && <CardsDisplay data={[wotm]} swap lock={false} />}
        {usePlatinumColony && (
          <CardsDisplay data={platinumColony} swap={false} lock={false} />
        )}
      </div>
      {ally && <CardsDisplay data={[ally]} swap lock={false} />}
      {useShelters && (
        <CardsDisplay data={shelters} swap={false} lock={false} />
      )}
      {arrayIncludesCardName(kingdom, "Black Market") && (
        <div className="flex flex-col items-center mt-12 gap-4">
          <GenerateBlackMarketButton />
          {blackMarket.length > 0 && (
            <CardsDisplay
              data={blackMarketDisplay}
              swap
              lock={false}
              blackMarket
            />
          )}
        </div>
      )}
    </>
  );
};
