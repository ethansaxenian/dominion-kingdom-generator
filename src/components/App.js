import { useEffect, useState } from 'react';
import CardSearcher from './CardSearcher';
import NavBar from './NavBar';
import KingdomGenerator from './KingdomGenerator';
import KingdomSettings from './KingdomSettings';
import { Container } from '@chakra-ui/react';
import { hasValidExpansion, sortStrings } from 'lib/utils';
import { useAppContext } from 'context.js';
import analytics from 'analytics';

export default function App() {
  const { cards } = useAppContext();

  const [page, setPage] = useState('generate');
  const [expansions, setExpansions] = useState(['Base']);
  const [promos, setPromos] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [whitelist, setWhitelist] = useState([]);

  useEffect(() => {
    analytics();
  }, []);

  const toggle = (name, type) => {
    if (type === 'expansion') {
      if (expansions.includes(name)) {
        setExpansions(expansions.filter((exp) => exp !== name));
      } else {
        setExpansions([...expansions, name].sort());
      }
    }

    if (type === 'promo') {
      if (promos.includes(name)) {
        setPromos(promos.filter((promo) => promo !== name));
      } else {
        setPromos([...promos, name].sort(sortStrings));
      }
    }
  }

  const pool = cards.filter((card) => !blacklist.includes(card.name) && (hasValidExpansion(card, expansions) || promos.includes(card.name)));

  const setList = (value, type) => {
    if (type === 'blacklist') {
      setBlacklist(value);
    }
    if (type === 'whitelist') {
      setWhitelist(value)
    }
  }

  return (
    <Container centerContent maxW="container.xl">
      <NavBar page={page} setPage={setPage}/>
      {(page === 'generate') && (
        <KingdomGenerator
          pool={pool}
          expansions={expansions}
          promos={promos}
          whitelist={whitelist}
        />
      )}
      {(page === 'settings') && (
        <KingdomSettings
          expansions={expansions}
          promos={promos}
          toggle={toggle}
          blacklist={blacklist}
          whitelist={whitelist}
          setList={setList}
        />
      )}
      {(page === 'browse') && <CardSearcher/>}
    </Container>
  );
}
