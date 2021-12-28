import '../styles/App.css';
import data from '../data/dominion_cards.json';
import { useState } from 'react';
import CardSearcher from './CardSearcher';
import NavBar from './NavBar';
import KingdomGenerator from './KingdomGenerator';
import { Card } from 'react-bootstrap';
import KingdomSettings from './KingdomSettings';
import _ from 'lodash';
import { EXPANSIONS } from '../lib/constants';
import { useMediaQuery } from 'react-responsive';

export default function App() {
	const [cards] = useState(data);
	const [page, setPage] = useState('generate');
	const [expansions, setExpansions] = useState([]);
	const [promos, setPromos] = useState([]);
	const [expansionAmts] = useState(_.fromPairs(EXPANSIONS.map((name) => [name, ''])));

	const isMobile = useMediaQuery({ maxWidth: 425 });

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
		<div className="App">
			<img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" className="logo"/>
			<Card className={isMobile ? "mobileAppBody" : "appBody"}>
				<Card.Header>
					<NavBar page={page} setPage={setPage}/>
				</Card.Header>
				<Card.Body>
					{(page === 'generate') && (
						<KingdomGenerator
							cards={cards}
							expansions={expansions}
							promos={promos}
							expansionAmts={expansionAmts}
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
				</Card.Body>
			</Card>
		</div>
	);
}
