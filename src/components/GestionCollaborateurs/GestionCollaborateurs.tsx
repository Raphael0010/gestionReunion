import React, { useState } from "react";
import {Table, Button, Popconfirm, Form, Divider, Tag, Input } from "antd";
import { Redirect, useHistory } from "react-router-dom";
import axios from 'axios';
import "./GestionCollaborateurs.css";


const GestionCollaborateurs: React.FC = () => {
    
    const [currentId,setCurrentId] = useState(0);
    const onChangeCurrentId = (value:any) => {
      console.log(currentId);
    }

    const confirm = () => {
      /*axios.post('api/login', { id })
      .then((result) => {
        // Reload le state
      }
      );*/
    }

    const columns = [
        {
          title: 'Prénom',
          dataIndex: 'fname',
          key: 'fname',
          render: (text:any) => <a>{text}</a>,
        },
        {
          title: 'Nom',
          dataIndex: 'lname',
          key: 'lname',
        },
        {
          title: 'Métier',
          dataIndex: 'job',
          key: 'job',
        },
        {
          title: '',
          key: 'action',
          render: (text:string, record:any) => (
         
            <span>
              {setCurrentId(record.key)}
              <Button>Modifier</Button>
              &nbsp;&nbsp;
              <Popconfirm placement="top" title={"Confirmer la suppression"} onConfirm={confirm} okText="Oui" cancelText="Non">
                <Button onClick={onChangeCurrentId}>Supprimer</Button>
              </Popconfirm>
            </span>
          ),
        },
      ];

      let data = [
        {
          key: '1',
          fname: 'John',
          lname: 'Brown',
          job: 'Chef de projet'
        },
        {
          key: '2',
          fname: 'Jim',
          lname: 'Green',
          job: 'Développeur'
        },
        {
          key: '3',
          fname: 'Joe',
          lname: 'Black',
          job: 'Comptable'
        }
      ];

      const Search = Input.Search;
      const [filter,setFilter] = useState("");
      const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);

      }

    return (
      <div>
        <Search
          placeholder="Rechercher..."
          onChange={onChangeFilter}
          style={{ width: 200 }}
          value={filter}
        />
        <Table columns={columns} dataSource={data} pagination={false}/> 
      </div>
    );
};

export default GestionCollaborateurs;
