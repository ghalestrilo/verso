import React, { useState } from "react";
// import { Form } from "semantic-ui-react";
import { useTrackState } from "../../state/track";

import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";

const Editor = () => {
  const { raw, setTrackData } = useTrackState();
  const [content, setContent] = useState(raw || "");

  return (
    <CodeMirror
      value={content}
      height="800px"
      onChange={(value, viewUpdate) => {
        setContent(value);
        setTrackData(value);
      }}
    />
  );
};

export default Editor;
