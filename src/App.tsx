import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Layout, Divider } from "antd";
import "./App.css";
import Reunion from "./components/Reunion/Reunion";
import Login from "./components/Login/Login";
import { isLogin } from "./utils/login";
import { createBrowserHistory } from "history";
import GestionCollaborateurs from "./components/GestionCollaborateurs/GestionCollaborateurs";

const App: React.FC = () => {
  const history = createBrowserHistory();
  const { Header, Footer, Content } = Layout;
  const [connected, setConnected] = useState(false);

  const isLoged = () => {
    setConnected(isLogin());
  };

  useEffect(() => {
    isLoged();
  }, []);

  return (
    <Router>
      <Layout>
        <Header>{connected && <Navbar />}</Header>
      </Layout>
      <Content>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
          {connected && (
            <Route
              exact
              path="/gestionCollaborateurs"
              component={GestionCollaborateurs}
            />
          )}
          {connected && <Route exact path="/reunion" component={Reunion} />}
        </Switch>
      </Content>
      <Footer className="footer">
        <div>
          {connected && (
            <p className="footerText">
              <Divider />
              Raphael M, Louis B, Arthur P, Benjamin P, Yoann PJ
            </p>
          )}
        </div>
      </Footer>
    </Router>
  );
};

export default App;
