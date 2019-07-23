import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";
import Form from "../common/form";

// TODO(kklisura): No need for form here.
class ConfirmationModal extends Form {
  state = {};
  schema = {};

  onSubmit = async e => {
    e.preventDefault();
    this.props.onConfirm();
  };

  render() {
    const { onHide, show } = this.props;
    return (
      <Modal
        onHide={onHide}
        show={show}
        size="lg"
        aria-labelledby="modal"
        centered
        className="modal-container"
      >
        <form className="invis-container" onSubmit={this.onSubmit}>
          <div className="form feedback-card confirm">
            <div className="title confirm-title">Are you sure?</div>
            <div className="text">
              Last chance to edit your comment. Are you sure you want to send
              your feedback?
            </div>
            <div className="submit-container">
              {this.renderButton("GO BACK", "submit empty1", onHide)}
              {this.renderSubmitButton("SEND", "submit filled1")}
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

// TODO(kklisura): Just export it above.
export default ConfirmationModal;

// TODO(kklisura): Move this to static props.
ConfirmationModal.propTypes = {
  onConfirm: PropTypes.func.isRequired
};
