import { useEffect, useState } from 'react';
import { CardSearcher } from './CardSearcher';
import { NavBar } from './NavBar';
import { KingdomGenerator } from './KingdomGenerator';
import { KingdomSettings } from './KingdomSettings';
import { Container } from '@chakra-ui/react';
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
      try {
        const response = await Promise.all(
          [1, 2, 3, 4].map(
            async (i) =>
              await fetch(
                `https://dominion-api.deta.dev/api/cards?include-b64=true&page=${i}&size=200`
              )
          )
        );
        const data = await Promise.all(response.map((res) => res.json()));
        setCardPool(data.flat());
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
