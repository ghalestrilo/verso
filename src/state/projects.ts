import create from "zustand";
import * as api from "../desktop/api";

type State = {
  list: string[];
  refreshProjectList: (name: string) => void;
};

export const useProjectsState = create<State>((set) => ({
  list: [],
  refreshProjectList: () => {
    api.listProjects()
      .then(response =>  {
      const { data, error } = {data: [], error: null, ...response}
        if (error) console.error(error)
        data && set((state) => ({ ...state, list: (data as string[]) }));
      }
    )
  },
}));
