import create from "zustand";
import { parse } from "../lang/tidal/parser";
import { loadFile, saveFile as apiSaveFile } from "../web/api";

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
  saveFile: (filename: string, data: string) => void;
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
  // TODO: remove mock data
  channels: [],
  scenes: [],
  setTrackData: (data: string) => {
    // TODO: destructure parsed data here, catch errors before merging objects
    return set(parseTrack(data));
  },
  loadFile: (filename: string) => {
    loadFile(filename).then(({ data }) =>
      set((state) => ({
        ...parseTrack(data)(state),
        filename,
      }))
    );
  },
  saveFile: (filename: string, data: string) => {
    apiSaveFile(filename, data);
  },
  // selectScene: (index: number, data: string) =>
  //   set((state) => ({
  //     selection: {
  //       index,
  //       data,
  //     },
  //   })),
}));
