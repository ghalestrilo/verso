import create from "zustand";

const webSocketServer = "ws://localhost:8080";

type State = {
  output: string;
  socket: WebSocket;

  append: (message: string) => void;
  send: (message: string) => void;
  initialize: () => void;
  close: () => void;
  // listeners: ((data: string) => void)[]
};

export const useReplState = create<State>((set) => ({
  output: "This will one day have your console output. Please have faith",
  socket: null,
  // listeners: []

  initialize: () =>
    set((state) => {
      const { socket } = state;
      if (socket) socket.close();
      const newSocket = new WebSocket(webSocketServer);
      newSocket.onopen = () => {
        console.log("ws opened");

        newSocket.onmessage = (e) => {
          const message = JSON.parse(e.data);
          console.log("e", message);
          state.append(message);
        };
      };
      newSocket.onclose = () => console.log("ws closed");
      return { ...state, socket: newSocket };
    }),
  append: (message) =>
    set((state) => ({ ...state, output: state.output + message })),
  send: (message) =>
    set((state) => {
      if (state.socket) state.socket.send(message);
      return state;
    }),
  close: () =>
    set((state) => {
      if (state.socket) state.socket.close();
      return state;
    }),
}));
