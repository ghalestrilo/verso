import create from "zustand";
import { sendToRepl } from "../web/api";

type State = {
  output: string;
  append: (message: string) => void;
  send: (message: string) => void;
};

export const useReplState = create<State>((set) => ({
  output: "asd",
  append: (message) =>
    set((state) => ({ ...state, output: state.output + message })),
  send: (message) => sendToRepl(message),
}));
