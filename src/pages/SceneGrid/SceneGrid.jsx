import React from "react";
import ReactDOM from "react-dom";
import "react-data-grid/lib/styles.css";
import ReactDataGrid from "react-data-grid";

const SceneGrid = ({ track, onClickScenePlay, plugin, maxHeight = 700 }) => {
  const { channels, scenes } = track;

  const columns = [
    { key: "id", name: "ID" },
    ...channels.map((name) => ({ key: name, name: name })),
  ];
  const rows = scenes.map(({ actions, meta }, id) => ({
    id,
    ...Object.fromEntries(channels.map((name) => [name, actions[name] || ""])),
  }));

  return (
    <ReactDataGrid
      rowsCount={rows.length}
      minHeight={150}
      enableCellSelect={true}
      direction="ltr"
      columns={columns}
      rows={rows}
    ></ReactDataGrid>
  );
};

export default SceneGrid;
