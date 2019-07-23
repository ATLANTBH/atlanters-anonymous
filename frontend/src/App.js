import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import FeedbackConfirm from "./components/feedback/feedback-confirm";
import FeedbackSend from "./components/feedback/feedback-send";
import NotFound from "./components/not-found";
import Utils from "./utils";
import { FEEDBACK_ROUTE } from "./utils/routes";
import Feedback from "./pages/Feedback";

const {
  feedbackSend,
  feedback,
  feedbackConfirm,
  notFound,
  empty
} = Utils.string.PATHS;

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <main className="container-fluid">
          <Switch>
            <Route path={FEEDBACK_ROUTE} component={Feedback} />

            <Route path={feedbackSend} component={FeedbackSend} />

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
