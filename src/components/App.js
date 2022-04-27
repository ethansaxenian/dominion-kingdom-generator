import { useEffect, useState } from 'react';
import CardSearcher from './CardSearcher';
import NavBar from './NavBar';
import KingdomGenerator from './KingdomGenerator';
import KingdomSettings from './KingdomSettings';
import { Container } from '@chakra-ui/react';
import analytics from 'analytics';

export default function App() {
  const [page, setPage] = useState('generate');

  useEffect(() => {
    analytics();
  }, []);

  return (
    <Container centerContent maxW="container.xl">
      <NavBar page={page} setPage={setPage}/>
      {(page === 'generate') && <KingdomGenerator/>}
      {(page === 'settings') && <KingdomSettings/>}
      {(page === 'browse') && <CardSearcher/>}
    </Container>
  );
}
