import create from "zustand";

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
  // raw: "testfile",
  raw: undefined,
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
  load: (data: string) =>
    set((state) => ({
      ...state,
      raw: data,
    })),
}));
