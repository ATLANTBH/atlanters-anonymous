import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import "./App.css";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import SignOut from "./components/auth/signout";
import ForgotPassword from "./components/auth/forgot-password";
import PwEmailSent from "./components/auth/pw-email-sent";
import NotFound from "./components/not-found";
import Dashboard from "./components/dashboard/dashboard";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import CreateSurvey from "./components/create-survey/createSurvey";
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
            <ProtectedRoute path="/dashboard" component={Dashboard} />

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
