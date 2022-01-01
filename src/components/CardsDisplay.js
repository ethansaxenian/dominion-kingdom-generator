import PropTypes from 'prop-types';
import { cardType } from 'lib/types';
import Card from './Card';
import { Wrap, WrapItem } from '@chakra-ui/react';

export default function CardsDisplay({ data, swapCard }) {

	return (
		<Wrap spacing="20px" p="10px" justify="center">
			{data.map((card) => (
				<WrapItem key={card.name}>
					<Card card={card} swapCard={swapCard}/>
				</WrapItem>
			))}
		</Wrap>
	)
}

CardsDisplay.propTypes = {
	data: PropTypes.arrayOf(cardType).isRequired,
	swapCard: PropTypes.func
}
