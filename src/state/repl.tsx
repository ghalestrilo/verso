import create from "zustand";

type State = {
  output: string;
  append: (message: string) => void;
};

export const useReplState = create<State>((set) => ({
  output: "",
  append: (message) =>
    set((state) => ({ ...state, output: state.output + message })),
}));
