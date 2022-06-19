import { useEffect, useState } from 'react';
import { CardSearcher } from './CardSearcher';
import { NavBar } from './NavBar';
import { KingdomGenerator } from './KingdomGenerator';
import { KingdomSettings } from './KingdomSettings';
import { Container, Spinner } from '@chakra-ui/react';
import analytics from 'analytics';
import { Card, Page } from 'lib';
import { AppContext } from 'state';

export const App = () => {
  const [page, setPage] = useState<Page>('generate');
  const [cardPool, setCardPool] = useState<Array<Card>>([]);

  useEffect(() => {
    // don't run analytics when testing
    if (process.env.NODE_ENV !== 'test') {
      analytics();
    }

    const fetchCardData = async () => {
      const response = await fetch(
        'https://dominion-card-api.herokuapp.com/api/cards?include-b64=true'
      );
      const data = await response.json();
      setCardPool(data);
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
        {cardPool.length ? (
          <>
            <NavBar page={page} setPage={setPage} />
            {page === 'generate' && <KingdomGenerator />}
            {page === 'settings' && <KingdomSettings />}
            {page === 'browse' && <CardSearcher />}
          </>
        ) : (
          <Spinner size="xl" />
        )}
      </Container>
    </AppContext.Provider>
  );
};
