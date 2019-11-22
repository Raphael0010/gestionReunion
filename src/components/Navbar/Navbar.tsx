import React, { useState, useEffect } from "react";
import { Menu, Icon } from "antd";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { getName, logout, getRole } from "../../utils/login";
import { ClickParam } from "antd/lib/menu";

const Navbar: React.FC = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const getUserName = () => {
    let user = getName();
    if (user !== null) {
      setUsername(user);
    } else {
      setUsername("");
    }
  };

  const getUserRole = () => {
    let role = getRole();
    if (role !== null) {
      setRole(role);
    } else {
      setRole("");
    }
  };

  const onClickLogout = (param: ClickParam) => {
    logout();
  };

  useEffect(() => {
    getUserName();
    getUserRole();
  }, []);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="highlight">
          <Link to="/reunion">
            <Icon type="highlight" />
            Réunion
          </Link>
        </Menu.Item>
        {role === "Chef de projet" && (
          <Menu.Item key="team">
            <Link to="/gestionCollaborateurs">
              <Icon type="team" />
              Gestion des collaborateurs
            </Link>
          </Menu.Item>
        )}
        <Menu.Item
          className="elementRight"
          key="logout"
          onClick={onClickLogout}
        >
          <Icon type="logout" />
          Déconnexion
        </Menu.Item>
        <Menu.Item className="elementRight" key="user">
          <Icon type="user" />
          {username}
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
