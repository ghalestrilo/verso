import React from "react";
import { Table } from "semantic-ui-react";

const SceneGrid = ({ track }) => {
  // console.log(track);
  console.log(track);
  const { channels, scenes } = track;

  const fireScene = () => alert("haha");

  return (
    <>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Scene</Table.HeaderCell>
            {channels.map((channelName) => (
              <Table.HeaderCell>{channelName}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {scenes.map(
            ({ name, actions }) =>
              actions && (
                <Table.Row>
                  <Table.Cell onClick={fireScene}>{name}</Table.Cell>
                  {channels.map((channelName) => (
                    <Table.Cell onClick={fireScene}>
                      {actions[channelName]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
    </>
  );
};

export default SceneGrid;
