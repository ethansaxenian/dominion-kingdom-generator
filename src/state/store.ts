import { configureStore } from "@reduxjs/toolkit";
import { settingsSlice } from "./settingsSlice";
import { kingdomSlice } from "./kingdomSlice";

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    kingdom: kingdomSlice.reducer,
  },
});

// Subscribe to store changes and persist settings to local storage
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem("dominion-settings", JSON.stringify(state.settings));
    localStorage.setItem("dominion-kingdom", JSON.stringify(state.kingdom));
  } catch (error) {
    console.error("Failed to save to local storage:", error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
