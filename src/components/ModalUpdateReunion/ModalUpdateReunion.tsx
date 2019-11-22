import React, { useState, useEffect } from "react";
import {Button,Select,Input,Modal,DatePicker,TimePicker} from "antd";
import { Redirect, useHistory } from "react-router-dom";
import { url } from "../../utils/api";
import axios from 'axios';
import moment from 'moment';
import { IProjet } from "../../interfaces/IProjet";
import { ICollabo } from "../../interfaces/ICollabo";
import { IOption } from "../../interfaces/IOption";

interface Props {
    visible : boolean;
    setVisible : (value: boolean) => void;
}

const ModalAddReunion: React.FC<Props> = ({visible,setVisible}) => {
    const { TextArea } = Input;
    const { Option } = Select;

    const [nom,setNom] = useState("");
    const [projet,setProjet] = useState(0);
    const [listeProjet, setListeProjet] = useState<IProjet[]>([]);
    const [listeCollabo, setListeCollabo] = useState<ICollabo[]>([]);
    const [participants,setParticipants] = useState([]);
    const [date,setDate] = useState(Date);
    const [lieu,setLieu] = useState("");
    const [optionCollabo, setOptionCollabo] = useState<IOption[]>([]);
    const [listStrCollabo,setListStrCollabo] = useState("");
    const [time,setTime] = useState("");

    const [idCreateur] = useState(1);


    const onChangeNom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value);
    }
    const onChangeProjet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjet(parseInt(String(event)));
    }
    const onChangeParticipants = (event: any) => {
        var tab = Array(event);
        setParticipants(tab[0]);
    }
    const onChangeDate = (date: moment.Moment | null, dateString: string) => {
        setDate(dateString);
    }
    const onChangeTime = (time: moment.Moment, timeString: string) => {
        setTime(timeString);
    }
    const onChangeLieu = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLieu(event.target.value);
    }
    const onSetOptionCollabo = (o : IOption) => {
        let optionCollab = optionCollabo;
        optionCollab.push(o);
        setOptionCollabo(optionCollab);
    }

    const loadProjet = () => {
        axios.get(`${url}/projets`).then(e => {
          setListeProjet(e.data);
        });
      };

    const loadCollabo = () => {
        axios.get(`${url}/collaborateurs`).then(e => {
            e.data.map((e:any) => {
                onSetOptionCollabo({key:e.id, nom: e.name});
            });
        });
      };
   
    
    const createReunion = () => {
        var datetime = new Date(date +"T"+ time);
        axios.post(`${url}/reunions`,{date:datetime,lieu:lieu,objectif:nom,collaborateurs:participants,id_createur:idCreateur,projet:projet}).then(e => {
            //console.log(e);
        });
    }
    const handleCancel = () => {
        setVisible(false);
    }

    useEffect(() => {
        loadProjet();
        loadCollabo();
    }, []);

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
                placeholder="Projet"
                style={{ width: '100%' }}
                onChange={onChangeProjet}
              >
                {listeProjet.map(e => {
                  return <Option key={e.id}>{e.libelle}</Option>;
                })}
            </Select>
            <br/><br/>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Participants"
                onChange={onChangeParticipants}
            >
                {optionCollabo.map((e)=> {
                    return <Option key={e.key}>{e.nom}</Option>
                })}
            </Select>
            <br/><br/>
            <DatePicker placeholder="Date" style={{ width: '100%' }} onChange={onChangeDate} />
            <br/><br/>
            <TimePicker placeholder="Heure" onChange={onChangeTime} style={{ width: '100%' }} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
            <br/><br/>
            <Input placeholder="Lieu" onChange={onChangeLieu} />
        </Modal>
    </div>
    );
};

export default ModalAddReunion;
