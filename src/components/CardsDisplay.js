import PropTypes from 'prop-types';
import { cardType } from 'lib/types';
import Card from './Card';
import { Wrap, WrapItem } from '@chakra-ui/react';

export default function CardsDisplay({ data, swapCard, hasWikiLink }) {

	return (
		<Wrap spacing="20px" p="10px" justify="center">
			{data.map((card) => (
				<WrapItem key={card.name}>
					<Card card={card} swapCard={swapCard} hasWikiLink={hasWikiLink}/>
				</WrapItem>
			))}
		</Wrap>
	)
}

CardsDisplay.propTypes = {
	data: PropTypes.arrayOf(cardType).isRequired,
	swapCard: PropTypes.func,
	hasWikiLink: PropTypes.bool.isRequired
}
