import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useCardPool, useKingdom, useSettings } from "@/hooks";
import { type Promo, generateKingdom, hasValidExpansion } from "@/lib";
import {
  setAlert,
  setKingdom,
  setLandscapes,
  setUsePlatinumColony,
  setUseShelters,
} from "@/state";

export const GenerateKingdomButton = () => {
  const { blacklist, whitelist, expansions, promos } = useSettings();
  const { kingdom, landscapes } = useKingdom();
  const cards = useCardPool();

  const dispatch = useAppDispatch();

  const _generateKingdom = () => {
    const pool = cards.filter(
      (card) =>
        !blacklist.includes(card.name) &&
        (hasValidExpansion(card, expansions) ||
          promos.includes(card.name as Promo)),
    );

    const { newKingdom, newLandscapes, alertText, usePC, useSh } =
      generateKingdom(pool, expansions, promos, kingdom, landscapes, whitelist);

    if (alertText !== "") {
      dispatch(setAlert(alertText));
    } else if (
      newKingdom !== undefined &&
      newLandscapes !== undefined &&
      usePC !== undefined &&
      useSh !== undefined
    ) {
      dispatch(setKingdom(newKingdom));
      dispatch(setLandscapes(newLandscapes));
      dispatch(setUsePlatinumColony(usePC));
      dispatch(setUseShelters(useSh));
    }
  };

  return cards.length === 0 ? (
    <div className="flex justify-center items-center mt-24">
      <Loader2 className="h-12 w-12 animate-spin text-green-500" />
    </div>
  ) : (
    <Button
      variant="default"
      size="lg"
      onClick={() => _generateKingdom()}
      className="bg-green-600 hover:bg-green-700 w-fit"
    >
      Generate Kingdom!
    </Button>
  );
};
