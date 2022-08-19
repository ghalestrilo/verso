import React from "react";
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";

const IntroModal = () => (
  <Modal defaultOpen={true}>
    <ModalHeader>Welcome to Seg!</ModalHeader>
    <ModalContent>
      This is an editor Or click <b onClick={() => alert("feio")}>here</b> to
      load an example file
    </ModalContent>
    <ModalActions>
      <Button onClick={() => {}}>Load Example</Button>
    </ModalActions>
  </Modal>
);

export default IntroModal;
