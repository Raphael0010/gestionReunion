import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Layout } from "antd";
import "./App.css";
import Reunion from "./components/Reunion/Reunion";

const App: React.FC = () => {
  const { Header, Footer, Content } = Layout;
  return (
    <div className="App">
      <Layout>
        <Header>
          <Navbar />
        </Header>
      </Layout>
      <Content>
        <Router>
          <Switch>
            <Route exact path="/" component={Reunion} />
          </Switch>
        </Router>
      </Content>
      <Footer>
        <p>Footer</p>
      </Footer>
    </div>
  );
};

export default App;
