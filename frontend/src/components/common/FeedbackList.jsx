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

  onPageChange = e => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", e.target.id);
    this.props.history.push(
      window.location.pathname + "?" + currentUrlParams.toString()
    );
    this.props.onPageChange(e.target.id);
  };

  render() {
    const { feedbacks, totalPages, currentPage } = this.props;
    return (
      <div
        className="feedbacks-container"
        style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}
      >
        <div style={{ gridColumn: 2 }}>
          <div
            style={{
              listStyle: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8px"
            }}
          >
            {totalPages.map(number => (
              <li
                style={{
                  cursor: "pointer",
                  color: currentPage == number ? "red" : "blue",
                  marginRight: "15px",
                  fontSize: "18px",
                  userSelect: "none"
                }}
                key={number}
                id={number}
                onClick={this.onPageChange}
              >
                {number}
              </li>
            ))}
          </div>
          <div>
            {feedbacks.map((item, index) => this.renderFeedback(item, index))}
          </div>
        </div>
      </div>
    );
  }
}
