import { useState } from "react";
import { SUPPLY_TYPES } from "../lib/constants";
import CardsDisplay from "./CardsDisplay";
import SearchBar from "./SearchBar";

export default function CardSearcher({ cards }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [inSupply, setInSupply] = useState(false);

  const filteredCards = cards.filter(({ name, expansion, types, cost, text, in_supply }) => {
    const parsedTerm = searchTerm.toLowerCase();
    return ((name.toLowerCase().includes(parsedTerm)
    || expansion.toLowerCase().includes(parsedTerm)
    || types.some((type) => type.toLowerCase().includes(parsedTerm))
    || (cost && (
      (cost.coins && cost.coins.toString().includes(parsedTerm))
      || (cost.potions && cost.potions.includes(parsedTerm))
      || (cost.debt && cost.debt.includes(parsedTerm))
    ))
    || text.toLowerCase().includes(parsedTerm))
    && (inSupply ? (in_supply && types.every((type) => SUPPLY_TYPES.map((t) => t.toLowerCase()).includes(type))) : true))
  });

  const sortedCards = filteredCards.sort((m1, m2) => {
    let first = m1[sortBy];
    let second = m2[sortBy];
    if (sortBy === 'cost') {
      first = parseInt(`${m1.coins ? m1.coins : ''}${m1.potions ? 100 : ''}${m1.debt ? m1.debt.slice(0, -1) + '00000' : ''}` || 0)
      second = parseInt(`${m2.coins ? m2.coins : ''}${m2.potions ? 100 : ''}${m2.debt ? m2.debt.slice(0, -1) + '00000' : ''}` || 0)
    }
    if (first < second) {
      return -1;
    } else if (first === second) {
      return 0;
    }
    return 1;
  });

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        inSupply={inSupply}
        setInSupply={setInSupply}
      />
      <br/>
      <CardsDisplay data={sortedCards}/>
    </div>
  )
}
