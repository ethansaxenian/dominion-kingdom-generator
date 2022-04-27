import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  kingdom: [],
  landscapes: [],
  usePlatinumColony: false,
  useShelters: false,
  blackMarket: []
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
    toggleLockLandscape(state, action) {
      const { name, locked } = action.payload;
      const card = state.landscapes.find((c) => c.name === name);
      card.locked = !locked;
    },
    setBlackMarket(state, action) {
      state.blackMarket = action.payload;
    },
    toggleBlackMarketCard(state, action) {
      const { name, locked } = action.payload;
      const card = state.blackMarket.find((c) => c.name === name);
      card.locked = !locked;
    },
  }
});

export default kingdomSlice.reducer;

// export const {} = kingdomSlice.actions;
