import create from "zustand";
import { ClientChildProcess } from "../config/config";
import { VersoLanguagePlugin } from "../lang/plugin";
import { TidalPlugin } from "../lang/tidal";
import { startProcesses } from "../desktop/api";
import { Child } from "@tauri-apps/api/shell";

const webSocketServer = "ws://localhost:8080";

export type State = {
  output: string;
  children: Child[];
  plugin: VersoLanguagePlugin;

  bootProcesses: (processes: ClientChildProcess[]) => void;
  onData: (processName: string, message: string) => void;
  onError: (processName: string, message: string) => void;
  send: (message: string) => void;
  stopPlayback: () => void;
  close: () => void;
  setChildren: (children: Child[]) => void;
};

export const useReplState = create<State>((set) => ({
  output: "",
  children: [],
  onData: (processName, message) =>
    set((state) => {
      return {
        ...state,
        output: state.output + "\n" + message,
      };
    }),
  onError: (processName, message) =>
    set((state) => {
      return {
        ...state,
        output: state.output + "\n" + message,
      };
    }),
  setChildren: (children: Child[]) =>
    set((state) => {
      state.close();
      return { ...state, children };
    }),
  bootProcesses: (processes) =>
    set((state) => {
      startProcesses(processes, state.onData, state.onError).then((children) =>
        state.setChildren(children)
      );
      return state;
    }),
  send: (message) =>
    set((state) => {
      console.log(message);
      if (state.children.length) state.children[0]?.write(message);
      return state;
    }),
  stopPlayback: () =>
    set((state) => {
      const { prepareCommand, stop } = state.plugin;
      state.send(prepareCommand(stop));
      return state;
    }),
  close: () =>
    set((state) => {
      state.children.forEach((process) => {
        console.log(process);
        process.kill();
      });
      return state;
    }),
  plugin: TidalPlugin,
}));
