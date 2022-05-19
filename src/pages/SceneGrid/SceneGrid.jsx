import React from "react";
import { Grid, Header } from "semantic-ui-react";

const SceneGrid = ({ track }) => {
  console.log(track);
  return (
    <Grid columns={(track?.instruments?.length || 0) + 1} divided>
      <Grid.Row>
        <Grid.Column>
          <Header as="h4">Scene</Header>
        </Grid.Column>
        {track?.instruments?.map((instrumentName) => (
          <Grid.Column>
            <Header as="h4">{instrumentName}</Header>
          </Grid.Column>
        ))}
      </Grid.Row>

      {track?.scenes?.map(({ name, actions }) => (
        <Grid.Row>
          <Grid.Column>{name}</Grid.Column>
          {track?.instruments?.map((instrumentName) => (
            <Grid.Column>{actions[instrumentName]}</Grid.Column>
          ))}
        </Grid.Row>
      ))}
    </Grid>
  );
};

export default SceneGrid;
