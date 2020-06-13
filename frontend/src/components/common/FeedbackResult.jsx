import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import checkmark from "../../assets/images/feedback/checkmark.png";
import xmark from "../../assets/images/feedback/xmark.png";
import { FEEDBACK_CHAT } from "../../constants/routes";
import { newWindowLocation } from "../../utils/navigate";

export default class FeedbackResult extends Component {
  static propTypes = {
    /**
     * Result received after submitting feedback
     */
    submitResult: PropTypes.object.isRequired,
  };

  render() {
    const { submitResult } = this.props;
    const { error, message } = submitResult;
    return (
      <div
        className={classNames("form feedback-card feedback-send", {
          error: error,
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
              <div className="body">
                <div className="key-all">
                  Thank you! Your feedback is greatly appreciated. Please
                  remember to save your ticket id as it will not be shown again!
                  <hr />
                  <div className="key-info">Ticket id: </div>
                  <div className="key">{message}</div>
                  <CopyToClipboard text={message}>
                    <div className="copy-key">copy id</div>
                  </CopyToClipboard>
                </div>
                <div className="access-link-container text-center">
                  <button
                    type="submit"
                    className="btn btn-primary access-link filled1"
                    onClick={() => {
                      newWindowLocation(FEEDBACK_CHAT(message));
                    }}
                  >
                    <div className="filled1-text">Access this ticket</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
