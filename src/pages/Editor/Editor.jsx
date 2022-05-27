import React from "react";
import { Form } from "semantic-ui-react";
import { useTrackState } from "../../state/track";

const Editor = () => {
  const { raw, setTrackData } = useTrackState();
  return (
    <Form
      onSubmit={(data) => {
        const text = data?.target[0]?.value;
        if (text) setTrackData(text);
      }}
    >
      <Form.TextArea style={{ minHeight: 800 }}>{raw || ""}</Form.TextArea>
      <Form.Button content="Submit">Write</Form.Button>
    </Form>
  );
};

export default Editor;
