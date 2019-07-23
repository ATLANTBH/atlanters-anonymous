import React, { Component } from "react";
import PropTypes from "prop-types";
import Joi from "joi-browser";

// NOTE(kklisura): All pages go in pages/. All components go in components/. Shared ui components go
// in components/ui - those are non-domain components ie Input TextArea Button or LoadingSpinner etc.

// NOTE(kklisura): No need for form at the moment.

export default class Feedback extends Component {
  static propTypes = {
    // Prop types goes here
  };

  state = {
    isSubmitting: false,
    isConfirmationShown: false,

    feedback: ""
  };

  /**
   * Called when confirmation modal gets closed.
   */
  onModalClose = () => this.setState({ isConfirmationShown: false });

  /**
   * Called when feedback gets changed.
   */
  onFeedbackChange = feedback => this.setState({ feedback });

  onSubmitFeedback = () => {
    this.setState({ isSubmitting: true });

    // TODO(kklisura): Implement this in services.
    submitFeedback()
      .then(() => this.onFeedbackSentSuccessfully())
      .then(err => this.onFeedbackError(err));
  };

  onFeedbackSentSuccessfully() {
    // TODO(kklisura): Set state to display successful submission
  }

  onFeedbackError(er) {
    // TODO(kklisura): Set state to display correct error.
  }

  render() {
    const { isConfirmationShown, isSubmitting, feedback } = this.state;

    return (
      <section>
        {isSubmitting &&
          {
            /* TODO(kklisura): Render loading spinner. */
          }}

        {!isSubmitting && (
          <FeedbackForm
            value={feedback}
            onChange={this.onFeedbackChange}
            onSubmit={this.onSubmitFeedback}
          />
        )}

        {isConfirmationShown && (
          <ConfirmationModal
            show={modalShow}
            onHide={this.onModalClose}
            data={data.feedback}
            onConfirm={this.handleConfirm}
          />
        )}
      </section>
    );
  }
}
