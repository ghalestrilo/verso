import React from "react";
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
  const { setTrackData } = useTrackState();

  return (
    <Modal
      defaultOpen
      closeIcon
      closeOnDocumentClick
      trigger={<Button icon="question circle"></Button>}
    >
      <ModalHeader>Welcome to Verso!</ModalHeader>
      <ModalContent>
        This is a livecoding editor aimed towards music production (more{" "}
        <a rel="noreferrer" target="_blank" href={repos.self}>
          here
        </a>
        )
        <br />
        It organizes your code into blocks so long as you follow a few
        conventions:
        <br />
        <ul>
          <li>
            Create new blocks in{" "}
            <a rel="noreferrer" target="_blank" href={repos.tidal}>
              tidalcycles
            </a>{" "}
            syntax by adding commands to "do" blocks, as follow:
            <br />
            <br />
            <code style={{ whiteSpace: "pre-wrap" }}>
              {examples.codeSample.tidal}
            </code>
          </li>
          <li>
            Using{" "}
            <a
              rel="noreferrer"
              target="_blank"
              href="https://tidalcycles.org/docs/reference/patterns/#classic-pattern-names"
            >
              <code>d1, d2 ...</code> or <code>p "name"</code>
            </a>{" "}
            to define channels will create them as separate columns on the grid
          </li>
          <li>
            New blocks will appear as rows. Trigger each one by pressing ▶️
          </li>
          <li>Happy Hacking!!</li>
        </ul>
        Need help? Get started with an example by clicking "Load Example"
        <br />
      </ModalContent>
      <ModalActions>
        <Button
          as={"a"}
          secondary
          rel="noreferrer"
          target="_blank"
          href={repos.self}
        >
          github
        </Button>
        <Button
          onClick={() => {
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
