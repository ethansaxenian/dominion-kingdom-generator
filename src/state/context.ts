import { BaseCard } from 'lib';
import { createContext } from 'react';

export interface AppContextData {
  cards: Array<BaseCard>;
}

export const AppContext = createContext<AppContextData>({ cards: [] });
