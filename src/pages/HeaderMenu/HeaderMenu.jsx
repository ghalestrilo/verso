import React from "react";

import { Box, ButtonGroup, IconButton, Flex, Heading } from "@chakra-ui/react";
import { ProjectSelectModal } from "../ProjectSelectModal/ProjectSelectModal";
import { IconDeviceFloppy, IconReload, IconSquare } from "@tabler/icons";
import { useSettingsState } from "../../state/settings";
import { useReplState } from "../../state/repl";
// import IntroModal from "./IntroModal/IntroModal";
// import SettingsModal from "./SettingsModal/SettingsModal";

export const HeaderMenu = ({ track, bootProcesses }) => {
  const { processes } = useSettingsState();
  const { stopPlayback } = useReplState();
  return (
    <Flex direction="row" p={4}>
      <Heading as={"h3"} flex="1">
        {track?.name}
      </Heading>
      <ButtonGroup isAttached variant="outline" colorScheme="teal">
        {/* <SettingsModal /> */}
        {/* <IntroModal /> */}
        <IconButton
          aria-label="Stop"
          onClick={stopPlayback}
          icon={<IconSquare size={18} />}
        />
        <IconButton
          onClick={() => bootProcesses(processes)}
          icon={<IconReload size={18} />}
          aria-label="Restart REPL"
        />
        <IconButton
          icon={<IconDeviceFloppy size={18} />}
          aria-label="Save project"
          onClick={() => track?.saveSessionToFile()}
        />
        <ProjectSelectModal />
      </ButtonGroup>
    </Flex>
  );
};
