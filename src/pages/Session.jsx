import React from "react";
import {
  Container,
  Divider,
  Form,
  Grid,
  Header,
  TextArea,
} from "semantic-ui-react";

const instruments = ["drums", "keys", "blips"];
const scenes = ["Scene 1", "Scene 2", "Scene 3"].map((name) => ({
  name,
  actions: Object.fromEntries(
    ["blips", "drums", "keys"].map((instrumentName) => [
      instrumentName.toString(),
      `${instrumentName} pattern`,
    ])
  ),
}));
const trackname = "Trackname";

const SceneGrid = () => (
  <Grid columns={instruments.length + 1} divided>
    <Grid.Row>
      <Grid.Column>
        <Header as="h4">Scene</Header>
      </Grid.Column>
      {instruments.map((instrumentName) => (
        <Grid.Column>
          <Header as="h4">{instrumentName}</Header>
        </Grid.Column>
      ))}
    </Grid.Row>

    {scenes.map(({ name, actions }) => (
      <Grid.Row>
        <Grid.Column>{name}</Grid.Column>
        {instruments.map((instrumentName) => (
          <Grid.Column>{actions[instrumentName]}</Grid.Column>
        ))}
      </Grid.Row>
    ))}
  </Grid>
);

const Console = () => {
  const contents = "lorem ipsum";

  return <Container>{contents}</Container>;
};

const Editor = () => {
  return (
    <Form>
      <Form.TextArea disabled />
    </Form>
  );
};

const SessionPage = () => {
  return (
    <Container fluid style={{ padding: "2rem" }}>
      <Header as={"h1"}>{trackname}</Header>
      <Grid columns={2} divided>
        <Grid.Column>
          <Grid.Row>
            <SceneGrid />
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
