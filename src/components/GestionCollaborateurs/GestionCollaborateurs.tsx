import React, { useState, useEffect } from "react";
import { ICollabo } from "../../interfaces/ICollabo";
import { Table, Popconfirm, Input, Col, Button, Modal } from "antd";
import { url } from "../../utils/api";
import axios from 'axios';
import ModalAddCollabo from "../ModalAddCollabo/ModalAddCollabo";
import "./GestionCollaborateurs.css";

const GestionCollaborateurs: React.FC = () => {
  const { Column } = Table;
  const Search = Input.Search;

  const [dataSource, setDataSource] = useState<ICollabo[]>([]);
  const [dataSourceFilter, setDataSourceFilter] = useState<ICollabo[]>([]);
  const [filter, setFilter] = useState("");
  const [visibleModalAdd,setVisibleModalAdd] = useState(false);

  const showModalAdd = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisibleModalAdd(true);
  }
  const hideModalAdd = () => {
    setVisibleModalAdd(false);
  }
  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    if (filter.trim() === "") {
      loadData();
      return;
    }
    setDataSource(
      dataSourceFilter.filter(e =>
        e.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const loadData = () => {
    setDataSource([
      {
        key: "1",
        name: "John doe",
        job: "Chef de projet"
      },
      {
        key: "2",
        name: "Jim Green",
        job: "Développeur"
      },
      {
        key: "3",
        name: "Joe Travolta",
        job: "Comptable"
      }
    ]);
    setDataSourceFilter([
      {
        key: "1",
        name: "John doe",
        job: "Chef de projet"
      },
      {
        key: "2",
        name: "Jim Green",
        job: "Développeur"
      },
      {
        key: "3",
        name: "Joe Travolta",
        job: "Comptable"
      }
    ]);
  };

  const deleteCollabo = (key: any) => {
    console.log(key);
    axios.get(`${url}/collaborateurs/delete/`+key).then(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Search
          className="searchBar"
          placeholder="Rechercher..."
          onChange={onChangeFilter}
          value={filter}
        />
        <Button
          style={{ marginLeft: "2%" }}
          type="primary"
          shape="circle"
          icon="plus"
          onClick={showModalAdd}
        />
      </div>

      <Table pagination={false} dataSource={dataSource}>
        <Column title="Collaborateur" dataIndex="name" key="name" />
        <Column title="Poste" dataIndex="job" key="job" />
        <Column
          title="Action"
          key="action"
          render={(record: any) => (
            <span>
              <Popconfirm
                title="Etes vous sûr ?"
                onConfirm={() => deleteCollabo(record.key)}
              >
                <a>Supprimer</a>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
      <ModalAddCollabo visible={visibleModalAdd}  setVisible={setVisibleModalAdd} />
    </div>
  );
};

export default GestionCollaborateurs;
