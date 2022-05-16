import PropTypes from 'prop-types';
import { EXPANSIONS, PROMOS, TYPES } from './constants';

export const expansionType = PropTypes.oneOf([...EXPANSIONS, 'Promo']);

export const cardTypeType = PropTypes.oneOf(TYPES);

export const cardType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  expansion: expansionType.isRequired,
  types: PropTypes.arrayOf(cardTypeType.isRequired).isRequired,
  coins: PropTypes.number,
  potions: PropTypes.string,
  debt: PropTypes.string,
  text: PropTypes.string.isRequired,
  in_supply: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
});

export const promoNameType = PropTypes.oneOf(PROMOS);

export type Expansion = typeof EXPANSIONS[number];

export type CardType = typeof TYPES[number];

export type Promo = typeof PROMOS[number];

export interface Card {
  name: string;
  expansion: Expansion;
  types: Array<CardType>;
  coins?: number;
  potions?: string;
  debt?: string;
  text: string;
  in_supply: boolean;
  img: string;
  link: string;
  locked: boolean;
  bane: boolean;
  wotm: boolean;
}
