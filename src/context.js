import { createContext, useContext } from 'react';

export const CardContext = createContext();

export const useCardContext = () => {
	const { cards } = useContext(CardContext);
	return cards;
}
