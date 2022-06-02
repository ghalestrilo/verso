import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  List,
  Menu,
  Modal,
} from "semantic-ui-react";
import { useProjectsState } from "../state/projects";
import { useTrackState } from "../state/track";
import { SEG_TEST_FILE } from "../web/config";
import Console from "./Console/Console";
import Editor from "./Editor/Editor";
import SceneGrid from "./SceneGrid/SceneGrid";

const testFile = SEG_TEST_FILE;

const ProjectSelectModal = () => {
  const [open, setOpen] = useState(false);
  const { list, refreshProjectList } = useProjectsState();
  const track = useTrackState();

  return (
    <Modal
      trigger={<Button>load</Button>}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
        refreshProjectList();
      }}
      header="Load project"
      content={
        <Modal.Content>
          <List link>
            {list.map((x) => (
              <List.Item
                as="a"
                onClick={(o, data) => {
                  track.loadFile(data.children);
                  setOpen(false);
                }}
              >
                {x}
              </List.Item>
            ))}
          </List>
        </Modal.Content>
      }
      // onActionClick={(e) => track.loadFile}
      // actions={["Load", { key: "done", content: "Done", positive: true }]}
    />
  );
};

const SessionPage = () => {
  const track = useTrackState();

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
          <ButtonGroup>
            <Button onClick={() => saveSessionToFile()}>save</Button>
            <ProjectSelectModal />
          </ButtonGroup>
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
