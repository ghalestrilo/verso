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

import { documentDir } from "@tauri-apps/api/path";

const SessionPage = () => {
  // const initFile = config.init.file;

  const track = useTrackState();
  useEffect(() => {
    documentDir().then((documentDirPath) => {
      console.log(documentDirPath);
      track.loadFile(
        `${documentDirPath}verso/projects/sets/groove/2_astro_2.tidal`
      );
    });
  }, []);
  const {
    send: fireScene,
    plugin,
    stopPlayback,
    bootProcesses,
  } = useReplState();
  // const { processes } = useSettingsState();

  const {
    setTrackData = () => null,
    saveSessionToFile = () => null,
    raw = null,
    loadFile,
  } = track;

  // const [loadedTestFile, setLoadedTestFile] = useState(false);
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

  return (
    <Box size={"lg"}>
      <HeaderMenu
        track={track}
        saveSessionToFile={saveSessionToFile}
        stopPlayback={stopPlayback}
        bootProcesses={bootProcesses}
      />
      <SimpleGrid columns={[1, 1, 2]} spacing={10}>
        <SceneGrid
          track={track}
          onClickScenePlay={(raw) => fireScene(raw, 0)}
        />
        <Editor />
        <GridItem>
          <Console />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default SessionPage;
