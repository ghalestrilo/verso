import create from "zustand";
import * as api from "../web/api";
import { VERSO_PROJECT_FOLDER } from "../web/config";

type State = {
  list: string[];
  projectFolder: string;
  refreshProjectList: (name: string) => void;
};

export const useProjectsState = create<State>((set) => ({
  list: [],
  projectFolder: VERSO_PROJECT_FOLDER,
  refreshProjectList: () => {
    api.listProjects().then(({ data }) => {
      console.log(data);
      set((state) => ({ ...state, list: data }));
    });
  },
}));
