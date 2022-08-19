import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";

import { repos, examples } from "../../meta";
import { useTrackState } from "../../state/track";

const IntroModal = () => {
  const [open, setopen] = useState(true);
  const { setTrackData } = useTrackState();

  return (
    <Modal open={open} closeIcon>
      <ModalHeader>Welcome to Seg!</ModalHeader>
      <ModalContent>
        This is a livecoding editor aimed towards music production (read more{" "}
        <a href={repos.self}>here</a>)
        <br />
        It organizes your code into blocks so long as you follows a few
        conventions
        <br />
        For example: create new blocks in <a href={repos.tidal}>
          tidalcycles
        </a>{" "}
        syntax by adding commands to "do" blocks as described below
        <code>{examples.codeSample.tidal}</code>
        <br />
        These will be automatically organized on the left and you can play them
        by pressing ▶️
        <br />
        <br />
        Or get started with an example by clicking below
        <br />
      </ModalContent>
      <ModalActions>
        <Button
          onClick={() => {
            setopen(false);
            setTrackData(examples.fileData.tidal);
          }}
        >
          Load Example
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default IntroModal;
