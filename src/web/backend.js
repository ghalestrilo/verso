const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = 4000;

// Configuration for tidal. Generalize this in the future
const command = "ghci";
const params = ["-ghci-script", "/home/tidal/boot.tidal"];

// Server setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var spawn = require("child_process").spawn;

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
  // process.stdout.write(data.toString());

  const output = data.toString();
  process.stderr.write(output);
  outputBuffer += output;
});

app.post("/eval", (req, res) => {
  const input = req?.body?.content;
  console.log(input);

  // child.stdin.write(outputBuffer);
  const response = input ? child.stdin.write(input) : "nope";
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
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
