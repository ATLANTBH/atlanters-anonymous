import { Modal } from "react-bootstrap";
import React from "react";
import Form from "../common/form";

class SuccessModal extends Form {
  state = {
    submitPressed: false
  };
  schema = {};

  doSubmit = async () => {
    this.props.onHide();
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
          <div className="title text-center">Thanks for your feedback!</div>
          <form className="modal-btns text-center" onSubmit={this.handleSubmit}>
            {this.renderButton("Close", "filled1", this.submitPressed)}
          </form>
        </div>
      </Modal>
    );
  }
}

export default SuccessModal;
