// import axios from "axios";
import config from "../config/config";

// const target = `http://${config.conn.host}:${config.conn.port}`;

// export const sendToRepl = (content) =>
//   axios.post(`${target}/eval`, { content });

// export const startProcesses = (processes) =>
//   axios.post(`${target}/start`, { processes: JSON.stringify(processes) });

// export const loadFile = (filename = "") =>
//   axios.get(`${target}/load?filename=${filename}`);

// export const listProjects = () => axios.get(`${target}/list`);

// export const writeToFile = (filename, data) => {
//   axios.post(`${target}/save`, {
//     filename,
//     data,
//   });
// }

const target = `http://${config.conn.host}:${config.conn.port}`;

export const sendToRepl = (content) => null;

export const startProcesses = (processes) => null;

export const loadFile = (filename = "") => null;

export const listProjects = () => axios.get(`${target}/list`)

export const writeToFile = (filename, data) => null;
