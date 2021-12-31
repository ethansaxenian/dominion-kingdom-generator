import data from 'data/dominion_cards.json';
import { useState } from 'react';
import CardSearcher from './CardSearcher';
import NavBar from './NavBar';
import KingdomGenerator from './KingdomGenerator';
import KingdomSettings from './KingdomSettings';
import { Box, Container, Image } from '@chakra-ui/react';

export default function App() {
	const [cards] = useState(data);
	const [page, setPage] = useState('generate');
	const [expansions, setExpansions] = useState([]);
	const [promos, setPromos] = useState([]);

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
			<Image src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" boxSize="65%"/>
			<NavBar page={page} setPage={setPage}/>
			<Box>
				{(page === 'generate') && (
					<KingdomGenerator
						cards={cards}
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
			</Box>
		</Container>
	);
}
