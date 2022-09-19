import create from "zustand";
// import webpacked library
import * as WebDirt from "../webdirt/dist/WebDirt-packed";

// subscribe to a TidalSocket over WebSockets, logging is off if withLog == false

const tidalSocketServer = "ws://localhost:7771";

type State = {
  socket: any;
  engine: any;
  initialize: () => void;
  close: () => void;
};

export const useSoundState = create<State>((set) => ({
  socket: null,
  engine: null,
  initialize: async () =>
    set((state) => {
      const newEngine = state.engine || new (WebDirt as any).WebDirt({});
      console.log(newEngine);
      const { socket } = state;
      if (socket) socket.close();
      newEngine.initializeWebAudio();
      newEngine.subscribeToTidalSocket(tidalSocketServer);
      return { ...state, engine: newEngine };
    }),
  close: () =>
    set((state) => {
      if (state.socket) state.socket.close();
      return state;
    }),
}));
