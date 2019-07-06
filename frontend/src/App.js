import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import NotFound from "./components/not-found";
import auth from "./services/authService";
import Feedback from "./components/feedback/feedback";
import FeedbackConfirm from "./components/feedback/feedback-confirm";
import FeedbackSend from "./components/feedback/feedback-send";

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
            <Route path="/feedback-send" component={FeedbackSend} />

            <Route path="/feedback" component={Feedback} />
            <Route path="/feedback-confirm" component={FeedbackConfirm} />

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
