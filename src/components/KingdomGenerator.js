import { useState } from 'react';
import { addExtraCards, arrayIncludesCard, drawCards, generateBlackMarket, hasValidExpansion, isLandscape, isValidKingdomCard, sample, sortTwoCards } from '../lib/utils';
import { Alert, Button } from 'react-bootstrap';
import KingdomDisplay from './KingdomDisplay';
import PropTypes from 'prop-types';
import { cardType, expansionType, promoNameType } from '../lib/types';
import styles from '../styles/KingdomGenerator.module.css';
import { EXPANSIONS } from '../lib/constants';

export default function KingdomGenerator({ cards, expansions, promos }) {
	const [kingdom, setKingdom] = useState([]);
	const [landscapes, setLandScapes] = useState([]);
	const [usePlatinumColony, setUsePlatinumColony] = useState(false);
	const [alert, setAlert] = useState('');

	const availableCards = cards.filter((card) =>
		isValidKingdomCard(card, true)
    && (hasValidExpansion(card, expansions) || promos.includes(card.name))
	);

	const availableLandscapes = cards.filter((card) =>
		isLandscape(card)
    && (hasValidExpansion(card, expansions) || promos.includes(card.name))
	);

	const remainingCards = availableCards.filter((card) => !arrayIncludesCard(kingdom, card));
	const remainingLandscapes = availableLandscapes.filter((card) => !arrayIncludesCard(landscapes, card));

	const generateKingdom = () => {
		const newKingdom = generateKingdomFromRules();
		if (newKingdom.length < 10) {
			setAlert('You need at least 10 kingdom cards!')
			return
		}
		const newLandscapes = drawCards(availableLandscapes, Math.min(2, availableLandscapes.length));
		const leftovers = availableCards.filter((card) => !arrayIncludesCard(newKingdom, card));
		setKingdom(addExtraCards(newKingdom, newLandscapes, leftovers));
		setLandScapes(newLandscapes);
		if (newKingdom.length > 0) {
			setUsePlatinumColony(sample(newKingdom).expansion === 'Prosperity');
		}
	}

	const generateKingdomFromRules = () => {
		const newCards = [];
		const extraExpansions = [];
		EXPANSIONS.forEach((exp) => {
			if (expansions.includes(exp)) {
				extraExpansions.push(exp);
			}
		});
		const leftovers = availableCards.filter((card) => !arrayIncludesCard(newCards, card));
		return newCards.concat(drawCards(leftovers, 10 - newCards.length, ((card) => (hasValidExpansion(card, extraExpansions) || promos.includes(card.name)))));
	}

	const swapCard = (oldCard) => {
		if (remainingCards.length < 10) {
			setAlert('There are no available kingdom cards to swap!')
			return
		}
		let newKingdom = kingdom.filter((card) => card.name !== oldCard.name);
		if (oldCard.name === 'Young Witch') {
			newKingdom = newKingdom.filter((card) => !card.bane);
		}
		if (!oldCard.bane && !oldCard.wotm) {
			const [newCard] = drawCards(remainingCards, 1);
			newKingdom.push(newCard);
		}
		setKingdom(addExtraCards(newKingdom, landscapes, remainingCards));
	}

	const swapLandscape = (oldCard) => {
		if (remainingLandscapes.length < 10) {
			setAlert('There are no available landscapes to swap!')
			return
		}
		let newLandscapes = landscapes.filter((card) => card.name !== oldCard.name);
		let newKingdom = kingdom;
		if (oldCard.name === 'Way of the Mouse') {
			newKingdom = newKingdom.filter((card) => !card.wotm);
		}
		const [newCard] = drawCards(remainingLandscapes, 1);
		newLandscapes = [...newLandscapes, newCard];
		setLandScapes(newLandscapes);
		setKingdom(addExtraCards(newKingdom, newLandscapes, remainingCards));
	}

	const platinumColony = cards.filter((card) => card.name === 'Platinum' || card.name === 'Colony').sort((a, b) => sortTwoCards(a, b, 'cost'));

	return (
		<>
			<div className={styles.generateButton}>
				<Button variant="success" onClick={() => generateKingdom()} size="lg">Generate Kingdom!</Button>
				<Alert
					variant="danger"
					dismissible
					show={alert !== ''}
					onClose={() => setAlert('')}
					className={styles.generateButtonAlert}
				>
					{alert}
				</Alert>
			</div>
			<KingdomDisplay
				kingdom={kingdom}
				landscapes={landscapes}
				swapCard={swapCard}
				swapLandscape={swapLandscape}
				usePlatinumColony={usePlatinumColony}
				platinumColony={platinumColony}
				blackMarketOptions={generateBlackMarket(cards, kingdom, promos, expansions)}
			/>
		</>
	)
}

KingdomGenerator.propTypes = {
	cards: PropTypes.arrayOf(cardType).isRequired,
	expansions: PropTypes.arrayOf(expansionType).isRequired,
	promos: PropTypes.arrayOf(promoNameType).isRequired
}
