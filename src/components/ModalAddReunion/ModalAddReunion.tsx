import React, { useState } from "react";
import {Button,Select,Input,Modal,DatePicker} from "antd";
import { Redirect, useHistory } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import "./ModalAddReunion.css";

interface Props {
    visible : boolean;
    setVisible : (value: boolean) => void;
}

const ModalAddReunion: React.FC<Props> = ({visible,setVisible}) => {
    const { TextArea } = Input;
    const { Option } = Select;

    const [nom,setNom] = useState("");
    const [participants,setParticipants] = useState([]);
    const [date,setDate] = useState(Date);
    const [lieu,setLieu] = useState("");
    const [objectif,setObjectif] = useState("");


    const onChangeNom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value);
    }
    const onChangeParticipants = (event: React.ChangeEvent<HTMLInputElement>) => {
        //setParticipants(event.target.value);
    }
    const onChangeDate = (date: moment.Moment | null, dateString: string) => {
        console.log(dateString);
        //setDate(event.target.value);
    }
    const onChangeLieu = (event: React.ChangeEvent<HTMLInputElement>) => {
        //setLieu(event.target.value);
    }
    const onChangeObjectif = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        //setObjectif(event.target.value);
    }

    const createReunion = () => {
        /*axios.post('api/login', { nom, participants, date, lieu, objectif })
        .then((result) => {
        
        }
        );*/
    }
    const handleCancel = () => {
        setVisible(false);
    }

    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    return (
    <div>
        <Modal
            title="Ajouter une réunion"
            visible={visible}
            onCancel={handleCancel}
            footer={<div><Button onClick={handleCancel}>Fermer</Button><Button type="primary" onClick={createReunion}>Ajouter</Button></div>}
        >
            <Input placeholder="Nom" onChange={onChangeNom} />
            <br/><br/>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Participants"
                onChange={onChangeParticipants}
            >
                {children}
            </Select>
            <br/><br/>
            <DatePicker style={{ width: '100%' }} onChange={onChangeDate} />
            <br/><br/>
            <Input placeholder="Lieu" onChange={onChangeLieu} />
            <br/><br/>
            <TextArea rows={4} onChange={onChangeObjectif} />
        </Modal>
    </div>
    );
};

export default ModalAddReunion;
