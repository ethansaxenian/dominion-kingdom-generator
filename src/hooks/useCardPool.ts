import { useConst } from '@chakra-ui/react';
import { Card } from 'lib';
import { useContext } from 'react';
import { AppContext, AppContextData } from 'state';

export const useCardPool = (): Array<Card> => {
  const { cards } = useConst(useContext<AppContextData>(AppContext));
  return cards;
};
