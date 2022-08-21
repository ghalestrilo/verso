import create from "zustand";
import config, { VersoConfig } from "../config/config";

export const useSettingsState = create<VersoConfig>((set) => config);
