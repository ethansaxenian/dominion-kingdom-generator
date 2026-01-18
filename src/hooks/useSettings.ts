import { type SettingsState } from "state";
import { useAppSelector } from "./useAppSelector";

export const useSettings = (): SettingsState =>
  useAppSelector((state) => state.settings);
