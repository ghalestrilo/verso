import create from "zustand";
import { VersoLanguagePlugin } from "../lang/plugin";
import { TidalPlugin } from "../lang/tidal";

const webSocketServer = "ws://localhost:8080";

type State = {
  output: string;
  socket: WebSocket;

  append: (message: string) => void;
  send: (message: string) => void;
  initialize: () => void;
  stopPlayback: () => void;
  close: () => void;
  plugin: VersoLanguagePlugin;
  // listeners: ((data: string) => void)[]
};

export const useReplState = create<State>((set) => ({
  output: "",
  socket: null,
  // listeners: []

  initialize: () =>
    set((state) => {
      const { socket } = state;
      if (socket) socket.close();
      const newSocket = new WebSocket(webSocketServer);
      newSocket.onopen = () => {
        console.log("ws opened");

        newSocket.onmessage = (message) => {
          console.log(message);
          state.append(`${message.data}`);
        };
      };
      newSocket.onclose = () => console.log("ws closed");
      return { ...state, socket: newSocket };
    }),
  append: (message) =>
    set((state) => ({
      ...state,
      output: state.output + message,
    })),
  send: (message) =>
    set((state) => {
      if (state.socket) state.socket.send(message);
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
      if (state.socket) state.socket.close();
      return state;
    }),
  plugin: TidalPlugin,
}));
