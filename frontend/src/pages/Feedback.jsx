import React, { Component } from "react";
import FeedbackForm from "../components/common/FeedbackForm";
import FeedbackResult from "../components/common/FeedbackResult";
import LoadingSpinner from "../components/common/ui/LoadingSpinner";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import {
  submitFeedback,
  getFeedbackMessages
} from "../services/http/feedbackService";
import FeedbackTicket from "../components/common/FeedbackTicket";

export default class Feedback extends Component {
  state = {
    isLoading: false,
    isConfirmationShown: false,
    isSubmited: false,
    isFeedbackTicketShown: false,

    feedback: {},
    feedbackMessages: [],
    submitResult: {},
    feedbackValue: ""
  };

  getFeedbackMessagesRequest(feedbackId) {
    getFeedbackMessages(feedbackId)
      .then(res => this.onGetMessagesSuccess(res.result))
      .catch(err => this.onGetMessagesError(err, feedbackId));
  }

  componentDidMount() {
    const { feedbackId } = this.props.match.params;
    if (feedbackId) {
      this.setState({ isLoading: true });
      this.getFeedbackMessagesRequest(feedbackId);
    }
  }

  onGetMessagesSuccess(res) {
    this.setState({
      isLoading: false,
      isFeedbackTicketShown: true,
      isSubmited: false,
      feedback: res.feedback,
      feedbackMessages: res.messages
    });
  }

  onGetMessagesError(err, feedbackId) {
    this.getFeedbackMessagesRequest(feedbackId).catch(err => alert(err));
  }

  /**
   * Called when confirmation modal gets closed.
   */
  onModalClose = () => this.setState({ isConfirmationShown: false });

  /**
   * Called when feedback gets changed.
   */
  onFeedbackChange = value => {
    this.setState({ feedbackValue: value });
  };

  onNext = e => {
    e.preventDefault();
    this.setState({ isConfirmationShown: true });
  };

  onSubmitFeedback = e => {
    e.preventDefault();
    this.setState({ isConfirmationShown: false, isLoading: true });
    submitFeedback({ text: this.state.feedbackValue })
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
      feedback,
      feedbackMessages,
      submitResult,
      feedbackValue
    } = this.state;

    return (
      <section className="feedback-container">
        {isLoading && <LoadingSpinner height={60} width={60} />}

        {!isLoading &&
          (isSubmited ? (
            <FeedbackResult submitResult={submitResult} />
          ) : isFeedbackTicketShown ? (
            <FeedbackTicket feedback={feedback} messages={feedbackMessages} />
          ) : (
            <FeedbackForm
              value={feedbackValue}
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
