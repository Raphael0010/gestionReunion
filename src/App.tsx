import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Layout } from "antd";
import "./App.css";
import Reunion from "./components/Reunion/Reunion";
import Login from "./components/Login/Login";
import GestionCollaborateurs from "./components/GestionCollaborateurs/GestionCollaborateurs";

const App: React.FC = () => {
  const { Header, Footer, Content } = Layout;

  return (
    <div className="App">
      <Layout>
        <Header>
          {window.location.href.match("/(login)/") == null && <Navbar />}
        </Header>
      </Layout>
      <Content>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              exact
              path="/gestionCollaborateurs"
              component={GestionCollaborateurs}
            />
            <Route path="/reunion" component={Reunion} />
          </Switch>
        </Router>
      </Content>
      <Footer className="footer">
        <p className="footerText">Raphael M, Louis B, Arthur P, Benjmain P</p>
      </Footer>
    </div>
  );
};

export default App;
