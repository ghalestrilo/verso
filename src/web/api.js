// import WebSocket from "ws";

import axios from "axios";

// const ws = new WebSocket("ws://localhost", { port: 8000 });

// ws.on("open", function open() {
//   ws.send("something");
// });

// ws.on("message", function message(data) {
//   console.log("received: %s", data);
// });

// export const sendToRepl = (data) => ws.send(data);
export const sendToRepl = (content) =>
  axios.post("http://localhost:4000/eval", { content });
