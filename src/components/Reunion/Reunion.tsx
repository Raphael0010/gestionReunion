import React, { useState }  from "react";
import { Row, Col, Select, Card, Button } from "antd";
import ModalAddReunion from "../ModalAddReunion/ModalAddReunion";
import "./Reunion.css";
const Reunion: React.FC = () => {
  const { Option } = Select;
  const [visibleModalAdd,setVisibleModalAdd] = useState(false);
  const showModalAdd = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisibleModalAdd(true);
  }
  const hideModalAdd = () => {
    setVisibleModalAdd(false);
  }
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
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
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
            <Card className="reunionCard" size="small" title="Réunion : ">
              <p>Date : 19/03/2019</p>
              <p>Objectif : Virer martine de la compta</p>
              <p>Participant : Eude et Jacques</p>
            </Card>
          </div>
        </Col>
        <Col span={12}>
          <div className="reunionBloc">
            <h2 className="center">Réunion passée(s)</h2>
            <Card className="reunionCard" size="small" title="Réunion : ">
              <p>Date : 30/01/2019</p>
              <p>Objectif : Conquérir le monde</p>
              <p>Participant : Louis</p>
            </Card>
          </div>
        </Col>
      </Row>
      <ModalAddReunion visible={visibleModalAdd} setVisible={hideModalAdd} />
    </div>
  );
};

export default Reunion;
