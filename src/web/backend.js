const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Server conig
const port = process.env?.SEG_PORT_INTERNAL || 4000;
const projFolder = process.env?.SEG_PROJECT_FOLDER || "~/.seg/projects";

// Configuration for tidal. Generalize this in the future
const command = "ghci";
const params = ["-ghci-script", "/home/tidal/boot.tidal"];

// Server setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var spawn = require("child_process").spawn;
const { readFileSync, writeFileSync, readdirSync } = require("fs");

const child = spawn(command, params);

child.on("close", function (code) {
  console.log("Finished with code " + code);
});

var outputBuffer = "";

//spit stdout to screen
child.stdout.on("data", function (data) {
  const output = data.toString();
  process.stdout.write(output);
  outputBuffer += output;
});

//spit stderr to screen
child.stderr.on("data", function (data) {
  const output = data.toString();
  process.stderr.write(output);
  outputBuffer += output;
});

// SERVER COMMANDS

// /load : get the contents of received filename
app.get("/load", (req, res) => {
  const fullfilename =
    req.query?.filename && `${projFolder}/${req.query?.filename}`;

  const data = readFileSync(fullfilename);

  res.send(data);
});

// /list : return the projects in your project folder
app.get("/list", (req, res) => {
  res.send(readdirSync(projFolder));
});

// /save : write the received contents to the received filename
app.post("/save", (req, res) => {
  const fullfilename =
    req?.body?.filename && `${projFolder}/${req?.body?.filename}`;

  const data = req?.body?.data;

  writeFileSync(fullfilename, data);

  res.send(data);
});

// /eval : send the received code block to the repl
app.post("/eval", (req, res) => {
  const input = req?.body?.content;
  const command = `${input}\n`;
  console.log(command);
  const response = input ? child.stdin.write(command) : "nope";
  res.send(response);
});

app.listen(port, () => {
  console.log(`Seg local server listening on ${port}`);
});

// const WebSocket = require("ws");

// const wss = new WebSocket.WebSocketServer({ port: 8080 });
// // const ws = new WebSocket("ws://localhost/seg");

// console.log("started");
// wss.on("connection", function connection(ws) {
//   console.log("connected");
//   ws.on("message", function message(data) {
//     console.log("received: %s", data);
//   });

//   ws.send("something");
// });
