import React, { useState, useEffect }  from "react";
import { Row, Col, Select, Card, Button } from "antd";
import ModalAddReunion from "../ModalAddReunion/ModalAddReunion";
import MailSender from "../MailSender/MailSender";
import axios from "axios";
import { url } from "../../utils/api";
import { IProjet } from "../../interfaces/IProjet";
import "./Reunion.css";
import { IReunion } from "../../interfaces/IReunion";

const Reunion: React.FC = () => {
  const { Option } = Select;
  const [visibleModalAdd,setVisibleModalAdd] = useState(false);
  const [visibleModalMailSender,setVisibleModalMailSender] = useState(false);
  const showModalAdd = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisibleModalAdd(true);
  }
  const hideModalAdd = () => {
    setVisibleModalAdd(false);
  }
  const showModalMailSender = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisibleModalMailSender(true);
  }
  const hideModalMailSender = () => {
    setVisibleModalMailSender(false);
  }
  const [listeProjet, setListeProjet] = useState<IProjet[]>([]);
  const [reunionAVenir, setReunionAvenir] = useState<IReunion[]>([]);
  const [reunionPasse, setReunionPasse] = useState<IReunion[]>([]);

  const loadProjet = () => {
    axios.get(`${url}/projets`).then(e => {
      setListeProjet(e.data);
    });
  };

  const loadReunion = (id: number) => {
    axios.get(`${url}/reunions/reunion/${id}`).then(e => {
      console.log(e.data);
    });
  };

  const onChangeProjet = (e: any) => {
    loadReunion(parseInt(e));
  };

  useEffect(() => {
    loadProjet();
  }, []);

  return (
    <div>
      <div>
        <Row>
          <Col span={12}>
            <h1>
              Projet :{" "}
              <Select
                showSearch
                className="selectProjet"
                placeholder="Sélectionner un projet"
                onSelect={onChangeProjet}
              >
                {listeProjet.map(e => (
                  <Option key={e.id}>{e.libelle}</Option>
                ))}
              </Select>
            </h1>
          </Col>
          <Col span={12}>
            <p className="addReunion">
              Créer une réunion
              <Button
                style={{ marginLeft: "5%" }}
                type="primary"
                shape="circle"
                icon="plus"
                onClick={showModalAdd}
              />
            </p>
          </Col>
        </Row>
      </div>

      <Row>
        <Col span={12}>
          <div className="reunionBloc">
            <h2 className="center">Réunion à venir</h2>
            {reunionAVenir &&
              reunionAVenir.map(e => (
                <Card className="reunionCard" size="small" title="Réunion : ">
                  <p>Date : ${e.date}</p>
                  <p>Objectif : ${e.objectif}</p>
                  <p>Participant : ${e.participant.map(u => u.name)}</p>
                </Card>
              ))}
          </div>
        </Col>
        <Col span={12}>
          <div className="reunionBloc">
            <h2 className="center">Réunion passée</h2>
            {reunionPasse.length > 0 &&
              reunionPasse.map(e => (
                <Card className="reunionCard" size="small" title="Réunion : ">
                  <p>Date : ${e.date}</p>
                  <p>Objectif : ${e.objectif}</p>
                  <p>Participant : ${e.participant.map(u => u.name)}</p>
                </Card>
              ))}
          </div>
        </Col>
      </Row>
      <Button
        style={{ marginLeft: "5%" }}
        type="primary"
        shape="circle"
        icon="mail"
        onClick={showModalMailSender}
      />
      <ModalAddReunion visible={visibleModalAdd}  setVisible={setVisibleModalAdd}/>
      <MailSender visible={visibleModalMailSender}  setVisible={setVisibleModalMailSender} />
    </div>
  );
};

export default Reunion;
