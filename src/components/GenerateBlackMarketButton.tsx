import { Button } from "@/components/ui/button";
import { useAppDispatch, useCardPool, useKingdom, useSettings } from "@/hooks";
import {
  type Promo,
  generateBlackMarket,
  hasValidExpansion,
  sample,
} from "@/lib";
import { setBlackMarket } from "@/state";

export const GenerateBlackMarketButton = () => {
  const { kingdom } = useKingdom();
  const { blacklist, expansions, promos } = useSettings();
  const cards = useCardPool();
  const dispatch = useAppDispatch();

  const generateBlackMarketDeck = () => {
    const pool = cards.filter(
      (card) =>
        !blacklist.includes(card.name) &&
        (hasValidExpansion(card, expansions) ||
          promos.includes(card.name as Promo)),
    );
    const blackMarketOptions = generateBlackMarket(
      pool,
      kingdom,
      promos,
      expansions,
    );
    dispatch(
      setBlackMarket(
        sample(blackMarketOptions, Math.min(blackMarketOptions.length, 60)),
      ),
    );
  };

  return (
    <Button
      size="lg"
      className="mb-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
      onClick={() => generateBlackMarketDeck()}
    >
      Generate Black Market Deck
    </Button>
  );
};
