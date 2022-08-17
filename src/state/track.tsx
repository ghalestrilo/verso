import create from "zustand";
import { loadFile, saveLocalFile } from "../web/api";
const { parse } = require("../lang/tidal/parser.js");

// const filename = "file:///git/seg-react/src/lang/tidal/song1.hs";
// const trackfile = window.open(testfile);

type State = {
  name: string;
  channels: string[];
  raw?: string[] | string;
  filename: string;
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
});

export const useTrackState = create<State>((set) => ({
  name: "Filename",
  raw: "",
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
    loadFile(filename).then(({ data }) =>
      set((state) => ({
        ...parseTrack(data)(state),
        filename,
      }))
    );
  },
  saveSessionToFile: (filename?: string, raw?: string) => {
    set((state) => {
      saveLocalFile(filename || state.filename, raw || state.raw);
      return state;
    });
  },
  // selectScene: (index: number, data: string) =>
  //   set((state) => ({
  //     selection: {
  //       index,
  //       data,
  //     },
  //   })),
}));
