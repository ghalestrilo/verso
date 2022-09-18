import create from "zustand";
import { VersoLanguagePlugin } from "../lang/plugin";
import { TidalPlugin } from "../lang/tidal";
import WebDirt from "../webdirt/WebDirt";

// subscribe to a TidalSocket over WebSockets, logging is off if withLog == false

const tidalSocketServer = "ws://localhost:8080";

type State = {
  socket: any;
  initialize: () => void;
  close: () => void;
};

export const useSoundState = create<State>((set) => ({
  socket: null,
  initialize: () =>
    set((state) => {
      const { socket } = state;
      if (socket) socket.close();
      const newSocket = (WebDirt as any).subscribeToTidalSocket(
        tidalSocketServer
      );
      return { ...state, socket: newSocket };
    }),
  close: () =>
    set((state) => {
      if (state.socket) state.socket.close();
      return state;
    }),
}));
