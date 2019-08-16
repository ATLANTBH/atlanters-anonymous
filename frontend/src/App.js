import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";
import {
  FEEDBACKS_ROUTE_PARAMS,
  FEEDBACK_ROUTE,
  FEEDBACK_ROUTE_PARAMS,
  NOT_FOUND_ROUTE,
  SIGNIN_ROUTE,
  SIGNUP_ROUTE
} from "./constants/routes";
import Feedback from "./pages/Feedback";
import Feedbacks from "./pages/Feedbacks";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
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
            <Route path={FEEDBACK_ROUTE_PARAMS} component={Feedback} />
            <Route path={NOT_FOUND_ROUTE} component={NotFound} />
            <ProtectedRoute
              path={FEEDBACKS_ROUTE_PARAMS}
              component={Feedbacks}
            />

            <Redirect from="/" exact to={FEEDBACK_ROUTE} />
            <Redirect to={NOT_FOUND_ROUTE} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
