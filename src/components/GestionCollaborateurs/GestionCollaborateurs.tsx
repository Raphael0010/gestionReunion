import React, { useState, useEffect } from "react";
import { ICollabo } from "../../interfaces/ICollabo";
import { Table, Popconfirm, Input } from "antd";
import "./GestionCollaborateurs.css";

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
    console.log("Je délete le :", key);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Search
        placeholder="Rechercher..."
        onChange={onChangeFilter}
        style={{ width: 200 }}
        value={filter}
      />
      <Table pagination={false} dataSource={dataSource}>
        <Column title="Collaborateur" dataIndex="name" key="name" />
        <Column title="Poste" dataIndex="job" key="job" />
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
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
