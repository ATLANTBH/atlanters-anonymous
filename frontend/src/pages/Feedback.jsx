import React, { Component } from "react";
import FeedbackForm from "../components/common/FeedbackForm";
import FeedbackIdForm from "../components/common/FeedbackIdForm";
import FeedbackResult from "../components/common/FeedbackResult";
import FeedbackTicket from "../components/common/FeedbackTicket";
import LoadingSpinner from "../components/common/ui/LoadingSpinner";
import ConfirmationModal from "../components/modals/ConfirmationModal";
import { FEEDBACK_ROUTE } from "../constants/routes";
import { getCurrentUser } from "../services/http/authService";
import {
  getFeedbackMessages,
  submitFeedback,
} from "../services/http/feedbackService";
import { removeSpaces, validateInputMessage } from "../utils/strings";

export default class Feedback extends Component {
  state = {
    isLoading: false,
    isConfirmationShown: false,
    isSubmited: false,
    isFeedbackTicketShown: false,

    feedback: {},
    error: "",
    feedbackMessages: [],
    submitResult: {},
    feedbackValue: "",
    feedbackIdValue: "",
    feedbackIdError: null,
  };

  getFeedbackMessagesRequest(feedbackId) {
    getFeedbackMessages(removeSpaces(feedbackId))
      .then((res) => this.onGetMessagesSuccess(res.result))
      .catch((err) => this.onGetMessagesError(err, feedbackId));
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
      feedbackMessages: res.messages,
      feedbackIdError: null,
    });
    this.props.history.push(FEEDBACK_ROUTE + "/" + res.feedback.id);
  }

  onGetMessagesError(err, feedbackId) {
    let { message } = err;
    if (message.includes("SequelizeDatabaseError"))
      message = "Error: Invalid id";
    this.setState({ isLoading: false, feedbackIdError: message });
  }

  /**
   * Called when confirmation modal gets closed.
   */
  onModalClose = () => this.setState({ isConfirmationShown: false });

  /**
   * Called when feedback gets changed.
   */
  onFeedbackChange = (value) => {
    this.setState({ feedbackValue: value });
  };

  onNext = (e) => {
    e.preventDefault();
    const error = validateInputMessage(this.state.feedbackValue);
    if (error) {
      this.setState({ error });
      return;
    }
    this.setState({ isConfirmationShown: true });
  };

  onSubmitFeedback = (e) => {
    e.preventDefault();
    this.setState({ isConfirmationShown: false, isLoading: true });
    submitFeedback({ text: this.state.feedbackValue })
      .then((res) => this.onFeedbackSentSuccessfully(res.result))
      .catch((err) => this.onFeedbackError(err));
  };

  onFeedbackSentSuccessfully(res) {
    this.setState({
      isLoading: false,
      isSubmited: true,
      submitResult: { message: res.id },
    });
  }

  onFeedbackError(err) {
    this.setState({
      isLoading: false,
      isSubmited: true,
      submitResult: { error: err.message },
    });
  }

  onFeedbackIdChange = (value) => {
    this.setState({ feedbackIdValue: value });
  };

  onFeedbackIdNext = (e) => {
    e.preventDefault();
    this.getFeedbackMessagesRequest(this.state.feedbackIdValue);
  };

  render() {
    const {
      isConfirmationShown,
      isLoading,
      isSubmited,
      isFeedbackTicketShown,
      feedback,
      error,
      feedbackMessages,
      submitResult,
      feedbackValue,
      feedbackIdValue,
      feedbackIdError,
    } = this.state;

    return (
      <section
        className="feedback-container"
        style={{ marginTop: getCurrentUser() ? "0px" : "120px" }}
      >
        {isLoading && <LoadingSpinner height={60} width={60} />}

        {!isLoading &&
          (isSubmited ? (
            <FeedbackResult submitResult={submitResult} />
          ) : isFeedbackTicketShown ? (
            <FeedbackTicket feedback={feedback} messages={feedbackMessages} />
          ) : (
            <React.Fragment>
              <FeedbackForm
                value={feedbackValue}
                onChange={this.onFeedbackChange}
                onNext={this.onNext}
                error={error}
              />
              <FeedbackIdForm
                value={feedbackIdValue}
                onChange={this.onFeedbackIdChange}
                onNext={this.onFeedbackIdNext}
                error={feedbackIdError}
              />
            </React.Fragment>
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
