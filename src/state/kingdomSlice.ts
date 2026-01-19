import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cardSortFn, type Card } from "@/lib";

export interface KingdomState {
  kingdom: Array<Card>;
  landscapes: Array<Card>;
  usePlatinumColony: boolean;
  useShelters: boolean;
  blackMarket: Array<Card>;
  alert: string;
}

const loadFromLocalStorage = (): KingdomState => {
  try {
    const saved = localStorage.getItem("dominion-kingdom");
    if (saved) {
      const state = JSON.parse(saved) as KingdomState;
      state.kingdom.sort(cardSortFn("cost"));
      state.landscapes.sort(cardSortFn("name"));
      return state;
    }
  } catch (error) {
    console.error("Failed to load kingdom from local storage:", error);
  }
  return {
    kingdom: [],
    landscapes: [],
    usePlatinumColony: false,
    useShelters: false,
    blackMarket: [],
    alert: "",
  };
};

const initialState: KingdomState = loadFromLocalStorage();

export interface LockUnlock {
  name: string;
  locked: boolean;
}

export const kingdomSlice = createSlice({
  name: "kingdom",
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
      action: PayloadAction<LockUnlock>,
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
} = kingdomSlice.actions;
