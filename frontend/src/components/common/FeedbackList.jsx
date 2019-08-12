import React, { Component } from "react";
import PropTypes from "prop-types";
import FeedbackItem from "./FeedbackItem";
import { closeFeedback } from "../../services/http/feedbackService";

export default class FeedbackList extends Component {
  state = {};

  onCloseFeedback = feedbackId => {
    closeFeedback(feedbackId)
      .then(res => this.onCloseFeedbackSuccess(res.result, feedbackId))
      .catch(err => this.onCloseFeedbackError(err));
  };

  onCloseFeedbackSuccess = (res, feedbackId) => {
    this.props.feedbackClosed(feedbackId);
  };

  onCloseFeedbackError = err => {
    alert(err);
    window.location.reload();
  };

  renderFeedback = (feedback, index) => {
    const messages = feedback.Messages;
    return (
      <FeedbackItem
        key={feedback.id}
        id={feedback.id}
        createdAt={feedback.createdAt}
        message={messages[messages.length - 1].text}
        isClosed={feedback.isClosed}
        onCloseFeedback={this.onCloseFeedback}
      />
    );
  };

  render() {
    const { feedbacks } = this.props;
    return (
      <div
        className="feedbacks-container"
        style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}
      >
        {feedbacks
          .reverse()
          .map((item, index) => this.renderFeedback(item, index))}
      </div>
    );
  }
}
