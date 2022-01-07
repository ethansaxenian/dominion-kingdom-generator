import { useContext, useState } from 'react';
import CardSearcher from './CardSearcher';
import NavBar from './NavBar';
import KingdomGenerator from './KingdomGenerator';
import KingdomSettings from './KingdomSettings';
import { Container } from '@chakra-ui/react';
import { hasValidExpansion, sortStrings } from 'lib/utils';
import { Context } from '../context.js';

export default function App() {
	const { cards } = useContext(Context);

	const [page, setPage] = useState('generate');
	const [expansions, setExpansions] = useState(['Base']);
	const [promos, setPromos] = useState([]);
	const [blacklist, setBlacklist] = useState([]);

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

	return (
		<Container centerContent maxW="container.xl">
			<NavBar page={page} setPage={setPage}/>
			{(page === 'generate') && (
				<KingdomGenerator
					pool={pool}
					expansions={expansions}
					promos={promos}
				/>
			)}
			{(page === 'settings') && (
				<KingdomSettings
					expansions={expansions}
					promos={promos}
					toggle={toggle}
					blacklist={blacklist}
					setBlacklist={setBlacklist}
				/>
			)}
			{(page === 'browse') && <CardSearcher/>}
		</Container>
	);
}
