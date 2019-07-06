import { Modal } from "react-bootstrap";
import React from "react";
import Form from "../common/form";

class ConfirmationModal extends Form {
  state = {};
  schema = {};

  onSubmit = async () => {
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
          <div className="form confirm-form">
            <div className="title">Are you sure?</div>
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

export default ConfirmationModal;
