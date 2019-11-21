import React from "react";
import { Menu, Icon } from "antd";
import "./Navbar.css";
import { Link, BrowserRouter as Router } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div>
      <Router>
        <Menu mode="horizontal">
          <Menu.Item key="highlight">
            <Link to="/reunion/">
              <Icon type="highlight" />
              Réunion
            </Link>
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
      </Router>
    </div>
  );
};

export default Navbar;
