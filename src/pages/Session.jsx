import React from "react";
import { Container, Grid, Header } from "semantic-ui-react";

const instruments = ["drums", "keys", "blips"];
const scenes = ["asd1", "asd2", "asd3"].map((name) => ({
  name,
  actions: Object.fromEntries(
    ["blips", "drums", "keys"].map((instrumentName) => [
      instrumentName.toString(),
      `${instrumentName} pattern`,
    ])
  ),
}));
const trackname = "Trackname";

const SessionPage = () => {
  return (
    <Container>
      <Header as={"h1"}>{trackname}</Header>
      <Grid columns={instruments.length + 1} divided>
        <Grid.Row>
          <Grid.Column>Scene</Grid.Column>
          {instruments.map((instrumentName) => (
            <Grid.Column>{instrumentName}</Grid.Column>
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
    </Container>
  );
};

export default SessionPage;
