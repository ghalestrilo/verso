import {
  Divider,
  Heading,
  IconButton,
  List,
  ListItem,
  Modal,
  ModalContent,
  ModalOverlay,
  MenuItem,
  Text,
  Menu,
  useDisclosure,
  Box,
  Input,
} from "@chakra-ui/react";
import { IconFileDescription } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { useProjectsState } from "../../state/projects";
import { useTrackState } from "../../state/track";

export const ProjectSelectModal = () => {
  const [filter, setFilter] = useState("");
  const handleFilterChange = (event) => setFilter(event.target.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { list, refreshProjectList } = useProjectsState();
  const track = useTrackState();

  useEffect(() => {
    refreshProjectList();
    setFilter("");
  }, []);

  return (
    <>
      <IconButton
        icon={<IconFileDescription size={18} />}
        onClick={() => {
          onOpen();
          refreshProjectList();
        }}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        header="Load project"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent p={4}>
          <Heading>Project Select</Heading>
          <Input
            value={filter}
            onChange={handleFilterChange}
            placeholder="my-project.tidal"
            size="sm"
          />
          <Divider />
          <Box scrollBehavior="initial" overflow="scroll">
            <List as={Menu} size="sm">
              {list
                .filter((filename) => filename.includes(filter))
                .map((filename) => (
                  <ListItem
                    as={MenuItem}
                    onClick={() => {
                      console.log(filename);
                      track.loadFile(filename);
                      onClose();
                    }}
                  >
                    {filename}
                  </ListItem>
                ))}
            </List>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
