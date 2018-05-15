import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Home";
import { ROUTES }  from '../../constants';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={ROUTES.root} component={Home} />
          {/* TODO - Add redirect */}
        </Switch>
      </Router>
    );
  }
}

export default App;
