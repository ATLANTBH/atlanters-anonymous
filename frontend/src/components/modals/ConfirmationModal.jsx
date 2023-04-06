import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Modal } from "react-bootstrap";

export default class ConfirmationModal extends PureComponent {
  static propTypes = {
    /**
     * Called when back button is pressed
     */
    onHide: PropTypes.func.isRequired,

    /**
     * True if modal is shown
     */
    show: PropTypes.bool.isRequired,

    /**
     * Called when send button is pressed
     */
    onConfirm: PropTypes.func.isRequired,

    /**
     * Title of the modal
     */
    title: PropTypes.string,

    /**
     * Modal body text
     */
    body: PropTypes.string,

    /**
     * Text shown on a button that cancel the action and closes the modal
     */
    noText: PropTypes.string,

    /**
     * Text shown on a button that proceeds with current action
     */
    yesText: PropTypes.string,
  };

  render() {
    const { onHide, show, onConfirm, title, body, noText, yesText } = this.props;
    return (
      <Modal
        onHide={onHide}
        show={show}
        size="lg"
        aria-labelledby="modal"
        centered
        className="modal-container"
      >
        <form onSubmit={onConfirm}>
          <div className="form feedback-card confirm">
            <div className="title confirm-title">{title}</div>
            <div className="text">
              {body}
            </div>
            <div className="submit-container">
              <button
                className="btn btn-primary submit empty1"
                onClick={onHide}
              >
                <div className="empty1-text">{noText}</div>
              </button>
              <button type="submit" className="btn btn-primary submit filled1">
                <div className="filled1-text">{yesText}</div>
              </button>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}


ConfirmationModal.defaultProps = {
    title: "Are you sure?",
    body: "Are you sure you want to proceed?",
    noText: "BACK",
    yesText: "FINISH",
};