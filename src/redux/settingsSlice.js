import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expansions: ['Base'],
  promos: [],
  blacklist: [],
  whitelist: []
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addExpansion(state, action) {
      state.expansions.push(action.payload);
      state.expansions.sort();
    },
    removeExpansion(state, action) {
      state.expansions = state.expansions.filter((exp) => exp !== action.payload);
    },
    addPromo(state, action) {
      state.promos.push(action.payload);
      state.promos.sort();
    },
    removePromo(state, action) {
      state.promos = state.promos.filter((promo) => promo !== action.payload);
    },
    setBlacklist(state, action) {
      state.blacklist = action.payload;
      state.blacklist.sort();
    },
    setWhitelist(state, action) {
      state.whitelist = action.payload;
      state.whitelist.sort();
    }
  }
});

export default settingsSlice.reducer;

export const {
  addExpansion,
  removeExpansion,
  addPromo,
  removePromo,
  setWhitelist,
  setBlacklist
} = settingsSlice.actions;
