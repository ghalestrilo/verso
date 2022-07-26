require('dotenv').config()

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const klawSync = require('klaw-sync')

// Server conig
const port = process.env?.SEG_PORT_INTERNAL || 4000;
const projFolder = process.env?.SEG_PROJECT_FOLDER || `${process.env.HOME}/.seg/projects`;

// Configuration for tidal. Generalize this in the future
const command = "ghci";
const params = ["-ghci-script", process.env?.SEG_TIDAL_BOOT_PATH || "/home/tidal/boot.tidal"];

// Server setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var spawn = require("child_process").spawn;
const { readFileSync, writeFileSync, readdirSync } = require("fs");

// const child = spawn(command, params);

// TODO: spawn custom programs (carabiner is just one possible aux program)
if (process.env?.SEG_CARABINER_BIN) spawn(process.env?.SEG_CARABINER_BIN);

// child.on("close", function (code) {
// console.log("Finished with code " + code);
// });

var outputBuffer = "";

//spit stdout to screen
// child.stdout.on("data", function (data) {
// const output = data.toString();
// process.stdout.write(output);
// outputBuffer += output;
// });

//spit stderr to screen
// child.stderr.on("data", function (data) {
// const output = data.toString();
// process.stderr.write(output);
// outputBuffer += output;
// });

// SERVER COMMANDS
const resolveFilename = filename => filename.startsWith('/home')
  ? filename
  : `${projFolder}/${filename}`;

// /load : get the contents of received filename
app.get("/load", (req, res) => {
  const filename = req.query?.filename || "";
  const fullfilename = resolveFilename(filename)

  const data = readFileSync(fullfilename);

  res.send(data);
});

// /list : return the projects in your project folder
app.get("/list", (req, res) => {
  // const relevantExtensions = ['tidal', 'hs']
  const filterFn = item => {
    const basename = path.basename(item.path)
    return basename === '.' || basename[0] !== '.'
  }
  const projectList = klawSync(projFolder, { filter: filterFn })
    .map(x => x.path)
  res.send(projectList);
});

// /save : write the received contents to the received filename
app.post("/save", (req, res) => {
  const filename = req?.body?.filename || ''
  if (!filename) {
    res.status(404)
    res.send("couldn't write regular file")
  }
  const fullfilename = resolveFilename(filename)

  const data = req?.body?.data;

  console.log(data)
  console.log(fullfilename)
  writeFileSync(fullfilename, data, {
    encoding: 'utf8',
    flag: 'w'
  });

  res.send(fullfilename);
});

// /eval : send the received code block to the repl
app.post("/eval", (req, res) => {
  const input = req?.body?.content;
  const command = `${input}\n`;
  console.log(command);
  // const response = input ? child.stdin.write(command) : "nope";
  const response = "nope";
  res.send(response);
});

// app.listen(port, () => {
//   console.log(`Seg local server listening on ${port}`);
// });

const WebSocket = require("ws");

const wss = new WebSocket.WebSocketServer({ port: 8080 });
// const ws = new WebSocket("wss://localhost:8080");

console.log("\n\n\n\n\n\nstarted\n\n\n\n\n\n");
wss.on("connection", (ws) => {
  console.log("connected");
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send("something");
});