import create from "zustand";
import config, { VersoConfig } from "../config/config";

type State = VersoConfig & {
  updateSettings: (newSettings: VersoConfig) => void;
};

const versoSettingsLocalStorageName = "versoSettings";

const getInitialConfig = () => {
  const previousSettingsString = localStorage.getItem(
    versoSettingsLocalStorageName
  );
  let previousSettings = null;
  try {
    previousSettings = JSON.parse(previousSettingsString);
  } catch {}
  return previousSettings || config;
};

export const useSettingsState = create<State>((set) => ({
  ...getInitialConfig(),
  updateSettings: (newSettings) =>
    set((state) => {
      localStorage.setItem(
        versoSettingsLocalStorageName,
        JSON.stringify(state)
      );
      return {
        ...state,
        ...newSettings,
      };
    }),
}));
