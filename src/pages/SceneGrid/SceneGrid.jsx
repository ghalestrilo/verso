import { Grid, Header } from "semantic-ui-react";

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

export default SceneGrid;
