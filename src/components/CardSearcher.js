import { useState } from "react";
import { sortTwoCards } from "../lib/utils";
import CardsDisplay from "./CardsDisplay";
import SearchBar from "./SearchBar";

export default function CardSearcher({ cards }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredCards = cards.filter(({ name, expansion, types, cost, text }) => {
    const parsedTerm = searchTerm.toLowerCase();
    return ((name.toLowerCase().includes(parsedTerm)
    || expansion.toLowerCase().includes(parsedTerm)
    || types.some((type) => type.toLowerCase().includes(parsedTerm))
    || (cost && (
      (cost.coins && cost.coins.toString().includes(parsedTerm))
      || (cost.potions && cost.potions.includes(parsedTerm))
      || (cost.debt && cost.debt.includes(parsedTerm))
    ))
    || text.toLowerCase().includes(parsedTerm)))
  });

  const sortedCards = filteredCards.sort((card1, card2) => sortTwoCards(card1, card2, sortBy))

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <br/>
      <CardsDisplay data={sortedCards}/>
    </div>
  )
}
