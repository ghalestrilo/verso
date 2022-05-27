import React, { useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Menu,
} from "semantic-ui-react";
import { useTrackState } from "../state/track";
import Console from "./Console/Console";
import Editor from "./Editor/Editor";
import SceneGrid from "./SceneGrid/SceneGrid";

const testFile =
  "https://raw.githubusercontent.com/ghalestrilo/seg-react/main/src/lang/tidal/song1.hs";

const testFileLocal = "memento/8-axe.tidal";

const SessionPage = () => {
  const track = useTrackState((state) => state);

  const {
    setTrackData = () => null,
    saveFile = () => null,
    raw = null,
    loadFile,
  } = track;

  useEffect(() => {
    if (raw) return;
    fetch(testFile)
      .then((x) => x.text())
      .then((x) => {
        console.log("raw", x);
        setTrackData(x);
        loadFile(testFileLocal);
      });
  }, [setTrackData, loadFile, raw]);

  if (!track) return <></>;

  return (
    <Container fluid style={{ padding: "2rem" }}>
      <Menu fixed="top" secondary style={{}}>
        <Menu.Item as={"h1"}>{track?.name}</Menu.Item>
        <Menu.Item position="right">
          <Button onClick={saveFile}>save</Button>
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
