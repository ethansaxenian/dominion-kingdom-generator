import data from 'data/dominion_cards.json';
import { useState } from 'react';
import CardSearcher from './CardSearcher';
import NavBar from './NavBar';
import KingdomGenerator from './KingdomGenerator';
import KingdomSettings from './KingdomSettings';
import { Container } from '@chakra-ui/react';
import { hasValidExpansion } from 'lib/utils';

export default function App() {
	const [cards] = useState(data);
	const [page, setPage] = useState('generate');
	const [expansions, setExpansions] = useState(['Base']);
	const [promos, setPromos] = useState([]);
	const [blacklist, setBlacklist] = useState([]);

	const toggleExpansion = (name) => {
		if (expansions.includes(name)) {
			setExpansions(expansions.filter((exp) => exp !== name))
		} else {
			setExpansions([...expansions, name])
		}
	}

	const togglePromo = (name) => {
		if (promos.includes(name)) {
			setPromos(promos.filter((promo) => promo !== name))
		} else {
			setPromos([...promos, name])
		}
	}

	const pool = cards.filter((card) => !blacklist.includes(card.name) && (hasValidExpansion(card, expansions) || promos.includes(card.name)));

	return (
		<Container centerContent maxW="container.xl">
			<NavBar page={page} setPage={setPage}/>
			{(page === 'generate') && (
				<KingdomGenerator
					cards={pool}
					expansions={expansions}
					promos={promos}
				/>
			)}
			{(page === 'settings') && (
				<KingdomSettings
					expansions={expansions}
					promos={promos}
					toggleExpansion={toggleExpansion}
					togglePromo={togglePromo}
					blacklist={blacklist}
					setBlacklist={setBlacklist}
					cards={cards}
				/>
			)}
			{(page === 'browse') && <CardSearcher cards={cards}/>}
		</Container>
	);
}
