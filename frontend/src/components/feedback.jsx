import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { sendFeedback } from "../services/feedbackService";
import ConfirmationModal from "./common/confirmation-modal";
import SuccessModal from "./common/success-modal";

class Feedback extends Form {
  state = {
    data: {
      feedback: ""
    },
    errors: {},
    submitPressed: false,
    modalShow: false,
    successShow: false
  };

  schema = {
    feedback: Joi.string().label("Feedback")
  };

  triggerModal = e => {
    e.preventDefault();
    this.setState({ modalShow: true });
  };

  modalClose = () => this.setState({ modalShow: false });

  successClose = () => this.setState({ successShow: false });

  handleSubmit = () => {
    this.setState({ modalShow: false, successShow: true });
  };

  render() {
    return (
      <React.Fragment>
        <div className="feedback-container">
          <form className="invis-container" onSubmit={this.triggerModal}>
            <div className="form feedback-form">
              {this.renderInput(
                "feedback",
                "Your Feedback",
                "Type here...",
                "textarea",
                {
                  wrap: "hard",
                  rows: "4",
                  cols: "20"
                }
              )}
            </div>
            {this.renderButton(
              "SEND",
              "submit filled1",
              this.state.submitPressed
            )}
          </form>
        </div>

        <ConfirmationModal
          show={this.state.modalShow}
          onHide={this.modalClose}
          data={this.state.data.feedback}
          onSubmit={this.handleSubmit}
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
