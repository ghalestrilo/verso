import React, { useState } from "react";
import { useTrackState } from "../../state/track";

import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { haskell } from "@codemirror/legacy-modes/mode/haskell";

const Editor = () => {
  const { raw, setTrackData } = useTrackState();
  const [content, setContent] = useState(raw || "");

  return (
    <CodeMirror
      value={content}
      height="800px"
      extensions={[StreamLanguage.define(haskell)]}
      onChange={(value, viewUpdate) => {
        setContent(value);
        setTrackData(value);
        console.log(value);
        console.log("value");
      }}
    />
  );
};

export default Editor;
