import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Grid, Menu } from "semantic-ui-react";
import { useTrackState } from "../state/track";
import { SEG_TEST_FILE } from "../web/config";
import Console from "./Console/Console";
import Editor from "./Editor/Editor";
import SceneGrid from "./SceneGrid/SceneGrid";

const testFile = SEG_TEST_FILE;

const SessionPage = () => {
  const track = useTrackState((state) => state);

  const [loadedTestFile, setLoadedTestFile] = useState(false);

  const {
    setTrackData = () => null,
    saveSessionToFile = () => null,
    raw = null,
    loadFile,
  } = track;

  useEffect(() => {
    // TODO: Substitute this logic for a splashscreen modal / file loading dialog
    if (raw || loadedTestFile) return;
    fetch(testFile)
      .then((x) => x.text())
      .then((x) => {
        loadFile(testFile);
        setLoadedTestFile(true);
      });
  }, [setTrackData, loadFile, raw, loadedTestFile]);

  if (!track) return <></>;

  return (
    <Container fluid style={{ padding: "2rem" }}>
      <Menu fixed="top" secondary style={{}}>
        <Menu.Item as={"h1"}>{track?.name}</Menu.Item>
        <Menu.Item position="right">
          <Button onClick={() => saveSessionToFile()}>save</Button>
        </Menu.Item>
      </Menu>
      <Grid columns={2} divided>
        <Grid.Column>
          <Grid.Row>
            <SceneGrid track={track} />
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Console />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Editor />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default SessionPage;
