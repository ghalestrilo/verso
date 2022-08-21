import create from "zustand";
import config, { VersoConfig } from "../config/config";

type State = VersoConfig & {
  updateSettings: (newSettings: VersoConfig) => void;
};

export const useSettingsState = create<State>((set) => ({
  ...config,
  updateSettings: (newSettings) =>
    set((state) => ({
      ...state,
      ...newSettings,
    })),
}));
