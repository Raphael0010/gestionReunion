import React, { useState } from "react";
import { Button, Icon, Input, Modal, Alert } from "antd";
import "./Login.css";
import { testLogin } from "../../utils/login";

const Login: React.FC = () => {
  const [visibleModal] = useState(true);
  const [email, setEmail] = useState("");
  const [loginBack, setLoginBack] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    setLoginBack("");
    const user = await testLogin(email, password);
    if (user) {
      document.location.replace("/reunion");
    } else {
      setLoginBack("Email ou mot de passe incorrect");
    }
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Modal
        title="Connexion"
        visible={visibleModal}
        footer={<Button onClick={login}>Connexion</Button>}
        mask={false}
        closable={false}
      >
        {loginBack && (
          <Alert
            style={{ marginBottom: "4%" }}
            message={loginBack}
            type="error"
          />
        )}
        <Input
          prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder=" Email"
          onChange={onChangeEmail}
        />
        <br />
        <br />
        <Input.Password
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder=" Mot de passe"
          onChange={onChangePassword}
        />
      </Modal>
    </div>
  );
};

export default Login;
