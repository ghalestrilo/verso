import { Input } from "@chakra-ui/input";
import { Box, Code, Heading } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React, { useState } from "react";
import { useReplState } from "../../state/repl";

const Console = () => {
  const { output, send, plugin } = useReplState((state) => state);
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
      <Tabs size="sm">
        <TabList alignItems={"baseline"}>
          <Heading size={"sm"} fontWeight="normal" marginRight={"2"}>
            Output
          </Heading>
          {output.map(({ processName }) => (
            <Tab key={`${processName}-tab`}>{processName}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {output.map(({ processName, output }, index) => (
            <TabPanel key={`${processName}-output`} padding={0}>
              <Box
                style={{
                  height: 100,
                  overflowY: "scroll",
                  listStyle: "none",
                  width: "100%",
                }}
              >
                <Code
                  fontSize={"xs"}
                  size="xs"
                  style={{ whiteSpace: "pre-line", width: "100%" }}
                >
                  {output}
                </Code>
              </Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(command, index);
                  setCommand("");
                }}
              >
                <Input
                  size="xs"
                  value={command}
                  placeholder="command"
                  onInput={(data) => {
                    const newCommand = data.target.value;
                    setCommand(newCommand);
                  }}
                />
              </form>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Console;
