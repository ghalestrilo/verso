import { Button, Form, Modal } from "semantic-ui-react";
import React, { useState } from "react";
import { useSettingsState } from "../../state/settings";

import { useForm } from "react-hook-form";

const SettingsModal = () => {
  const [open, setOpen] = useState(false);

  const settings = useSettingsState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <Modal
      trigger={<Button icon="settings"></Button>}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => {
        setOpen(true);
      }}
      header="Settings"
      content={
        <Modal.Content scrolling>
          <Form>
            <Form.Field>
              <label>Backend Host</label>
              <input {...register("connHost", { required: true })} />
            </Form.Field>

            <Form.Field>
              <label>Backend Port</label>
              <input {...register("connPort", { required: true })} />
            </Form.Field>

            <Form.Field>
              <label>Initial Folder</label>
              <input {...register("initFolder", { required: true })} />
            </Form.Field>

            <Form.Field>
              <label>Initial File</label>
              <input {...register("initFile", { required: true })} />
            </Form.Field>
          </Form>
        </Modal.Content>
      }
      actions={[
        <Button type="submit" color="green" onClick={handleSubmit(onSubmit)}>
          Save
        </Button>,
      ]}
    />
  );
};

export default SettingsModal;
