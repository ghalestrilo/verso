import create from "zustand";
import { ClientChildProcess } from "../config/config";
import { VersoLanguagePlugin } from "../lang/plugin";
import { TidalPlugin } from "../lang/tidal";
import { startProcesses } from "../desktop/api";
import { Child } from "@tauri-apps/api/shell";

const webSocketServer = "ws://localhost:8080";

export type ProcessOutput = {
  processName: string;
  output: string;
};

export type State = {
  output: ProcessOutput[];
  children: Child[];
  plugin: VersoLanguagePlugin;

  bootProcesses: (processes: ClientChildProcess[]) => void;
  onData: (childNumber: number, message: string) => void;
  onError: (childNumber: number, message: string) => void;
  send: (message: string, childIndex: number) => void;
  stopPlayback: () => void;
  close: () => void;
  setChildren: (children: Child[]) => void;
};

export const useReplState = create<State>((set) => ({
  output: [],
  children: [],
  onData: (childNumber, message) =>
    set((state) => {
      let output = state.output;
      output[childNumber].output += "\n" + message;
      return {
        ...state,
        output,
      };
    }),
  onError: (childNumber, message) =>
    set((state) => {
      let output = state.output;
      output[childNumber].output += "\n" + message;
      return {
        ...state,
        output,
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
      return {
        ...state,
        output: processes.map((process) => ({
          processName: process.name,
          output: "",
        })),
      };
    }),
  send: (message, childIndex) =>
    set((state) => {
      console.log(`sending to ${childIndex}: "${message}"`);
      if (state.children.length) state.children[childIndex]?.write(message);
      return state;
    }),
  stopPlayback: () =>
    set((state) => {
      const { prepareCommand, stop } = state.plugin;
      state.send(prepareCommand(stop), 0);
      return state;
    }),
  close: () =>
    set((state) => {
      state.children.forEach((process) => {
        process.kill();
      });
      return state;
    }),
  plugin: TidalPlugin,
}));
