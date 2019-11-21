import React from "react";
import { Menu, Icon } from "antd";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="highlight">
          <Icon type="highlight" />
          Réunion
        </Menu.Item>
        <Menu.Item className="elementRight" key="logout">
          <Icon type="logout" />
          Déconnexion
        </Menu.Item>
        <Menu.Item className="elementRight" key="user">
          <Icon type="user" />
          Jean Eude
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
