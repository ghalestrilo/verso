# Getting Started with Create React App

This is a React port of [seg](https://github.com/ghalestrilo/seg) which aims to be easier to use and more inclusive to the developer community.

## MVP Roadmap

- [x] Basic tidal parsing
- [x] Scene/command grid
- [x] Parse channel names
- [ ] Sending commands to the Tidal REPL
- [ ] Buttons for playing scenes and channel commands
- [ ] Scene editor prototype (Button + Modal + Form)
  - Edit scene
  - Edit channel command
- [x] Save / Load files
- [ ] Keyboard Navigation + commands
- [ ] Implement socket-based webapp-server communication
  - Deprecate HTTP (axios + express) implementation
  - Use this to push data to the `<Console />` component for real-time feedback
- [x] Implement a proper code editor using [CodeMirror 6](https://codemirror.net/6/) (or another library)

Stretch goals

- [ ] Read a config file
- [ ] Custom channels / track post-parsing filter

## Running

After cloning the repo, install all dependencies by runnin `yarn install`.

To run the project (as of today), you must start the `webapp` as well as the `backend`. Run the following commands

- `yarn start`: will start the webapp on port localhost:3000
- `yarn run backend`: will start the repl HTTP server
