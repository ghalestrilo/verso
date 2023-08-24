import { Button, Divider, Form, Modal } from "semantic-ui-react";
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
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    settings.updateSettings(data);
  };

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
              <input
                defaultValue={settings.conn.host}
                {...register("conn.host", { required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label>Backend Port</label>
              <input
                defaultValue={settings.conn.port}
                {...register("conn.port", {
                  required: true,
                  pattern: /\d+/,
                })}
              />
            </Form.Field>

            <Form.Field>
              <label>Initial Folder</label>
              <input
                defaultValue={settings.init.folder}
                {...register("init.folder", { required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label>Initial File</label>
              <input
                defaultValue={settings.init.file}
                {...register("init.file", { required: true })}
              />
            </Form.Field>
            <Divider />
            <Form.Field>
              <label>Processes</label>
              <input
                type="textarea"
                defaultValue={settings.init.file}
                {...register("processes", { required: true })}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
      }
      actions={[
        <Button
          type="submit"
          color="green"
          disabled={errors && Object.keys(errors).length > 0}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>,
      ]}
    />
  );
};

export default SettingsModal;
