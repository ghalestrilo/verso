import create from "zustand";
// import { loadFile, writeToFile } from "../desktop/api";
import { loadFile as apiLoadFile, writeToFile } from "../desktop/api.js";
import { parse } from "../lang/tidal/parser.js";

export type TrackScene = {
  actions: any;
};

export type State = {
  name: string;
  channels: string[];
  raw: string;
  rawLoaded?: string;
  filename: string;
  // scenes: [];
  // selection: {
  //   index: number,
  //   data: string,
  // },
  setTrackData: (data: string) => void;
  loadFile: (data: string) => void;
  saveSessionToFile: (filename: string, data: string) => void;
  // selectScene: (index: number, data: string) => null
};

const parseTrack = (data: any) => (state: State) => ({
  ...state,
  ...parse(data),
  raw: data,
  rawLoaded: data,
});

export const useTrackState = create<State>((set) => ({
  name: "Filename",
  raw: "",
  rawLoaded: "",
  filename: "",
  channels: [],
  scenes: [],
  setTrackData: (raw: string) => {
    // TODO: destructure parsed data here, catch errors before merging objects
    return set((state) => {
      const parsed = parse(raw);
      return {
        ...state,
        ...parsed,
        raw,
      };
    });
  },
  loadFile: (filename: string) => {
    console.log(filename);
    apiLoadFile(filename)
      .then(({ data }) =>
        set((state) => ({
          ...parseTrack(data)(state),
          filename,
        }))
      )
      .catch((err) => alert(err));
  },
  saveSessionToFile: (filename?: string, raw?: string) => {
    set((state) => {
      console.debug("saving", state);
      const filenameToSave = filename || state.filename;
      const rawToSave = raw || state.raw;
      writeToFile(filenameToSave, rawToSave);
      return state;
    });
  },
}));
