// import axios from "axios";
import config from "../config/config";
import { dialog, invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
import { ClientChildProcess } from "../config/config";

import { Command } from "@tauri-apps/api/shell";
const command = Command.sidecar("my-sidecar");
// const output = await command.execute();

// now we can call our Command!
// Right-click the application background and open the developer tools.
// You will see "Hello, World!" printed in the console!

const initFolder = "/Users/admin/.verso/projects";

const tauriCommand = (command: string, args: any) =>
  invoke(command, args)
    .then((data) => {
      console.debug(command, { args, data });
      return { data };
    })
    .catch((error) => {
      console.error(command, { args, error });
      return { error };
    });

export const sendToRepl = (content: any) => null;

export const startProcesses = async (
  processes: ClientChildProcess[],
  onStdout?: (childNumber: number, line: string) => void,
  onStderr?: (childNumber: number, line: string) => void
) => {
  const commands = processes.map((processdef, index) => {
    const command = new Command(processdef.command, processdef.params);
    command.on("error", (error) => console.error(`command error: "${error}"`));
    command.stdout.on("data", (line) => onStdout?.(index, line));
    command.stderr.on("data", (line) => onStderr?.(index, line));
    command.on("close", async (data) => {
      console.log(
        `command finished with code ${data.code} and signal ${data.signal}`
      );
      // const output = await command.execute()
      // console.log("command output:", output);
    });
    return command;
  });
  // const child = await command.spawn();
  const children = await Promise.all(
    commands.map((command) => command.spawn().then((child) => child))
  );
  console.log("children", children);
  return children;
};

export const loadFile = async (filename = "") => {
  const data = await readTextFile(filename);
  return { data };
};

export const writeToFile = async (name: string, data: string) => {
  await writeTextFile(name, data);
};

// change for fs
export const listProjects = () =>
  tauriCommand("list_projects", { name: initFolder });

// import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
// // Reads the `$APPDATA/users` directory recursively
// const entries = await readDir('users', { dir: BaseDirectory.AppData, recursive: true });

// function processEntries(entries) {
//   for (const entry of entries) {
//     console.log(`Entry: ${entry.path}`);
//     if (entry.children) {
//       processEntries(entry.children)
//     }
//   }
// }

// dialog module
export const openFile = async (callback?: (a: any) => void) => {
  // Open a selection dialog for image files
  const selected = await open({
    multiple: false,
  });
  if (selected === null) return;
  if (!callback) return;

  callback(selected);
};

export const saveFileAs = async (
  data: any,
  thenOpenTheFile?: (content: string) => void
) => {
  const filename = await save();
  if (!filename) return;
  await writeToFile(filename, data);
  thenOpenTheFile?.(filename);
};
