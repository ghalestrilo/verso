import React, { useEffect, useState } from "react";
import config from "../config/config";
import { useProjectsState } from "../state/projects";
import { useSettingsState } from "../state/settings";
import { useReplState } from "../state/repl";
import { useTrackState } from "../state/track";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import testSong from "../lang/tidal/song1.hs?raw";

import SceneGrid from "./SceneGrid/SceneGrid";
import Editor from "./Editor/Editor";
import { HeaderMenu } from "./HeaderMenu/HeaderMenu";
import Console from "./Console/Console";
// import IntroModal from "./IntroModal/IntroModal";
// import SettingsModal from "./SettingsModal/SettingsModal";

const SessionPage = () => {
  // const track = testTrack;
  // const initFile = config.init.file;

  const track = useTrackState();
  useEffect(() => {
    track.setTrackData(testSong);
  }, []);
  const {
    send: fireScene,
    plugin,
    stopPlayback,
    bootProcesses,
  } = useReplState();
  // const { processes } = useSettingsState();

  // const [loadedTestFile, setLoadedTestFile] = useState(false);

  const {
    setTrackData = () => null,
    saveSessionToFile = () => null,
    raw = null,
    loadFile,
  } = track;

  // useEffect(() => {
  //   // TODO: Substitute this logic for a splashscreen modal / file loading dialog
  //   if (raw || loadedTestFile) return;
  //   fetch(initFile)
  //     .then((x) => x.text())
  //     .then((x) => {
  //       loadFile(initFile);
  //       setLoadedTestFile(true);
  //     });
  // }, [setTrackData, loadFile, raw, loadedTestFile, initFile]);

  // if (!track) return <></>;

  return (
    <Box size={"lg"}>
      <HeaderMenu
        track={track}
        saveSessionToFile={saveSessionToFile}
        stopPlayback={stopPlayback}
        bootProcesses={bootProcesses}
      />
      <SimpleGrid columns={[1, 1, 2]} spacing={10}>
        <SceneGrid track={track} onClickScenePlay={fireScene} />
        <Editor />
        <GridItem>
          <Console />
        </GridItem>
      </SimpleGrid>
    </Box>
    // <Container fluid style={{ padding: "2rem" }}>
    //   <Menu secondary size="tiny" fluid compact>
    //     <MenuItem>
    //       <Header as={"h1"}>{track?.name}</Header>
    //     </MenuItem>
    //     <MenuItem position="right">
    //       <ButtonGroup size="tiny">
    //         <SettingsModal />
    //         <IntroModal />
    //         <Button icon="stop" onClick={() => stopPlayback()}></Button>
    //         <Button
    //           icon="refresh"
    //           onClick={() => bootProcesses(processes)}
    //         ></Button>
    //         <Button onClick={() => saveSessionToFile()}>save</Button>
    //         <ProjectSelectModal />
    //       </ButtonGroup>
    //     </MenuItem>
    //   </Menu>
    //   <Divider />
    //   <div style={{ marginBottom: 200 }}>
    //     <Grid columns={2} padded>
    //       <Grid.Column>
    //         <SceneGrid track={track} />
    //       </Grid.Column>
    //       <Grid.Column>
    // <Editor />
    //         <Divider />
    //       </Grid.Column>
    //     </Grid>
    //   </div>
    //   <Console />
    // </Container>`
  );
};

export default SessionPage;
