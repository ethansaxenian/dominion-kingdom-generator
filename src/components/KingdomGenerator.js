import { useEffect, useState } from 'react';
import KingdomDisplay from './KingdomDisplay';
import PropTypes from 'prop-types';
import { cardType, expansionType, promoNameType } from 'lib/types';
import { Button, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { generateBlackMarket, generateKingdom, swapCard, swapLandscape } from 'lib/kingdom-utils';
import { isLandscape } from 'lib/utils';

export default function KingdomGenerator({ pool, expansions, promos, whitelist }) {
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
		const { newKingdom, newLandscapes, alertText, usePC, useSh } = generateKingdom(pool, expansions, promos, kingdom, landscapes, whitelist);
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
		const { newKingdom, alertText } = swapCard(oldCard, kingdom, landscapes, pool, expansions, promos)
		if (alertText !== '') {
			setAlert(alertText);
			return
		}
		setKingdom(newKingdom);
	}

	const _swapLandscape = (oldCard) => {
		oldCard.locked = false;
		const { newKingdom, newLandscapes, alertText } = swapLandscape(oldCard, kingdom, landscapes, pool, expansions, promos);
		if (alertText !== '') {
			setAlert(alertText);
			return
		}
		setKingdom(newKingdom);
		setLandScapes(newLandscapes);
	}

	const swap = (oldCard, type) => {
		if (type === 'card') {
			_swapCard(oldCard);
		}
		if (type === 'landscape') {
			_swapLandscape(oldCard);
		}
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
			<VStack w="100%" py="20px" spacing="20px">
				<HStack spacing="20px" alignItems="top">
					<Text fontWeight="bold" w="fit-content" whiteSpace="nowrap">Available pool:</Text>
					<Text>{expansions.concat(promos).join(', ') || 'None'}</Text>
				</HStack>
				<Button
					colorScheme="green"
					onClick={() => _generateKingdom()}
					size="lg"
					w="fit-content"
				>
					Generate Kingdom!
				</Button>
			</VStack>
			<KingdomDisplay
				kingdom={kingdom}
				landscapes={landscapes}
				swapCard={swap}
				lockCard={lockCard}
				usePlatinumColony={usePlatinumColony}
				useShelters={useShelters}
				blackMarketOptions={generateBlackMarket(pool, kingdom, promos, expansions)}
			/>
		</>
	)
}

KingdomGenerator.propTypes = {
	pool: PropTypes.arrayOf(cardType).isRequired,
	expansions: PropTypes.arrayOf(expansionType).isRequired,
	promos: PropTypes.arrayOf(promoNameType).isRequired,
	whitelist: PropTypes.arrayOf(PropTypes.string).isRequired
}
