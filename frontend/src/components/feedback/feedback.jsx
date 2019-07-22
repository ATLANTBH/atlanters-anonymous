import Joi from "joi-browser";
import PropTypes from "prop-types";
import React from "react";
import Utils from "../../utils";
import Form from "../common/form";
import ConfirmationModal from "../modals/confirmation-modal";

const { feedbackSend } = Utils.string.PATHS;

class Feedback extends Form {
  state = {
    data: {
      feedback: ""
    },
    errors: {},
    sendPressed: false,
    modalShow: false
  };

  schema = {
    feedback: Joi.string().label("Feedback")
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ modalShow: true, sendPressed: true });
  };

  modalClose = () => this.setState({ modalShow: false, sendPressed: false });

  handleConfirm = () => {
    const { feedback } = this.state.data;
    this.handleRedirect(feedbackSend, { feedback });
  };

  componentDidMount = () => {
    const { state } = this.props.location;
    if (state) {
      const { feedback } = state.params;
      const { data } = this.state;
      data.feedback = feedback;
      this.setState({ data });
    }
  };

  render() {
    const { sendPressed, modalShow, data } = this.state;
    return (
      <React.Fragment>
        <div className="feedback-container">
          <form className="invis-container" onSubmit={this.onSubmit}>
            <div className="form feedback-card">
              <div className="title form-title">Help us become better</div>
              {this.renderInput(
                "feedback",
                "How can we improve?",
                "A penny for your thoughts...",
                false,
                "textarea",
                {
                  wrap: "hard",
                  rows: "4",
                  cols: "20",
                  disabled: sendPressed
                }
              )}
              <small className="form-text">
                *Everything you send us will be completely anonymous
              </small>
              <div className="submit-container">
                {this.renderSubmitButton("NEXT", "submit filled1", sendPressed)}
              </div>
            </div>
          </form>
        </div>

        <ConfirmationModal
          show={modalShow}
          onHide={this.modalClose}
          data={data.feedback}
          onConfirm={this.handleConfirm}
        />
      </React.Fragment>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  location: PropTypes.object
};
