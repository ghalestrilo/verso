import React from "react";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Button,
//   Tr,
//   Th,
//   Td,
//   TableContainer,
//   IconButton,
//   Box,
// } from "@chakra-ui/react";
// import { TriangleUpIcon } from "@chakra-ui/icons";
// import { IconPlayerPlay } from "@tabler/icons";

import DataGrid from "react-data-grid";

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

  console.log(columns);
  console.table(rows);

  return <DataGrid columns={columns} rows={rows}></DataGrid>;
};

// <TableContainer width={"100%"}>
//   <Box overflow="auto" maxHeight={`${maxHeight}px`}>
//     <SceneTable size="sm">
//       <Thead position="sticky" top={0} bgColor="white">
//         <Tr>
//           <Th minWidth={'6rem'}>Scene</Th>
//           {channels.map((channelName, idx) => (
//             <Th key={`${channelName}_header_${idx}`}>{channelName}</Th>
//           ))}
//         </Tr>
//       </Thead>
//       <Tbody>
//         {scenes.map(
//           ({ meta, actions, raw }, idx) =>
//             actions && (
//               <Tr key={`${meta?.name}_${idx}`}>
//                 <Td>
//                   {onClickScenePlay && (
//                     <IconButton
//                       size={"xs"}
//                       variant="ghost"
//                       colorScheme="teal"
//                       aria-label="Play scene"
//                       onClick={() => onClickScenePlay(raw)}
//                       icon={<IconPlayerPlay size={12} />}
//                     />
//                   )}
//                   {meta?.name}
//                 </Td>
//                 {channels.map((channelName) => (
//                   <Td
//                     key={`${channelName}_${idx}`}
//                     background={
//                       meta?.colors?.[channelName] &&
//                       `${meta?.colors?.[channelName]}.100`
//                     }
//                   >
//                     {actions[channelName]}
//                   </Td>
//                 ))}
//               </Tr>
//             )
//         )}
//       </Tbody>
//     </SceneTable>
//   </Box>
// </TableContainer>

export default SceneGrid;
