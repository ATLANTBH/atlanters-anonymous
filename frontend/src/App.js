import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import "./App.css";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import ForgotPassword from "./components/auth/forgot-password";
import PwEmailSent from "./components/auth/pw-email-sent";
import NotFound from "./components/not-found";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container-fluid">
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/pwEmailSent" component={PwEmailSent} />

            <Route path="/" component={SignIn} />
            <Route path="" component={NotFound} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
