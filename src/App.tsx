import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Layout } from "antd";
import "./App.css";
import Reunion from "./components/Reunion/Reunion";
import Login from "./components/Login/Login";
import { createBrowserHistory } from "history";
import GestionCollaborateurs from "./components/GestionCollaborateurs/GestionCollaborateurs";

const App: React.FC = () => {
  const { Header, Footer, Content } = Layout;
  const history = createBrowserHistory();

  return (
    <Router>
      <Layout>
        <Header>{history.location.pathname !== "/login" && <Navbar />}</Header>
      </Layout>
      <Content>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/gestionCollaborateurs"
            component={GestionCollaborateurs}
          />
          <Route exact path="/reunion" component={Reunion} />
        </Switch>
      </Content>
      <Footer className="footer">
        {history.location.pathname !== "/login" && (
          <p className="footerText">
            Raphael M, Louis B, Arthur P, Benjamin P, Yoann PJ
          </p>
        )}
      </Footer>
    </Router>
  );
};

export default App;
