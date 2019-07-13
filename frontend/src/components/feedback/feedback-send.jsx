import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Loader from "react-loader-spinner";
import checkmark from "../../assets/images/feedback/checkmark.png";
import xmark from "../../assets/images/feedback/xmark.png";
import { sendFeedback } from "../../services/feedbackService";
import Utils from "../../utils";
import Form from "../common/form";

const { feedback } = Utils.string.PATHS;
class FeedbackSend extends Form {
  state = {
    isBeingSent: true,
    error: null
  };
  schema = {};

  sendFeedbackSuccess(res) {
    this.setState({ isBeingSent: false });
  }

  sendFeedbackFailure(error) {
    this.setState({ isBeingSent: false, error });
  }

  async componentDidMount() {
    const { state } = this.props.location;
    if (!state) return this.handleRedirect(feedback);
    sendFeedback({ data: state.params.feedback })
      .then(res => {
        this.sendFeedbackSuccess(res);
      })
      .catch(err => {
        this.sendFeedbackFailure(err);
      });
  }

  render() {
    const { isBeingSent, error } = this.state;
    return (
      <div className="feedback-container send">
        {isBeingSent ? (
          <div className="moon-loader-wrapper">
            <Loader type="Oval" color="#00a3da" height="60" width="60" />
          </div>
        ) : (
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
                {error
                  ? error.toString()
                  : "Thank you! Your feedback is greatly appreciated."}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FeedbackSend;
FeedbackSend.propTypes = {
  location: PropTypes.object.isRequired
};
