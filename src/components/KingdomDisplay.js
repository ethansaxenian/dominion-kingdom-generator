import _ from 'lodash';
import { min } from 'mathjs';
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { arrayIncludesCard, arrayIncludesCardName, drawCards, sortTwoCards } from '../lib/utils';
import CardsDisplay from './CardsDisplay';
import PropTypes from 'prop-types';
import { cardType } from '../lib/types';
import styles from '../styles/KingdomDisplay.module.css';

export default function KingdomDisplay({ kingdom, landscapes, swapCard, swapLandscape, usePlatinumColony, platinumColony, blackMarketOptions }) {
	const [blackMarketDeck, setBlackMarketDeck] = useState([]);

	useEffect(() => {
		if (!arrayIncludesCardName(kingdom, 'Black Market')) {
			setBlackMarketDeck([]);
		}
	}, [kingdom]);

	const generateBlackMarketDeck = () => {
		setBlackMarketDeck(_.sampleSize(blackMarketOptions, min(blackMarketOptions.length, 60)));
	}

	const swapBMCard = (oldCard) => {
		const newOptions = blackMarketOptions.filter((card) => !arrayIncludesCard(blackMarketDeck, card));
		if (newOptions.length > 0) {
			const newBMDeck = blackMarketDeck.filter((card) => card.name !== oldCard.name);
			const [newCard] = drawCards(newOptions, 1);
			setBlackMarketDeck([...newBMDeck, newCard]);
		}
	}

	const [wotm] = kingdom.filter((card) => card.wotm);
	const supply = kingdom.filter((card) => card !== wotm);

	return (
		<>
			<CardsDisplay data={supply.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))} swapCard={swapCard} cardWidth={170}/>
			<Row>
				{(landscapes.length > 0) && (
					<Col>
						<CardsDisplay data={landscapes.sort((card1, card2) => sortTwoCards(card1, card2, 'name'))} swapCard={swapLandscape} cardWidth={300}/>
					</Col>
				)}
				{usePlatinumColony && (
					<Col>
						<CardsDisplay data={platinumColony} cardWidth={150}/>
					</Col>
				)}
				{wotm && (
					<Col>
						<CardsDisplay data={[wotm]} swapCard={swapCard} cardWidth={150}/>
					</Col>
				)}
			</Row>
			{arrayIncludesCardName(kingdom, 'Black Market') && (
				<div className={styles.blackMarketDisplay}>
					<Button onClick={() => generateBlackMarketDeck()}>Generate Black Market Deck</Button>
					{(blackMarketDeck.length > 0) && (
						<div className={styles.blackMarketCardsDisplay}>
							<CardsDisplay
								data={blackMarketDeck.sort((card1, card2) => sortTwoCards(card1, card2, 'expansion'))}
								swapCard={swapBMCard}
								cardWidth={170}
							/>
						</div>
					)}
				</div>
			)}
		</>
	)
}


KingdomDisplay.propTypes = {
	kingdom: PropTypes.arrayOf(cardType).isRequired,
	landscapes: PropTypes.arrayOf(cardType).isRequired,
	swapCard: PropTypes.func.isRequired,
	swapLandscape: PropTypes.func.isRequired,
	usePlatinumColony: PropTypes.bool.isRequired,
	platinumColony: PropTypes.arrayOf(cardType).isRequired,
	blackMarketOptions: PropTypes.arrayOf(cardType).isRequired
}
