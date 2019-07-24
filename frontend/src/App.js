import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./components/not-found";
import { FEEDBACK_ROUTE, NOT_FOUND_ROUTE } from "./constants/routes";
import Feedback from "./pages/Feedback";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <main className="container-fluid">
          <Switch>
            <Route path={FEEDBACK_ROUTE} component={Feedback} />
            <Route path={NOT_FOUND_ROUTE} component={NotFound} />

            <Redirect from="/" exact to={FEEDBACK_ROUTE} />
            <Redirect to={NOT_FOUND_ROUTE} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
