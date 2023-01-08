import { Input } from "@chakra-ui/input";
import { Box, Code, Heading } from "@chakra-ui/layout";
import React, { useState } from "react";
import { useReplState } from "../../state/repl";

const Console = () => {
  const { output, send } = useReplState((state) => state);
  const [command, setCommand] = useState("");

  return (
    <Box
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "white",
      }}
    >
      <Heading size={"xs"}>Output</Heading>
      <Box
        style={{
          height: 100,
          overflowY: "scroll",
          listStyle: "none",
          width: "100%",
        }}
      >
        <Code size="xs" style={{ whiteSpace: "pre-line", width: "100%" }}>
          {output}
        </Code>
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(command);
          setCommand("");
        }}
      >
        <Input
          size="xs"
          placeholder="command"
          onInput={(data) => {
            const newCommand = data.target.value;
            setCommand(newCommand);
          }}
        />
      </form>
    </Box>
  );
};

export default Console;
