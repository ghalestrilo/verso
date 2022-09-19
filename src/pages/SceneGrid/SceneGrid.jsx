import React from "react";
import { Button, Table } from "semantic-ui-react";
import { useReplState } from "../../state/repl";

const SceneGrid = ({ track }) => {
  const { channels, scenes } = track;

  const { send: fireScene, plugin } = useReplState();

  return (
    <div style={{ height: "100%", overflowY: "scroll" }}>
      <Table celled selectable compact>
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
            ({ meta, actions, raw }) =>
              actions && (
                <Table.Row>
                  <Table.Cell>
                    <Button
                      compact
                      onClick={() => fireScene(plugin.prepareCommand(raw))}
                      size="mini"
                      icon="play"
                    ></Button>
                    {meta?.name}
                  </Table.Cell>
                  {channels.map((channelName) => (
                    <Table.Cell>{actions[channelName]}</Table.Cell>
                  ))}
                </Table.Row>
              )
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default SceneGrid;
