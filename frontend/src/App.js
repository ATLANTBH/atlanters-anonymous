import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import SignOut from "./components/auth/signout";
import ForgotPassword from "./components/auth/forgot-password";
import PwEmailSent from "./components/auth/pw-email-sent";
import NotFound from "./components/not-found";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import Feedback from "./components/feedback";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container-fluid">
          <Switch>
            <Route path="/feedback" component={Feedback} />

            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <ProtectedRoute path="/signout" component={SignOut} />
            <Route path="/not-found" component={NotFound} />

            <Redirect from="/" exact to="/feedback" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
