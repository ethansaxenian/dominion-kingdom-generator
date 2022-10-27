import { useMemo, useState } from 'react';
import { SUPPLY_TYPES, SortCardsBy, isLandscape, sortTwoCards } from 'lib';
import { CardsDisplay } from './CardsDisplay';
import { SearchBar } from './SearchBar';
import { Divider, Heading } from '@chakra-ui/react';
import { useCardPool } from 'hooks';

export const CardSearcher = () => {
  const cards = useCardPool();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortCardsBy>('name');
  const [displayed, setDisplayed] = useState([
    'Supply',
    'Non-supply',
    'Landscape',
  ]);

  const filteredCards = useMemo(
    () =>
      cards
        .filter(({ name, expansion, types, coins, potions, debt, text }) => {
          const parsedTerm = searchTerm.toLowerCase();
          return (
            name.toLowerCase().includes(parsedTerm) ||
            expansion.toLowerCase().includes(parsedTerm) ||
            types.some((type) => type.toLowerCase().includes(parsedTerm)) ||
            (coins && coins.toString().includes(parsedTerm)) ||
            (potions && potions.toString().includes(parsedTerm)) ||
            (debt && debt.toString().includes(parsedTerm)) ||
            text.toLowerCase().includes(parsedTerm)
          );
        })
        .sort((card1, card2) => sortTwoCards(card1, card2, sortBy)),
    [searchTerm, sortBy, cards]
  );

  const inSupply = useMemo(
    () =>
      filteredCards.filter(
        (card) =>
          card.in_supply &&
          card.types.every((type) => SUPPLY_TYPES.includes(type))
      ),
    [filteredCards]
  );

  const notInSupply = useMemo(
    () => filteredCards.filter((card) => !card.in_supply && !isLandscape(card)),
    [filteredCards]
  );

  const landscapes = useMemo(
    () => filteredCards.filter((card) => isLandscape(card)),
    [filteredCards]
  );

  const toggleDisplayType = (type: string) => {
    if (displayed.includes(type)) {
      setDisplayed(displayed.filter((t) => t !== type));
    } else {
      setDisplayed([...displayed, type]);
    }
  };

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
      {displayed.includes('Supply') && inSupply.length > 0 && (
        <>
          <Divider my="7" />
          <Heading pb="7">Supply Cards</Heading>
          <CardsDisplay data={inSupply} swap={false} lock={false} />
        </>
      )}
      {displayed.includes('Non-supply') && notInSupply.length > 0 && (
        <>
          <Divider my="7" />
          <Heading pb="7">Non-Supply Cards</Heading>
          <CardsDisplay data={notInSupply} swap={false} lock={false} />
        </>
      )}
      {displayed.includes('Landscape') && landscapes.length > 0 && (
        <>
          <Divider my="7" />
          <Heading pb="7">Landscapes</Heading>
          <CardsDisplay data={landscapes} swap={false} lock={false} />
        </>
      )}
    </>
  );
};
