require('dotenv').config()


const create = require('zustand/vanilla').create
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const klawSync = require('klaw-sync')
const spawn = require("child_process").spawn;

// Server config
const port = process.env?.VERSO_PORT_INTERNAL || 4000;
const projFolder = process.env?.VERSO_PROJECT_FOLDER || `${process.env.HOME}/.verso/projects`;

// Server State
var repl = null
var childProcesses = {}
var versoWS = null


// Server setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


const { readFileSync, writeFileSync } = require("fs");

// SERVER COMMANDS
const resolveFilename = filename => filename.startsWith('/home')
  ? filename
  : `${projFolder}/${filename}`;

const bindReplSTDOUT = (replProcess) => {
  if (!replProcess) return
  // spit stdout to screen
  replProcess && replProcess.stdout.on("data", function (data) {
    const output = data.toString();
    process.stdout.write(output);
    versoWS && versoWS.send(output);
  });

  // spit stderr to screen
  replProcess && replProcess.stderr.on("data", function (data) {
    const output = data.toString();
    process.stderr.write(output);
    versoWS && versoWS.send(output);
  });
}



const initialize = (processes = []) => {
  Object.entries(childProcesses).forEach(([name, child]) => {
    child.kill('SIGHUP');
  })
  childProcesses = Object.fromEntries(
    processes.map(({ name, command, params }) => [name, spawn(command, params)])
  )
  Object.entries(childProcesses).forEach(([name, child]) => {
    child.on("close", function (code) {
      console.log("Finished with code " + code);
    });
  })
  repl = childProcesses["tidal"]
  bindReplSTDOUT(repl)
}

app.post("/start", (req, res) => {
  const processes = req.body?.processes || ''
  initialize(JSON.parse(processes))
})

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



const WebSocket = require("ws");

const wss = new WebSocket.WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  versoWS = ws
  console.log("connected");
  ws.on("message", function message(input) {
    const command = `${input.toString()}\n`;
    repl && repl.stdin.write(command)
  });
  bindReplSTDOUT(repl)
});






// ----------------------
var http = require('http');
var osc = require('osc');

const tcpPort = 7771;
var oscPort = 7771;

// create WebSocket server
var server = http.createServer();
var tidalSocketServer = new WebSocket.Server({ server: server });
tidalSocketServer.on('connection', function (ws) {
  var ip = ws.upgradeReq.connection.remoteAddress;
  console.log("new WebSocket connection from " + ip);
});
tidalSocketServer.broadcast = function (data) {
  for (var i in this.clients) {
    try {
      this.clients[i].send(data);
    }
    catch (e) {
      console.log("warning: exception in websocket broadcast");
    }
  }
};

// make it go
server.listen(tcpPort, function () { console.log('Listening on ' + server.address().port) });

var udp = new osc.UDPPort({ localAddress: "127.0.0.1", localPort: oscPort });
udp.open();
udp.on('message', function (m) {
  var response = JSON.stringify(m);
  tidalSocketServer.broadcast(response);
  console.log(response);
});
// ----------------------



app.listen(port, () => {
  console.log(`verso backend listening on ${port}`);
});