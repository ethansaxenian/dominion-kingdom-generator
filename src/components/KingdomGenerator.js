import { useEffect, useState } from 'react';
import KingdomDisplay from './KingdomDisplay';
import PropTypes from 'prop-types';
import { cardType, expansionType, promoNameType } from 'lib/types';
import { Button, Center, useToast } from '@chakra-ui/react';
import { generateBlackMarket, generateKingdom, swapCard, swapLandscape } from 'lib/kingdom-utils';
import { isLandscape } from 'lib/utils';

export default function KingdomGenerator({ cards, expansions, promos }) {
	const [kingdom, setKingdom] = useState([]);
	const [landscapes, setLandScapes] = useState([]);
	const [usePlatinumColony, setUsePlatinumColony] = useState(false);
	const [useShelters, setUseShelters] = useState(false);
	const [alert, setAlert] = useState('');

	const alertToast = useToast();

	useEffect(() => {
		if (alert !== '') {
			alertToast({
				title: alert,
				status: 'error',
				duration: 3000,
				isClosable: true
			});
			setAlert('');
		}
	}, [alert]);

	const _generateKingdom = () => {
		const { newKingdom, newLandscapes, alertText, usePC, useSh } = generateKingdom(cards, expansions, promos, kingdom, landscapes);
		if (alertText !== '') {
			setAlert(alertText);
			return
		}
		setKingdom(newKingdom);
		setLandScapes(newLandscapes);
		setUsePlatinumColony(usePC);
		setUseShelters(useSh);
	}

	const _swapCard = (oldCard) => {
		oldCard.locked = false;
		const { newKingdom, alertText } = swapCard(oldCard, kingdom, landscapes, cards, expansions, promos)
		if (alertText !== '') {
			setAlert(alertText);
			return
		}
		setKingdom(newKingdom);
	}

	const _swapLandscape = (oldCard) => {
		oldCard.locked = false;
		const { newKingdom, newLandscapes, alertText } = swapLandscape(oldCard, kingdom, landscapes, cards, expansions, promos);
		if (alertText !== '') {
			setAlert(alertText);
			return
		}
		setKingdom(newKingdom);
		setLandScapes(newLandscapes);
	}

	const lockCard = (card) => {
		if (isLandscape(card)) {
			setLandScapes(landscapes.map((c) => {
				if (c === card) {
					return {...c, locked: !c.locked}
				} else {
					return c;
				}
			}));
		} else {
			setKingdom(kingdom.map((c) => {
				if (c === card) {
					return {...c, locked: !c.locked}
				} else {
					return c;
				}
			}));
		}
	}

	return (
		<>
			<Center w="100%" py="20px">
				<Button
					colorScheme="green"
					onClick={() => _generateKingdom()}
					size="lg"
					w="fit-content"
				>
					Generate Kingdom!
				</Button>
			</Center>
			<KingdomDisplay
				kingdom={kingdom}
				landscapes={landscapes}
				swapCard={_swapCard}
				swapLandscape={_swapLandscape}
				lockCard={lockCard}
				pool={cards}
				usePlatinumColony={usePlatinumColony}
				useShelters={useShelters}
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
