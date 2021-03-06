import React, { useState, useEffect } from "react";
import { Button, Select, Input, Modal, message } from "antd";
import { url } from "../../utils/api";
import axios from "axios";
import { IProjet } from "../../interfaces/IProjet";

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const ModalAddCollabo: React.FC<Props> = ({ visible, setVisible }) => {
  const { Option } = Select;

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [poste, setPoste] = useState(0);
  const [listePoste, setListePoste] = useState<IProjet[]>([]);
  const [motDePasse, setMotDePasse] = useState("");
  const [email, setEmail] = useState("");

  const onChangePrenom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrenom(event.target.value);
  };
  const onChangeNom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };
  const onChangePoste = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoste(parseInt(String(event)));
  };
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangeMotDePasse = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMotDePasse(event.target.value);
  };

  const loadPoste = () => {
    axios.get(`${url}/roles`).then(e => {
      setListePoste(e.data);
    });
  };

  const createCollabo = () => {
    axios
      .post(`${url}/collaborateurs`, {
        prenom: prenom,
        nom: nom,
        role: poste,
        password: motDePasse,
        mail: email
      })
      .then(e => {
        if (e.data) {
          message.success("Collaborateur ajouté");
          setVisible(false);
        }
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    loadPoste();
  }, []);

  return (
    <div>
      <Modal
        title="Ajouter un collaborateur"
        visible={visible}
        onCancel={handleCancel}
        footer={
          <div>
            <Button onClick={handleCancel}>Fermer</Button>
            <Button type="primary" onClick={createCollabo}>
              Ajouter
            </Button>
          </div>
        }
      >
        <Input placeholder="Prénom" onChange={onChangePrenom} />
        <br />
        <br />
        <Input placeholder="Nom" onChange={onChangeNom} />
        <br />
        <br />
        <Select
          placeholder="Poste"
          style={{ width: "100%" }}
          onChange={onChangePoste}
        >
          {listePoste.map(e => {
            return <Option key={e.id}>{e.libelle}</Option>;
          })}
        </Select>
        <br />
        <br />
        <Input placeholder="Email" onChange={onChangeEmail} />
        <br />
        <br />
        <Input.Password
          placeholder="Mot de passe"
          onChange={onChangeMotDePasse}
        />
      </Modal>
    </div>
  );
};

export default ModalAddCollabo;
