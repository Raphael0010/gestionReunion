import React, { useState } from "react";
import {Button,Icon,Input,Modal} from "antd";
import { Redirect, useHistory } from "react-router-dom";
import axios from 'axios';
import "./Login.css";


const Login: React.FC = () => {
    const [visibleModal] = useState(true);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const login = () => {
        /*axios.post('api/login', { email, password })
        .then((result) => {
        
        }
        );*/
        document.location.replace("/");
    };

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }


    return (
    <div>
        <Modal
            title="Connexion"
            visible={visibleModal}
            footer={<Button onClick={login}>Connexion</Button>}
            mask={false}
            closable={false}
        >
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" Email" onChange={onChangeEmail} />
            <br/><br/>
            <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder=" Mot de passe" onChange={onChangePassword} />
        </Modal>
    </div>
    );
};

export default Login;
