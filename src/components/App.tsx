import { useEffect, useState } from 'react';
import { CardSearcher } from './CardSearcher';
import { NavBar } from './NavBar';
import { KingdomGenerator } from './KingdomGenerator';
import { KingdomSettings } from './KingdomSettings';
import { Container } from '@chakra-ui/react';
import { Card, Page } from 'lib';
import { AppContext } from 'state';

export const App = () => {
  const [page, setPage] = useState<Page>('generate');
  const [cardPool, setCardPool] = useState<Array<Card>>([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/dominion_cards.json`);
        const data = await response.json();
        setCardPool(data);
      } catch (e) {
        throw new Error(e as string);
      }
    };

    fetchCardData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        cards: cardPool.map((card) => ({
          ...card,
          wotm: false,
          bane: false,
          locked: false,
        })),
      }}
    >
      <Container centerContent maxW="container.xl">
        <NavBar page={page} setPage={setPage} />
        {page === 'generate' && <KingdomGenerator />}
        {page === 'settings' && <KingdomSettings />}
        {page === 'browse' && <CardSearcher />}
      </Container>
    </AppContext.Provider>
  );
};
