import { EXPANSIONS, PROMOS, TYPES } from "./constants";

export type Expansion = (typeof EXPANSIONS)[number] | "Promo";

export type CardType = (typeof TYPES)[number];

export type Promo = (typeof PROMOS)[number];

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
  key: string;
}

export type SortCardsBy = "cost" | "name" | "expansion";

export type Page = "generate" | "settings" | "browse";
