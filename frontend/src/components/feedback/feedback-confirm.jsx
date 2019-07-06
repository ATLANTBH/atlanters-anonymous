import React from "react";
import Form from "../common/form";

class FeedbackConfirm extends Form {
  state = {
    submitPressed: false,
    backPressed: false
  };
  schema = {};

  doSubmit = async () => {
    this.handleRedirect("feedback-send");
  };

  onBackPressed = () => {
    this.handleRedirect("feedback");
  };

  render() {
    return (
      <div className="confirm-container">
        <form className="invis-container" onSubmit={this.onSubmit}>
          <div className="form confirm-form">
            <div className="title">Are you sure?</div>
            <div className="text">
              Last chance to edit your comment. Are you sure you want to send
              your feedback?
            </div>
            <div className="submit-container">
              {this.renderButton(
                "GO BACK",
                "submit empty1",
                this.onBackPressed
              )}
              {this.renderSubmitButton(
                "SEND",
                "submit filled1",
                this.state.submitPressed
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FeedbackConfirm;
