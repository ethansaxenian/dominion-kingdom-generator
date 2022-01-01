import { useEffect, useState } from 'react';
import { arrayIncludesCard, arrayIncludesCardName, drawCards, sample, sortTwoCards } from 'lib/utils';
import CardsDisplay from './CardsDisplay';
import PropTypes from 'prop-types';
import { cardType } from 'lib/types';
import { Button, VStack } from '@chakra-ui/react';

export default function KingdomDisplay({ kingdom, landscapes, swapCard, swapLandscape, usePlatinumColony, platinumColony, blackMarketOptions }) {
	const [blackMarketDeck, setBlackMarketDeck] = useState([]);

	useEffect(() => {
		if (!arrayIncludesCardName(kingdom, 'Black Market')) {
			setBlackMarketDeck([]);
		}
	}, [kingdom]);

	const generateBlackMarketDeck = () => {
		setBlackMarketDeck(sample(blackMarketOptions, Math.min(blackMarketOptions.length, 60)));
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
			<CardsDisplay
				data={supply.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))}
				swapCard={swapCard}
				hasWikiLink={false}
			/>
			{(landscapes.length > 0) && (
				<CardsDisplay
					data={landscapes.sort((card1, card2) => sortTwoCards(card1, card2, 'name'))}
					swapCard={swapLandscape}hasWikiLink={false}
				/>
			)}
			{usePlatinumColony && (
				<CardsDisplay data={platinumColony} hasWikiLink={false}/>
			)}
			{wotm && (
				<CardsDisplay data={[wotm]} swapCard={swapCard} hasWikiLink={false}/>
			)}
			{arrayIncludesCardName(kingdom, 'Black Market') && (
				<VStack mt="50px">
					<Button
						size="lg"
						colorScheme="blue"
						onClick={() => generateBlackMarketDeck()}
						mb="25px"
					>
						Generate Black Market Deck
					</Button>
					{(blackMarketDeck.length > 0) && (
						<CardsDisplay
							data={blackMarketDeck.sort((card1, card2) => sortTwoCards(card1, card2, 'expansion'))}
							swapCard={(blackMarketOptions.length > 60) ? swapBMCard : undefined}
							hasWikiLink={false}
						/>
					)}
				</VStack>
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
