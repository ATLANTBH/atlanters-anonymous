import React, { Component } from "react";
import classNames from "classnames";
import checkmark from "../../../assets/images/feedback/checkmark.png";
import xmark from "../../../assets/images/feedback/xmark.png";
import PropTypes from "prop-types";

export default class FeedbackResult extends Component {
  static propTypes = {
    /**
     * Result received after submitting feedback
     */
    submitResult: PropTypes.string.isRequired
  };

  render() {
    const { submitResult } = this.props;

    return (
      <div
        className={classNames("form feedback-card feedback-send", {
          error: submitResult
        })}
      >
        <div className="result-container">
          <div className="header">
            <img
              className="status-image"
              src={submitResult ? xmark : checkmark}
              alt="Success"
            />
            <div className="title send-title">
              {submitResult
                ? "Failed to send your feedback"
                : "Message sent successfully"}
            </div>
          </div>

          <div className="text">
            {submitResult
              ? submitResult
              : "Thank you! Your feedback is greatly appreciated."}
          </div>
        </div>
      </div>
    );
  }
}
