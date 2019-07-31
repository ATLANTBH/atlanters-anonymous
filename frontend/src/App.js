import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./pages/NotFound";
import {
  FEEDBACK_ROUTE,
  SIGNUP_ROUTE,
  SIGNIN_ROUTE,
  NOT_FOUND_ROUTE
} from "./constants/routes";
import Feedback from "./pages/Feedback";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Navbar from "./components/common/Navbar";
import { getCurrentUser } from "./services/http/authService";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        {user && <Navbar user={user} />}
        <main className="container-fluid">
          <Switch>
            <Route path={SIGNUP_ROUTE} component={SignUp} />
            <Route path={SIGNIN_ROUTE} component={SignIn} />
            <Route path={FEEDBACK_ROUTE} component={Feedback} />
            <Route path={NOT_FOUND_ROUTE} component={NotFound} />

            <Redirect from="/" exact to={SIGNIN_ROUTE} />
            <Redirect to={NOT_FOUND_ROUTE} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
