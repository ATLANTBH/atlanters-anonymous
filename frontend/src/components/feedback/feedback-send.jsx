import React from "react";
import Form from "../common/form";
import { sendFeedback } from "../../services/feedbackService";
import checkmark from "../../assets/images/feedback/checkmark.png";
import xmark from "../../assets/images/feedback/xmark.png";
import Utils from "../../utils";

const { feedback } = Utils.string.PATHS;

class FeedbackSend extends Form {
  state = {
    isBeingSent: true,
    error: null
  };
  schema = {};

  async componentDidMount() {
    const { state } = this.props.location;
    if (!state) return this.handleRedirect(feedback);
    const feedbackText = state.params.feedback;
    let error = null;
    try {
      await sendFeedback(feedbackText);
    } catch (err) {
      error = err.message;
      if (err.response && err.response.status === 400) {
        error = err.response.message;
      }
    }
    this.setState({ isBeingSent: false, error });
  }

  render() {
    const { isBeingSent, error } = this.state;
    return (
      <div className="feedback-container send">
        <div className="form feedback-card">
          {isBeingSent ? (
            <div className="result-container">
              <div className="title">Please wait...</div>
              <hr />
              <div className="text">
                Sending your feedback. Please do not close this window.
              </div>
            </div>
          ) : (
            <div className="result-container">
              <div className="header">
                <img
                  className="status-image"
                  src={error ? xmark : checkmark}
                  alt="Success"
                />
                <div className="title">
                  {error
                    ? "Failed to send your feedback"
                    : "Message sent successfully"}
                </div>
              </div>

              <div className="text">
                {error
                  ? "Error: " + error
                  : "Thank you! Your feedback is greatly appreciated."}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FeedbackSend;
