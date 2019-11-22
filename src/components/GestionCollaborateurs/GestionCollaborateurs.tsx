import React, { useState, useEffect } from "react";
import { ICollabo } from "../../interfaces/ICollabo";
import axios from "axios";
import { Table, Popconfirm, Input } from "antd";
import "./GestionCollaborateurs.css";
import { url } from "../../utils/api";

const GestionCollaborateurs: React.FC = () => {
  const { Column } = Table;
  const Search = Input.Search;

  const [dataSource, setDataSource] = useState<ICollabo[]>([]);
  const [dataSourceFilter, setDataSourceFilter] = useState<ICollabo[]>([]);
  const [filter, setFilter] = useState("");

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
    axios.get(`${url}/collaborateurs`).then(e => {
      const dataCollabo: ICollabo[] = [];
      e.data.map((e: any) => {
        dataCollabo.push({
          key: e.id,
          name: e.name,
          job: e.job
        });
      });
      setDataSource(dataCollabo);
      setDataSourceFilter(dataCollabo);
    });
  };

  const deleteCollabo = (key: any) => {
    console.log("Je délete le :", key);
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
    </div>
  );
};

export default GestionCollaborateurs;
