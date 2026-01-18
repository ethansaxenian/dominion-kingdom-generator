import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Expansion, Promo } from "@/lib";

export interface SettingsState {
  expansions: Array<Expansion>;
  promos: Array<Promo>;
  blacklist: Array<string>;
  whitelist: Array<string>;
}

const loadFromLocalStorage = (): SettingsState => {
  try {
    const saved = localStorage.getItem("dominion-settings");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Failed to load settings from local storage:", error);
  }
  return {
    expansions: ["Base"],
    promos: [],
    blacklist: [],
    whitelist: [],
  };
};

const initialState: SettingsState = loadFromLocalStorage();

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    addExpansion(state: SettingsState, action: PayloadAction<Expansion>) {
      state.expansions.push(action.payload);
      state.expansions.sort();
    },
    removeExpansion(state: SettingsState, action: PayloadAction<Expansion>) {
      state.expansions = state.expansions.filter(
        (exp) => exp !== action.payload,
      );
    },
    addPromo(state: SettingsState, action: PayloadAction<Promo>) {
      state.promos.push(action.payload);
      state.promos.sort();
    },
    removePromo(state: SettingsState, action: PayloadAction<Promo>) {
      state.promos = state.promos.filter((promo) => promo !== action.payload);
    },
    setBlacklist(state: SettingsState, action: PayloadAction<Array<string>>) {
      state.blacklist = action.payload;
      state.blacklist.sort();
    },
    setWhitelist(state: SettingsState, action: PayloadAction<Array<string>>) {
      state.whitelist = action.payload;
      state.whitelist.sort();
    },
  },
});

export const {
  addExpansion,
  removeExpansion,
  addPromo,
  removePromo,
  setWhitelist,
  setBlacklist,
} = settingsSlice.actions;
