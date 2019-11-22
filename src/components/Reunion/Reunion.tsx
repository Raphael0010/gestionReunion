import React, { useState, useEffect } from "react";
import { Row, Col, Select, Card, Button, Icon, Alert } from "antd";
import axios from "axios";
import { url } from "../../utils/api";
import { IProjet } from "../../interfaces/IProjet";
import "./Reunion.css";
import { IReunion } from "../../interfaces/IReunion";
import ModalAddReunion from "../ModalAddReunion/ModalAddReunion";
import ModalEditReunion from "../ModalUpdateReunion/ModalUpdateReunion";
import MailSender from "../MailSender/MailSender";

const Reunion: React.FC = () => {
  const { Option } = Select;
  const [visibleModalAdd, setVisibleModalAdd] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [visibleModalMailSender, setVisibleModalMailSender] = useState(false);
  const [listeProjet, setListeProjet] = useState<IProjet[]>([]);
  const [reunionAVenir, setReunionAvenir] = useState<IReunion[]>([]);
  const [reunionPasse, setReunionPasse] = useState<IReunion[]>([]);
  const [activeId, setActiveId] = useState(0);

  const showModalMailSender = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setVisibleModalMailSender(true);
  };

  const loadProjet = () => {
    axios.get(`${url}/projets`).then(e => {
      setListeProjet(e.data);
    });
  };

  const showModalAdd = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisibleModalAdd(true);
  };

  const showModalEdit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setActiveId(parseInt(event.currentTarget.id));
    setVisibleModalEdit(true);
  };

  const loadReunion = (id: number) => {
    axios.get(`${url}/reunions/${id}`).then(e => {
      const dataReuAVenir: IReunion[] = [];
      const dataReuPasse: IReunion[] = [];
      e.data.map((e: any) => {
        if (new Date(e.date).getTime() > new Date().getTime()) {
          dataReuAVenir.push({
            id: e.id,
            date: e.date,
            createur: {
              key: e.createur.id,
              name: e.createur.nom + " " + e.createur.prenom,
              job: e.createur.role.libelle
            },
            objectif: e.objectif,
            compteRendu: e.compteRendu,
            lieu: e.lieu,
            projet: { id: e.projet.id, libelle: e.projet.libelle },
            participant: e.participant.map((k: any) => {
              return {
                key: k.id,
                name: k.nom + " " + k.prenom,
                job: k.role.libelle
              };
            })
          });
        } else {
          dataReuPasse.push({
            id: e.id,
            date: e.date,
            createur: {
              key: e.createur.id,
              name: e.createur.nom + " " + e.createur.prenom,
              job: e.createur.role.libelle
            },
            objectif: e.objectif,
            compteRendu: e.compteRendu,
            lieu: e.lieu,
            projet: { id: e.projet.id, libelle: e.projet.libelle },
            participant: e.participant.map((k: any) => {
              return {
                key: k.id,
                name: k.nom + " " + k.prenom,
                job: k.role.libelle
              };
            })
          });
        }
      });
      setReunionPasse(dataReuPasse);
      setReunionAvenir(dataReuAVenir);
    });
  };

  const onChangeProjet = (e: any) => {
    loadReunion(parseInt(e));
  };

  useEffect(() => {
    loadProjet();
  }, [visibleModalAdd]);

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
              Envoyer un rappel
              <Button
                style={{ marginLeft: "2%", marginRight: "5%" }}
                type="primary"
                shape="circle"
                icon="mail"
                onClick={showModalMailSender}
              />
              Créer une réunion
              <Button
                style={{ marginLeft: "2%" }}
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
                <Card
                  className="reunionCard"
                  size="small"
                  title={`Réunion : ${e.objectif}`}
                  key={`${e.id}`}
                  extra={<Button shape="circle" icon="edit" />}
                >
                  {e.compteRendu === null && (
                    <p>
                      <Alert
                        message="Vous n'avez pas rédigé de compte-rendu"
                        type="warning"
                      />
                    </p>
                  )}
                  <p>Date : {new Date(e.date).toDateString()}</p>
                  <p>Créateur : {e.createur.name} </p>
                  <p>Salle : {e.lieu} </p>
                  <p>Projet : {e.projet.libelle} </p>
                  <p>Participant : {e.participant.map(u => u.name + " ")}</p>
                </Card>
              ))}
          </div>
        </Col>
        <Col span={12}>
          <div className="reunionBloc">
            <h2 className="center">Réunion passée</h2>
            {reunionPasse.length > 0 &&
              reunionPasse.map(e => (
                <Card
                  className="reunionCard"
                  size="small"
                  title={`Réunion : ${e.objectif}`}
                  key={`${e.id}`}
                  extra={
                    <Button
                      id={`${e.id}`}
                      onClick={showModalEdit}
                      shape="circle"
                      icon="edit"
                    />
                  }
                >
                  {e.compteRendu === null && (
                    <p>
                      <Alert
                        message="Vous n'avez pas rédigé de compte-rendu"
                        type="warning"
                      />
                    </p>
                  )}
                  <p>Date : {new Date(e.date).toDateString()}</p>
                  <p>Créateur : {e.createur.name} </p>
                  <p>Salle : {e.lieu} </p>
                  <p>Projet : {e.projet.libelle} </p>
                  <p>Participant : {e.participant.map(u => u.name + " ")}</p>
                </Card>
              ))}
          </div>
        </Col>
      </Row>

      <ModalAddReunion
        visible={visibleModalAdd}
        setVisible={setVisibleModalAdd}
      />
      <MailSender
        visible={visibleModalMailSender}
        setVisible={setVisibleModalMailSender}
      />
      <ModalEditReunion
        id="0"
        visible={visibleModalEdit}
        setVisible={setVisibleModalEdit}
      />
    </div>
  );
};

export default Reunion;
