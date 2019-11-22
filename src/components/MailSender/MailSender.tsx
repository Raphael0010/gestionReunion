import React, { useState } from "react";
import { Button, Input, Modal } from "antd";

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const MailSender: React.FC<Props> = ({ visible, setVisible }) => {
  const [status, setStatus] = useState("");

  const submitForm = (ev: any) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus("SUCCESS");
      } else {
        setStatus("ERROR");
      }
    };
    xhr.send(data);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Modal
        title="Envoyer un rappel"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <form
          onSubmit={submitForm}
          action="https://formspree.io/mwkkdlpb"
          method="POST"
        >
          <Input type="email" name="email" placeholder="Email" />
          <br />
          <br />
          <Input type="text" name="message" defaultValue="Rappel de réunion" />
          <br />
          <br />
          <Button htmlType="submit">Envoyer</Button>
        </form>
      </Modal>
    </div>
  );
};

export default MailSender;
