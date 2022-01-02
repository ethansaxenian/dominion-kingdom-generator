import { useEffect, useState } from 'react';
import { arrayIncludesCard, arrayIncludesCardName, drawCards, isOfType, sample, sortTwoCards } from 'lib/utils';
import CardsDisplay from './CardsDisplay';
import PropTypes from 'prop-types';
import { cardType } from 'lib/types';
import { Button, Stack, VStack } from '@chakra-ui/react';

export default function KingdomDisplay({ kingdom, landscapes, swapCard, swapLandscape, pool, usePlatinumColony, useShelters, blackMarketOptions }) {
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

	const platinumColony = pool.filter((card) => card.name === 'Platinum' || card.name === 'Colony');
	const shelters = pool.filter((card) => isOfType(card, ['Shelter']));

	return (
		<>
			<CardsDisplay
				data={supply.sort((card1, card2) => sortTwoCards(card1, card2, 'cost'))}
				swapCard={swapCard}
			/>

			<Stack direction={{base: 'column', md: 'row'}}>
				{(landscapes.length > 0) && (
					<CardsDisplay
						data={landscapes.sort((card1, card2) => sortTwoCards(card1, card2, 'name'))}
						swapCard={swapLandscape}
					/>
				)}
				{wotm && (
					<CardsDisplay data={[wotm]} swapCard={swapCard}/>
				)}
				{usePlatinumColony && (
					<CardsDisplay data={platinumColony.sort((a, b) => sortTwoCards(a, b, 'cost'))}/>
				)}
			</Stack>

			{useShelters && (
				<CardsDisplay data={shelters.sort((a, b) => sortTwoCards(a, b, 'name'))}/>
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
	pool: PropTypes.arrayOf(cardType).isRequired,
	usePlatinumColony: PropTypes.bool.isRequired,
	useShelters: PropTypes.bool.isRequired,
	blackMarketOptions: PropTypes.arrayOf(cardType).isRequired
}
