import { configureStore } from '@reduxjs/toolkit';
import { settingsSlice } from './settingsSlice';
import { kingdomSlice } from './kingdomSlice';

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    kingdom: kingdomSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
