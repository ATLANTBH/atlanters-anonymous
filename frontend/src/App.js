import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import NotFound from "./components/not-found";
import auth from "./services/authService";
import Feedback from "./components/feedback/feedback";
import FeedbackConfirm from "./components/feedback/feedback-confirm";
import FeedbackSend from "./components/feedback/feedback-send";
import Utils from "./utils";

const {
  feedbackSend,
  feedback,
  feedbackConfirm,
  notFound,
  empty
} = Utils.string.PATHS;

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
            <Route path={feedbackSend} component={FeedbackSend} />

            <Route path={feedback} component={Feedback} />
            <Route path={feedbackConfirm} component={FeedbackConfirm} />

            <Route path={notFound} component={NotFound} />

            <Redirect from={empty} exact to={feedback} />
            <Redirect to={notFound} />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
