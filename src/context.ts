import { Card } from 'lib';
import { createContext, useContext } from 'react';

interface AppContextData {
  cards: Array<Card>;
}

export const AppContext = createContext<AppContextData>({ cards: [] });

export const useAppContext = (): AppContextData => useContext<AppContextData>(AppContext);
