import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Expansion, Promo } from 'lib';

export interface SettingsState {
  expansions: Array<Expansion>;
  promos: Array<Promo>;
  blacklist: Array<string>;
  whitelist: Array<string>;
}

const initialState: SettingsState = {
  expansions: ['Base'],
  promos: [],
  blacklist: [],
  whitelist: [],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addExpansion(state: SettingsState, action: PayloadAction<Expansion>) {
      state.expansions.push(action.payload);
      state.expansions.sort();
    },
    removeExpansion(state: SettingsState, action: PayloadAction<Expansion>) {
      state.expansions = state.expansions.filter(
        (exp) => exp !== action.payload
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
