import create from "zustand";
import { getVersoSettingsFile } from "../desktop/api";
import { ClientChildProcess } from "../util/clientChildProcess";



export type VersoSettings = {
  processes: ClientChildProcess[];
};

const defaultConfig: VersoSettings = {
  processes: [],
};


type State = {
  settings: VersoSettings,
  updateSettings: (newSettings: VersoSettings) => void;
};

export const useSettingsState = create<State>((set) => {
  const updateSettings = (newSettings:VersoSettings) => set((state: State) => {
    return {
      ...state,
      settings: newSettings,
    };
  })

  // localStorage.setItem(
  //   versoSettingsLocalStorageName,
  //   JSON.stringify(state)
  // );

  getVersoSettingsFile(defaultConfig)
    .then(content => JSON.parse(content || "" as string))
    .then(content => {
      console.log(content)
      set(state => ({ ...state, processes: content.processes || []}))
    })

  // getVersoSettingsFile().then(content => set())
  return {
    settings: defaultConfig,
    updateSettings
  }
})
