import data from 'data/dominion_cards.json';
import { useEffect, useState } from 'react';
import CardSearcher from './CardSearcher';
import NavBar from './NavBar';
import KingdomGenerator from './KingdomGenerator';
import KingdomSettings from './KingdomSettings';
import { Container } from '@chakra-ui/react';
import { isLandscape, isValidKingdomCard } from 'lib/utils';

export default function App() {
	const [cards] = useState(data);
	const [page, setPage] = useState('generate');
	const [expansions, setExpansions] = useState([]);
	const [promos, setPromos] = useState([]);
	const [cardPool, setCardPool] = useState([]);
	const [landscapePool, setLandscapePool] = useState([]);

	useEffect(() => {
		if (cards) {
			setCardPool(cards.filter((card) => isValidKingdomCard(card, true)));
			setLandscapePool(cards.filter((card) => isLandscape(card)));
		}
	}, [cards]);



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

	return (
		<Container centerContent maxW="container.xl">
			<NavBar page={page} setPage={setPage}/>
			{(page === 'generate') && (
				<KingdomGenerator
					cardPool={cardPool}
					landscapePool={landscapePool}
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
				/>
			)}
			{(page === 'browse') && <CardSearcher cards={cards}/>}
		</Container>
	);
}
