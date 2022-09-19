import React, { useEffect, useState } from "react";
import { Container, Header, Segment, Sticky } from "semantic-ui-react";
import { useReplState } from "../../state/repl";

const Console = () => {
  const output = useReplState((state) => state.output);
  useEffect(() => {
    var element = document.getElementById("console-output");
    element.scrollTop = element.scrollHeight;
  }, [output]);
  return (
    <div style={{ position: "fixed", bottom: 50 }}>
      <Header as={"h3"}>Output</Header>
      <Container
        id="console-output"
        style={{ height: 100, overflowY: "scroll" }}
      >
        {output
          .split("\n")
          .filter((x) => x)
          .map((x) => (
            <p style={{ margin: 0 }}>{x}</p>
          ))}
      </Container>
    </div>
  );
};

export default Console;
