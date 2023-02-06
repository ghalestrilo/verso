import React, { useEffect, useRef, useState } from "react";
import { useTrackState } from "../../state/track";

import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { haskell } from "@codemirror/legacy-modes/mode/haskell";
import { debounce } from "lodash";

const Editor = () => {
  const { rawLoaded, setTrackData } = useTrackState();

  return (
    <CodeMirror
      value={rawLoaded}
      height="700px"
      extensions={[StreamLanguage.define(haskell)]}
      onChange={debounce((value, viewUpdate) => setTrackData(value), 200)}
    />
  );
};

export default Editor;
