import React, { Component } from "react";
import { getAllFeedback } from "../services/http/feedbackService";
import { newWindowLocation } from "../utils/navigate";
import { FEEDBACK_ROUTE } from "../constants/routes";
import FeedbackList from "../components/common/FeedbackList";

export default class Feedbacks extends Component {
  state = {
    feedbacks: []
  };

  componentDidMount() {
    getAllFeedback()
      .then(res => this.onGetFeedbackSuccess(res.result))
      .catch(err => this.onGetFeedbackError(err));
  }

  onGetFeedbackSuccess = res => {
    this.setState({ feedbacks: res });
  };

  onGetFeedbackError = err => {
    alert(err);
    newWindowLocation(FEEDBACK_ROUTE);
  };

  feedbackClosed = feedbackId => {
    const { feedbacks } = this.state;
    const index = feedbacks.findIndex(item => item.id === feedbackId);
    feedbacks[index].isClosed = true;
    this.setState({ feedbacks });
  };

  render() {
    return (
      <FeedbackList
        feedbacks={this.state.feedbacks}
        feedbackClosed={this.feedbackClosed}
      />
    );
  }
}
