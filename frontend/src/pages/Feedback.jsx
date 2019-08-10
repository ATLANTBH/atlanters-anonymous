import React, { Component } from "react";
import FeedbackForm from "../components/common/FeedbackForm";
import FeedbackResult from "../components/common/FeedbackResult";
import LoadingSpinner from "../components/common/ui/LoadingSpinner";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { submitFeedback } from "../services/http/feedbackService";

export default class Feedback extends Component {
  state = {
    isSubmitting: false,
    isConfirmationShown: false,
    isSubmited: false,

    submitResult: {},
    feedback: ""
  };

  /**
   * Called when confirmation modal gets closed.
   */
  onModalClose = () => this.setState({ isConfirmationShown: false });

  /**
   * Called when feedback gets changed.
   */
  onFeedbackChange = value => {
    this.setState({ feedback: value });
  };

  onNext = e => {
    e.preventDefault();
    this.setState({ isConfirmationShown: true });
  };

  onSubmitFeedback = e => {
    e.preventDefault();
    this.setState({ isConfirmationShown: false, isSubmitting: true });
    submitFeedback({ data: this.state.feedback })
      .then(res => this.onFeedbackSentSuccessfully(res))
      .catch(err => this.onFeedbackError(err));
  };

  onFeedbackSentSuccessfully(res) {
    this.setState({
      isSubmitting: false,
      isSubmited: true,
      submitResult: { message: res.result.id }
    });
  }

  onFeedbackError(err) {
    this.setState({
      isSubmitting: false,
      isSubmited: true,
      submitResult: { error: err.message }
    });
  }

  render() {
    const {
      isConfirmationShown,
      isSubmitting,
      isSubmited,
      submitResult,
      feedback
    } = this.state;

    return (
      <section className="feedback-container">
        {isSubmitting && <LoadingSpinner height={60} width={60} />}

        {!isSubmitting &&
          (isSubmited ? (
            <FeedbackResult submitResult={submitResult} />
          ) : (
            <FeedbackForm
              value={feedback}
              onChange={this.onFeedbackChange}
              onNext={this.onNext}
            />
          ))}

        {isConfirmationShown && (
          <ConfirmationModal
            show={isConfirmationShown}
            onHide={this.onModalClose}
            onConfirm={this.onSubmitFeedback}
          />
        )}
      </section>
    );
  }
}
