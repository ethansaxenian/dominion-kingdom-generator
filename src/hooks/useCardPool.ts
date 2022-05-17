import { Card } from 'lib';
import { useContext } from 'react';
import { AppContext, AppContextData } from 'state';

export const useCardPool = (): Array<Card> => {
  const { cards } = useContext<AppContextData>(AppContext);
  return cards;
};
