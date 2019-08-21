import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import checkmark from "../../assets/images/feedback/checkmark.png";
import xmark from "../../assets/images/feedback/xmark.png";
import { FEEDBACK_CHAT } from "../../constants/routes";
import { newWindowLocation } from "../../utils/navigate";

export default class FeedbackResult extends Component {
  state = {
    copied: false
  };

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
              <div className="body">
                <div className="key-all">
                  Thank you! Your feedback is greatly appreciated. <hr />
                  <div className="key-info">Your ticket key: </div>
                  <div className="key">{message}</div>
                  <CopyToClipboard
                    text={message}
                    onCopy={() => {
                      this.setState({ copied: true });
                    }}
                  >
                    <div className="copy-key">copy key</div>
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
                    <div className="filled1-text">Access my ticket</div>
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
