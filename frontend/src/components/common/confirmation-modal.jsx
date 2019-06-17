import { Modal, Button } from "react-bootstrap";
import React, { Component } from "react";
import Form from "./form";
import { sendFeedback } from "../../services/feedbackService";

class ConfirmationModal extends Form {
  state = {
    submitPressed: false,
    cancelPressed: false,
    errors: {}
  };
  schema = {};

  doSubmit = async () => {
    const { submitPressed, cancelPressed } = this.state;
    const { data } = this.props;
    let redirect = true;
    try {
      console.log("a");
      this.toggleSubmitFlag(submitPressed);
      await sendFeedback(data);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = " ";
        errors.password = err.response.data.message;
        this.setState({ errors });
      }
      redirect = false;
    }
    this.toggleSubmitFlag(submitPressed);

    if (redirect) {
      alert("Message sent, thanks for your feedback");
      this.props.onHide();
      // const { state } = this.props.location;
      // this.handleRedirectHard(state ? state.from.pathname : "/");
    }
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="form modal-form">
          <div className="title text-center">Are you sure?</div>

          <div className="body text-center">{this.props.data}</div>
          <div className="modal-btns-form text-right">
            <form className="modal-btns" onSubmit={this.handleSubmit}>
              {this.renderButton(
                "Send",
                "sign-in btn yes-btn",
                this.submitPressed
              )}
              <button
                type="button"
                name="Cancel"
                disabled={this.cancelPressed}
                className="sign-in btn cancel-btn"
                onClick={this.props.onHide}
              >
                <div className="sign-text">Cancel</div>
              </button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ConfirmationModal;
