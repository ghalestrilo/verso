import React from "react";
import { Grid, Header } from "semantic-ui-react";

const SceneGrid = ({ track }) => {
  // console.log(track);
  console.log(track);
  return (
    <Grid columns={(track?.channels?.length || 0) + 1} divided>
      <Grid.Row>
        <Grid.Column>
          <Header as="h4">Scene</Header>
        </Grid.Column>
        {track?.channels?.map((channelName) => (
          <Grid.Column>
            <Header as="h4">{channelName}</Header>
          </Grid.Column>
        ))}
      </Grid.Row>

      {track?.scenes?.map(
        ({ name, actions }) =>
          actions && (
            <Grid.Row>
              <Grid.Column>{name}</Grid.Column>
              {track?.channels?.map((channelName) => (
                <Grid.Column>{actions[channelName]}</Grid.Column>
              ))}
            </Grid.Row>
          )
      )}
    </Grid>
  );
};

export default SceneGrid;
