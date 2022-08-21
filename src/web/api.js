// import WebSocket from "ws";

import axios from "axios";
import * as config from "./config";

// const ws = new WebSocket("ws://localhost", { port: 8000 });

// ws.on("open", function open() {
//   ws.send("something");
// });

// ws.on("message", function message(data) {
//   console.log("received: %s", data);
// });

// export const sendToRepl = (data) => ws.send(data);

const target = `http://${config.VERSO_HOST_INTERNAL}:${config.VERSO_PORT_INTERNAL}`;

export const sendToRepl = (content) =>
  axios.post(`${target}/eval`, { content });

export const loadFile = (filename = "") =>
  axios.get(`${target}/load?filename=${filename}`);

export const listProjects = () => axios.get(`${target}/list`);

export const saveLocalFile = (filename, data) => {
  axios.post(`${target}/save`, {
    filename,
    data,
  });
}
