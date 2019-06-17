import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { sendFeedback } from "../services/feedbackService";
import ConfirmationModal from "./common/confirmation-modal";

class Feedback extends Form {
  state = {
    data: {
      feedback: ""
    },
    errors: {},
    submitPressed: false,
    modalShow: false
  };

  schema = {
    feedback: Joi.string().label("Feedback")
  };

  triggerModal = e => {
    e.preventDefault();
    this.setState({ modalShow: true });
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <React.Fragment>
        <div className="feedback-container">
          <div className="form feedback-form">
            <form onSubmit={this.triggerModal}>
              {this.renderInput("feedback", "Feedback", "textarea", {
                wrap: "hard",
                rows: "4",
                cols: "20"
              })}
              {this.renderButton(
                "SUBMIT",
                "sign-in submit",
                this.state.submitPressed
              )}
            </form>
          </div>
        </div>
        <ConfirmationModal
          show={this.state.modalShow}
          onHide={modalClose}
          data={this.state.data.feedback}
        />
      </React.Fragment>
    );
  }
}

export default Feedback;
