import React, { Component } from "react";
import classNames from "classnames";
import checkmark from "../../assets/images/feedback/checkmark.png";
import xmark from "../../assets/images/feedback/xmark.png";
import PropTypes from "prop-types";
import { FEEDBACK_CHAT } from "../../constants/routes";

export default class FeedbackResult extends Component {
  static propTypes = {
    /**
     * Result received after submitting feedback
     */
    submitResult: PropTypes.object.isRequired
  };

  render() {
    const { submitResult } = this.props;
    const { error, message } = submitResult;
    return (
      <div
        className={classNames("form feedback-card feedback-send", {
          error: error
        })}
      >
        <div className="result-container">
          <div className="header">
            <img
              className="status-image"
              src={error ? xmark : checkmark}
              alt="Success"
            />
            <div className="title send-title">
              {error
                ? "Failed to send your feedback"
                : "Message sent successfully"}
            </div>
          </div>

          <div className="text">
            {error ? (
              error
            ) : (
              <div>
                Thank you! Your feedback is greatly appreciated. <br />
                <a href={FEEDBACK_CHAT(message)}>Access my ticket</a>
                <br />
                Don't forget to save your ticket key!
                <hr />
                <p className="text-center">
                  <b>{message}</b>
                </p>
                <hr />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
