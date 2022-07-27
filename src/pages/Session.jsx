import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Menu,
  Modal,
  Segment,
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
        <Modal.Content scrolling>
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
      <Menu secondary size="tiny" fluid compact>
        <Menu.Item>
          <Header as={"h1"}>{track?.name}</Header>
        </Menu.Item>
        <Menu.Item position="right">
          <ButtonGroup size="tiny">
            <Button onClick={() => saveSessionToFile()}>save</Button>
            <ProjectSelectModal />
          </ButtonGroup>
        </Menu.Item>
      </Menu>
      <Divider />
      <Grid columns={2} padded>
        <Grid.Column>
          <SceneGrid track={track} />
        </Grid.Column>
        <Grid.Column>
          <Editor />
          <Divider />
          <Console />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default SessionPage;
