import { Input } from "@chakra-ui/input";
import { Box, Code, Heading } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
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
      <Tabs size="sm">
        <TabList>
          <Heading size={"sm"} fontWeight="normal">
            Output
          </Heading>
          {output.map(({ processName, output }) => (
            <Tab>{processName}</Tab>
          ))}
        </TabList>
        <Box
          style={{
            height: 100,
            overflowY: "scroll",
            listStyle: "none",
            width: "100%",
          }}
        >
          <TabPanels>
            {output.map(({ processName, output }) => (
              <TabPanel>
                <Code
                  size="xs"
                  style={{ whiteSpace: "pre-line", width: "100%" }}
                >
                  {output}
                </Code>
              </TabPanel>
            ))}
          </TabPanels>
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
      </Tabs>
    </Box>
  );
};

export default Console;
