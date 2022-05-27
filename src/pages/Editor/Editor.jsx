import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useTrackState } from "../../state/track";

const Editor = () => {
  const { raw, setTrackData } = useTrackState();
  const [content, setContent] = useState(raw || "");
  return (
    <Form
      onSubmit={(data) => {
        const text = data?.target[0]?.value;
        if (text) setTrackData(text);
      }}
    >
      <Form.TextArea
        style={{ minHeight: 800 }}
        value={content}
        // onChange={(e) => setContent(e.target.value)}
      />
      <Form.Button content="Submit">Update</Form.Button>
    </Form>
  );
};

export default Editor;
