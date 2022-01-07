import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { cardType } from 'lib/types';

const CardContext = createContext();

export const CardProvider = ({ value, children }) => {
	return (
		<CardContext.Provider value={value}>
			{children}
		</CardContext.Provider>
	)
}

export const useCardContext = () => {
	const { cards } = useContext(CardContext)
	return cards;
}


CardProvider.propTypes = {
	value: PropTypes.shape({
		cards: PropTypes.arrayOf(cardType).isRequired
	}),
	children: PropTypes.element.isRequired
}
