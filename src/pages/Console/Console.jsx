import React from "react";
import { Container } from "semantic-ui-react";
import { useReplState } from "../../state/repl";

const Console = () => {
  const output = useReplState((state) => state.output);
  // const output = "haha";
  return <Container>{output}</Container>;
};

export default Console;
