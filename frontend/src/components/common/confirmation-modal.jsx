import { Modal } from "react-bootstrap";
import React from "react";
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
    const { submitPressed } = this.state;
    const { data } = this.props;
    let redirect = true;
    try {
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
      this.props.onSubmit();
    }
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-container"
      >
        <div className="form modal-form">
          <div className="title text-center">Are you sure?</div>
          <div className="modal-btns-form text-center">
            <form className="modal-btns" onSubmit={this.handleSubmit}>
              <button
                type="button"
                name="Cancel"
                disabled={this.cancelPressed}
                className="btn btn-primary empty1"
                onClick={this.props.onHide}
              >
                <div className="empty1-text">Go Back</div>
              </button>
              {this.renderButton("Send", "filled1", this.submitPressed)}
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ConfirmationModal;