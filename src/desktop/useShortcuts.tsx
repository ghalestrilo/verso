// Commands
import { useEffect } from "react";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { openFile, saveFileAs, writeToFile } from "./api";
import { useReplState, State as ReplState } from "../state/repl";
import { useTrackState, State as TrackState } from "../state/track";

import { useWindowFocus } from "../util/useWindowFocus";
// import { useSettingsState } from "./state/settings";

const registerShortcuts = ({
  repl,
  track,
}: {
  repl: ReplState;
  track: TrackState;
}) => {
  register("CommandOrControl+H", () => {
    console.log("Stop!");
    repl.stopPlayback();
  });

  register("Shift+Enter", () => {
    console.log("Enter!");
  });

  register("CommandOrControl+O", () => {
    console.log("Open!");
    openFile(track.loadFile);
  });

  register("CommandOrControl+S", () => {
    console.log("Save!");
    track?.raw && track.saveSessionToFile(track.filename, track.raw);
  });

  register("CommandOrControl+Shift+S", () => {
    console.log("Save as!");
    saveFileAs(track.raw, track.loadFile);
  });

  register("CommandOrControl+Comma", () => {
    console.log("Options!");
  });
};

export const useShortcuts = () => {
  const focus = useWindowFocus();
  const repl = useReplState();
  const track = useTrackState();

  const unregister = () => {
    unregisterAll();
  }

  useEffect(() => {
    if (focus === true) registerShortcuts({ repl, track });
    else unregisterAll();

    return unregister;
  }, [focus]);
};
