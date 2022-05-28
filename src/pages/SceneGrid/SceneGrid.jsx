import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useReplState } from "../../state/repl";

// TODO: lang.prepareCommand
const prepareCommand = (raw) => `:{\n ${raw} \n:}`;

const SceneGrid = ({ track }) => {
  // console.log(track);
  console.log(track);
  const { channels, scenes } = track;

  const { send: fireScene } = useReplState();

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
            ({ name, actions, raw }) =>
              actions && (
                <Table.Row>
                  <Table.Cell>
                    <Button
                      compact
                      onClick={() => fireScene(prepareCommand(raw))}
                      size="mini"
                      icon="play"
                    >
                      {name}
                    </Button>
                  </Table.Cell>
                  {channels.map((channelName) => (
                    <Table.Cell>{actions[channelName]}</Table.Cell>
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
