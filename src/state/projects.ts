import create from "zustand";
import * as api from "../web/api";
import config from "../config/config";

type State = {
  list: string[];
  projectFolder: string;
  refreshProjectList: (name: string) => void;
};

export const useProjectsState = create<State>((set) => ({
  list: [],
  projectFolder: config.init.file,
  refreshProjectList: () => {
    api.listProjects().then(({ data }) => {
      console.log(data);
      set((state) => ({ ...state, list: data }));
    });
  },
}));
