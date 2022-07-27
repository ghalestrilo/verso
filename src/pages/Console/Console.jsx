import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useReplState } from "../../state/repl";

const Console = () => {
  const output = useReplState((state) => state.output);
  console.log(output);
  return (
    <Segment>
      <Header as={"h3"}>Output</Header>
      <Container style={{ height: 100, overflowY: "scroll" }}>
        {output.toString()}
      </Container>
    </Segment>
  );
};

export default Console;
