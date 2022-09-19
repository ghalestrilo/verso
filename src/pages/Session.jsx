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
  Sticky,
} from "semantic-ui-react";
import config from "../config/config";
import { useProjectsState } from "../state/projects";
import { useReplState } from "../state/repl";
import { useSettingsState } from "../state/settings";
import { useTrackState } from "../state/track";
import Console from "./Console/Console";
import Editor from "./Editor/Editor";
import IntroModal from "./IntroModal/IntroModal";
import SceneGrid from "./SceneGrid/SceneGrid";
import SettingsModal from "./SettingsModal/SettingsModal";

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
  const initFile = config.init.file;

  const track = useTrackState();
  const { stopPlayback, requestRestart } = useReplState();
  const { processes } = useSettingsState();

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
    fetch(initFile)
      .then((x) => x.text())
      .then((x) => {
        loadFile(initFile);
        setLoadedTestFile(true);
      });
  }, [setTrackData, loadFile, raw, loadedTestFile, initFile]);

  if (!track) return <></>;

  return (
    <div>
      <Container fluid style={{ padding: "2rem" }}>
        <Menu secondary size="tiny" fluid compact>
          <Menu.Item>
            <Header as={"h1"}>{track?.name}</Header>
          </Menu.Item>
          <Menu.Item position="right">
            <ButtonGroup size="tiny">
              <SettingsModal />
              <IntroModal />
              <Button icon="stop" onClick={() => stopPlayback()}></Button>
              <Button
                icon="refresh"
                onClick={() => requestRestart(processes)}
              ></Button>
              <Button onClick={() => saveSessionToFile()}>save</Button>
              <ProjectSelectModal />
            </ButtonGroup>
          </Menu.Item>
        </Menu>
        <Divider />
        <Grid columns={2} padded style={{ maxHeight: "50%" }}>
          <Grid.Column>
            <SceneGrid track={track} />
          </Grid.Column>
          <Grid.Column style={{ maxHeight: 700 }}>
            <Editor />
          </Grid.Column>
        </Grid>
        <Console />
      </Container>
    </div>
  );
};

export default SessionPage;
