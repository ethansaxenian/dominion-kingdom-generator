import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import kingdomReducer from './kingdomSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    kingdom: kingdomReducer
  },
});

export default store;
