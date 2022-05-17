import { Card } from 'lib';
import { createContext } from 'react';

export interface AppContextData {
  cards: Array<Card>;
}

export const AppContext = createContext<AppContextData>({ cards: [] });
