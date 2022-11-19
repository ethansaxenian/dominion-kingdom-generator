import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Card } from 'lib';

export interface KingdomState {
  kingdom: Array<Card>;
  landscapes: Array<Card>;
  usePlatinumColony: boolean;
  useShelters: boolean;
  blackMarket: Array<Card>;
  alert: string;
  images: {
    [key: string]: string;
  };
}

const initialState: KingdomState = {
  kingdom: [],
  landscapes: [],
  usePlatinumColony: false,
  useShelters: false,
  blackMarket: [],
  alert: '',
  images: {},
};

export interface LockUnlock {
  name: string;
  locked: boolean;
}

export interface EditImgUrl {
  key: string;
  imgUrl: string;
}

export const kingdomSlice = createSlice({
  name: 'kingdom',
  initialState,
  reducers: {
    setKingdom(state: KingdomState, action: PayloadAction<Array<Card>>) {
      state.kingdom = action.payload;
    },
    setLandscapes(state: KingdomState, action: PayloadAction<Array<Card>>) {
      state.landscapes = action.payload;
    },
    setUsePlatinumColony(state: KingdomState, action: PayloadAction<boolean>) {
      state.usePlatinumColony = action.payload;
    },
    setUseShelters(state: KingdomState, action: PayloadAction<boolean>) {
      state.useShelters = action.payload;
    },
    toggleLockCard(state: KingdomState, action: PayloadAction<LockUnlock>) {
      const { name, locked } = action.payload;
      const card = state.kingdom.find((c) => c.name === name);
      if (card) {
        card.locked = !locked;
      }
    },
    unlockCard(state: KingdomState, action: PayloadAction<string>) {
      const card = state.kingdom.find((c) => c.name === action.payload);
      if (card) {
        card.locked = false;
      }
    },
    toggleLockLandscape(
      state: KingdomState,
      action: PayloadAction<LockUnlock>
    ) {
      const { name, locked } = action.payload;
      const card = state.landscapes.find((c) => c.name === name);
      if (card) {
        card.locked = !locked;
      }
    },
    unlockLandscape(state: KingdomState, action: PayloadAction<string>) {
      const card = state.landscapes.find((c) => c.name === action.payload);
      if (card) {
        card.locked = false;
      }
    },
    setBlackMarket(state: KingdomState, action: PayloadAction<Array<Card>>) {
      state.blackMarket = action.payload;
    },
    setAlert(state: KingdomState, action: PayloadAction<string>) {
      state.alert = action.payload;
    },
    setImgUrl(state: KingdomState, action: PayloadAction<EditImgUrl>) {
      const { key, imgUrl } = action.payload;
      state.images[key] = imgUrl;
    },
  },
});

export const {
  setKingdom,
  setLandscapes,
  setUsePlatinumColony,
  setUseShelters,
  toggleLockCard,
  unlockCard,
  toggleLockLandscape,
  unlockLandscape,
  setBlackMarket,
  setAlert,
  setImgUrl,
} = kingdomSlice.actions;
