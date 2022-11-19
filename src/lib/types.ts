import { EXPANSIONS, PROMOS, TYPES } from './constants';

const expansions = [...EXPANSIONS] as const;
const promos = [...PROMOS] as const;
const types = [...TYPES] as const;

export type Expansion = typeof expansions[number] | 'Promo';

export type CardType = typeof types[number];

export type Promo = typeof promos[number];

export interface Card {
  name: string;
  expansion: Expansion;
  types: Array<CardType>;
  coins?: number | null;
  potions?: number | null;
  debt?: number | null;
  text: string;
  in_supply: boolean;
  img_path: string;
  link: string;
  locked: boolean;
  bane: boolean;
  wotm: boolean;
}

export type SortCardsBy = 'cost' | 'name' | 'expansion';

export type Page = 'generate' | 'settings' | 'browse';
