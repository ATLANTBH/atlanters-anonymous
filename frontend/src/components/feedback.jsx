import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { sendFeedback } from "../services/feedbackService";
import ConfirmationModal from "./modals/confirmation-modal";
import SuccessModal from "./modals/success-modal";

class Feedback extends Form {
  state = {
    data: {
      feedback: ""
    },
    errors: {},
    submitPressed: false,
    modalShow: false,
    successShow: false,
    disabled: false
  };

  schema = {
    feedback: Joi.string().label("Feedback")
  };

  triggerModal = e => {
    e.preventDefault();
    this.setState({ modalShow: true });
  };

  modalClose = () => this.setState({ modalShow: false });

  successClose = () =>
    this.setState({ successShow: false, submitPressed: false });

  handleConfirm = successShow => {
    this.setState({
      modalShow: false,
      successShow,
      submitPressed: false
    });
  };

  handleSubmitClicked = () => {
    this.setState({ submitPressed: true });
  };

  render() {
    return (
      <React.Fragment>
        <div className="feedback-container">
          <form className="invis-container" onSubmit={this.triggerModal}>
            <div className="form feedback-form">
              {this.renderInput(
                "feedback",
                "Help us become even better",
                "A penny for your thoughts...",
                false,
                "textarea",
                {
                  wrap: "hard",
                  rows: "4",
                  cols: "20",
                  disabled: this.state.submitPressed
                }
              )}
              <small className="form-text">
                *Everything you send us will be completely anonymous
              </small>
              <div className="submit-container">
                {this.renderButton(
                  "SEND",
                  "submit filled1",
                  this.state.submitPressed
                )}
              </div>
            </div>
          </form>
        </div>

        <ConfirmationModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          data={this.state.data.feedback}
          confirm={this.handleConfirm}
          submitClicked={this.handleSubmitClicked}
        />
        <SuccessModal
          show={this.state.successShow}
          onHide={this.successClose}
          data={this.state.data.feedback}
        />
      </React.Fragment>
    );
  }
}

export default Feedback;
