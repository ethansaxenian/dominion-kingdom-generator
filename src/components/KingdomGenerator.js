import { isValidKingdomCard } from "../lib/utils";

export default function KingdomGenerator({ cards }) {
  const availableCards = cards.filter((card) => isValidKingdomCard(card));
  return (<></>)
}
