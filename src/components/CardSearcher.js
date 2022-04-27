import { useState } from 'react';
import { isLandscape, sortTwoCards } from 'lib/utils';
import CardsDisplay from './CardsDisplay';
import SearchBar from './SearchBar';
import { SUPPLY_TYPES } from 'lib/constants';
import { Divider, Heading } from '@chakra-ui/react';
import { useAppContext } from 'context';

export default function CardSearcher() {
  const { cards } = useAppContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [displayed, setDisplayed] = useState(['Supply', 'Non-supply', 'Landscape']);

  const toggleDisplayType = (type) => {
    if (displayed.includes(type)) {
      setDisplayed(displayed.filter((t) => t !== type));
    } else {
      setDisplayed([...displayed, type]);
    }
  }

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
  }).sort((card1, card2) => sortTwoCards(card1, card2, sortBy));

  const inSupply = filteredCards.filter((card) => card.in_supply && card.types.every((type) => SUPPLY_TYPES.includes(type)));

  const notInSupply = filteredCards.filter((card) => !card.in_supply);

  const landscapes = filteredCards.filter((card) => isLandscape(card));

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        displayed={displayed}
        toggleDisplayType={toggleDisplayType}
      />
      {(displayed.includes('Supply') && inSupply.length > 0) && (
        <>
          <Divider my="30px"/>
          <Heading pb="30px">Supply Cards</Heading>
          <CardsDisplay data={inSupply} swap={false} lock={false}/>
        </>
      )}
      {(displayed.includes('Non-supply') && notInSupply.length > 0) && (
        <>
          <Divider my="30px"/>
          <Heading pb="30px">Non-Supply Cards</Heading>
          <CardsDisplay data={notInSupply} swap={false} lock={false}/>
        </>
      )}
      {(displayed.includes('Landscape') && landscapes.length > 0) && (
        <>
          <Divider my="30px"/>
          <Heading pb="30px">Landscapes</Heading>
          <CardsDisplay data={landscapes} swap={false} lock={false}/>
        </>
      )}
    </>
  )
}
