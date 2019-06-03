import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import "./App.css";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />

            <Route path="/" component={SignIn} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
