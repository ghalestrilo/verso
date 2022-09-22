import React, { useState } from "react";
import { Container, Form, Header, Segment } from "semantic-ui-react";
import { useReplState } from "../../state/repl";

const Console = () => {
  const { output, send } = useReplState((state) => state);
  const [command, setCommand] = useState("");
  return (
    <Segment style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <Header as={"h3"}>Output</Header>
      <Container
        style={{
          height: 100,
          overflowY: "scroll",
          listStyle: "none",
          width: "100%",
        }}
      >
        <pre style={{ textWrap: "auto" }}>{output}</pre>
      </Container>
      <Form
        onSubmit={() => {
          send(command);
          setCommand("");
        }}
      >
        <Form.Field>
          <input
            placeholder="command"
            value={command}
            onInput={(data) => {
              const newCommand = data.target.value;
              setCommand(newCommand);
            }}
          ></input>
        </Form.Field>
      </Form>
    </Segment>
  );
};

export default Console;
