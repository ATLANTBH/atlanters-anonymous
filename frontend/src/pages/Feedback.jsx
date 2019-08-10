import React, { Component } from "react";
import FeedbackForm from "../components/common/FeedbackForm";
import FeedbackResult from "../components/common/FeedbackResult";
import LoadingSpinner from "../components/common/ui/LoadingSpinner";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { getFeedback, submitFeedback } from "../services/http/feedbackService";
import FeedbackTicket from "../components/common/FeedbackTicket";

export default class Feedback extends Component {
  state = {
    isLoading: false,
    isConfirmationShown: false,
    isSubmited: false,
    isFeedbackTicketShown: false,

    feedbackTicketResult: {},
    submitResult: {},
    feedback: ""
  };

  componentDidMount() {
    const { feedbackId } = this.props.match.params;
    if (feedbackId) {
      this.setState({ isLoading: true });
      getFeedback(feedbackId)
        .then(res => this.onFeedbackGetSuccess(res.result))
        .catch(err => this.onFeedbackGetError(err));
    }
  }

  onFeedbackGetSuccess(res) {
    this.setState({
      isLoading: false,
      isFeedbackTicketShown: true,
      isSubmited: false,
      feedbackTicketResult: res
    });
  }

  onFeedbackGetError(err) {
    this.setState({ isLoading: false, feedbackTicketResult: err });
  }

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
    this.setState({ isConfirmationShown: false, isLoading: true });
    submitFeedback({ data: this.state.feedback })
      .then(res => this.onFeedbackSentSuccessfully(res.result))
      .catch(err => this.onFeedbackError(err));
  };

  onFeedbackSentSuccessfully(res) {
    this.setState({
      isLoading: false,
      isSubmited: true,
      submitResult: { message: res.id }
    });
  }

  onFeedbackError(err) {
    this.setState({
      isLoading: false,
      isSubmited: true,
      submitResult: { error: err.message }
    });
  }

  render() {
    const {
      isConfirmationShown,
      isLoading,
      isSubmited,
      isFeedbackTicketShown,
      feedbackTicketResult,
      submitResult,
      feedback
    } = this.state;

    return (
      <section className="feedback-container">
        {isLoading && <LoadingSpinner height={60} width={60} />}

        {!isLoading &&
          (isSubmited ? (
            <FeedbackResult submitResult={submitResult} />
          ) : isFeedbackTicketShown ? (
            <FeedbackTicket info={feedbackTicketResult} />
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
