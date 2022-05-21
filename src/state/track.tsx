import create from "zustand";
import { parse } from "../lang/tidal/parser";

// const filename = "file:///git/seg-react/src/lang/tidal/song1.hs";
// const trackfile = window.open(testfile);

type State = {
  name: string;
  instruments: string[];
  raw?: string[] | string;
  load: (data: string) => void;
};

export const useTrackState = create<State>((set) => ({
  name: "Testname",
  raw: undefined,
  // TODO: remove mock data
  instruments: ["drums", "keys", "blips"],
  scenes: ["Scene 1", "Scene 2", "Scene 3"].map((name) => ({
    name,
    actions: Object.fromEntries(
      ["blips", "drums", "keys"].map((instrumentName) => [
        instrumentName.toString(),
        `${instrumentName} pattern`,
      ])
    ),
  })),
  load: (data: string) => {
    // TODO: destructure parsed data here, catch errors before merging objects
    const parsed = parse(data);
    return set((state) => ({
      ...state,
      parsed,
      raw: data,
    }));
  },
}));
