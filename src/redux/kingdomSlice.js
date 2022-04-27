import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kingdom: [],
  landscapes: [],
  usePlatinumColony: false,
  useShelters: false,
  blackMarket: [],
  alert: ''
};

const kingdomSlice = createSlice({
  name: 'kingdom',
  initialState,
  reducers: {
    setKingdom(state, action) {
      state.kingdom = action.payload;
    },
    setLandscapes(state, action) {
      state.landscapes = action.payload;
    },
    setUsePlatinumColony(state, action) {
      state.usePlatinumColony = action.payload;
    },
    setUseShelters(state, action) {
      state.useShelters = action.payload;
    },
    toggleLockCard(state, action) {
      const { name, locked } = action.payload;
      const card = state.kingdom.find((c) => c.name === name);
      card.locked = !locked;
    },
    unlockCard(state, action) {
      const card = state.kingdom.find((c) => c.name === action.payload);
      card.locked = false;
    },
    toggleLockLandscape(state, action) {
      const { name, locked } = action.payload;
      const card = state.landscapes.find((c) => c.name === name);
      card.locked = !locked;
    },
    unlockLandscape(state, action) {
      const card = state.landscapes.find((c) => c.name === action.payload);
      card.locked = false;
    },
    setBlackMarket(state, action) {
      state.blackMarket = action.payload;
    },
    setAlert(state, action) {
      state.alert = action.payload;
    }
  }
});

export default kingdomSlice.reducer;

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
  setAlert
} = kingdomSlice.actions;
