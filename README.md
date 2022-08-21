# Verso (React port)

Verso is a grid-based livecoding editor aimed towards music production. Right now it only supports [tidalcycles](https://tidalcycles.org/) but it's built towards becoming language-agnostic.

## MVP Roadmap

- [x] Basic tidal parsing
- [x] Scene/command grid
- [x] Parse channel names
- [x] Sending commands to the Tidal REPL
- [x] Save / Load files
- [x] Implement a proper code editor using [CodeMirror 6](https://codemirror.net/6/) (or another library)
- [x] Implement socket-based webapp-server communication
- [x] Deploy to the web (via eg. heroku / gatsby)
  - [x] Use this to push data to the `<Console />` component for real-time feedback
  - [ ] Deprecate HTTP (axios + express) api
- [x] Stop button
- [x] Basic settings (verso port and host)
- [ ] Remember settings (via localStorage)
- [ ] Keyboard Navigation + commands
- [ ] Buttons for playing scenes and channel commands
- [ ] Scene editor prototype (Button + Modal + Form)
  - Edit scene
  - Edit channel command

Stretch goals

- [ ] Read a config file
- [ ] Custom channels / track post-parsing filter

## Running

After cloning the repo, install all dependencies by runnin `yarn install`.

Then, copy the file `.env.sample` as `.env` and adjust them accordingly:

- `VERSO_PROJECT_FOLDER`: Path to your session files
- `VERSO_CARABINER_BIN`: Path to Carabiner binary
- `VERSO_TIDAL_BOOT_PATH`: Path to TidalCycles bootloading script

To run the project (as of today), you must start the `webapp` as well as the `backend`. Run the following commands

- `yarn start`: will start the webapp on port localhost:3000
- `yarn run backend`: will start the repl HTTP server

Use the following environment variables to control the behavior of verso:

- `VERSO_HOST_INTERNAL` - (untested) Change this to modify the host where `backend` is expected to be running
- `VERSO_PORT_INTERNAL` - Change this to modify the port verso uses to communicate (used by both webapp and backend)
- `VERSO_PROJECT_FOLDER` - This should point to a folder containing your compositions / tidalcycles files
- `VERSO_TEST_FILE` - This should point to a valid file to be opened as the program boots
