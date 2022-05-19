import React, { useEffect } from "react";
import { Container, Divider, Grid, Header } from "semantic-ui-react";
import { useTrackState } from "../state/track";
import Console from "./Console/Console";
import Editor from "./Editor/Editor";
import SceneGrid from "./SceneGrid/SceneGrid";

const testFile =
  "https://raw.githubusercontent.com/ghalestrilo/seg-react/main/src/lang/tidal/song1.hs";

const SessionPage = () => {
  const track = useTrackState((state) => state);

  useEffect(() => {
    if (track && !track.raw) {
      fetch(testFile)
        .then((x) => x.text())
        .then((x) => {
          console.log("raw", x);
          track.load(x);
        });
    }
  }, [track]);

  if (!track) return <></>;

  return (
    <Container fluid style={{ padding: "2rem" }}>
      <Header as={"h1"}>{track?.name}</Header>
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
