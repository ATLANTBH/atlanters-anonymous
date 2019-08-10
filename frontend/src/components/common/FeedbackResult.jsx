import React, { Component } from "react";
import classNames from "classnames";
import checkmark from "../../assets/images/feedback/checkmark.png";
import xmark from "../../assets/images/feedback/xmark.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
                Thank you! Your feedback is greatly appreciated.{" "}
                <Link to={`/feedback/${message}`}>Click here</Link> to access
                your ticket.
                <br />
                <br />
                Do not lose your ticket key:
                <br />
                <p className="text-center">
                  <b>{message}</b>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
