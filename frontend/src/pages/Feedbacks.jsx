import queryString from "query-string";
import React, { Component } from "react";
import FeedbackList from "../components/common/FeedbackList";
import { FEEDBACK_ROUTE } from "../constants/routes";
import {
  getAllFeedback,
  markAllFeedbacksRead
} from "../services/http/feedbackService";
import { sortMessages } from "../utils/array";
import { newWindowLocation } from "../utils/navigate";
import LoadingSpinner from "../components/common/ui/LoadingSpinner";
import ConfirmationModal from "../components/modals/ConfirmationModal";

export default class Feedbacks extends Component {
  state = {
    feedbacks: [],
    currentFeedbacks: [],
    currentPage: 1,
    totalPages: [],
    itemsPerPage: 10,
    hasNewMessages: false,
    isLoading: true,
    isConfirmationModalShown: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    getAllFeedback()
      .then((res) => this.onGetFeedbackSuccess(res.result))
      .catch((err) => this.onGetFeedbackError(err));
  }

  /**
   * Returns total pages based on number of feedbacks
   */
  calculateTotalPages = (feedbacks) => {
    const { itemsPerPage } = this.state;
    const pages = [];
    for (let i = 1; i <= Math.ceil(feedbacks.length / itemsPerPage); i++) {
      pages.push(i);
    }
    return pages;
  };

  /**
   * Validates page from URL
   */
  validatePage = (page) => {
    const parsed = parseInt(page, 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  };

  onGetFeedbackSuccess = (feedbacks) => {
    const { page } = queryString.parse(this.props.location.search);
    const validatedPage = this.validatePage(page);

    this.assignHasNewMessages(feedbacks);

    feedbacks = feedbacks.sort(
      (a, b) => b.hasNewMessages - a.hasNewMessages
    );

    this.setState(
      {
        feedbacks,
        totalPages: this.calculateTotalPages(feedbacks),
        hasNewMessages: feedbacks.some(f => f.hasNewMessages),
        isLoading: false
      },
      () => {
        this.onPageChange(validatedPage);
      }
    );
  };

  onGetFeedbackError = (err) => {
    if (err.message.includes("Failed to fetch")) return;
    alert(err);
    newWindowLocation(FEEDBACK_ROUTE);
  };

  /**
   * When feedback is successfully closed
   */
  feedbackClosed = (feedbackId) => {
    const currentFeedbacks = [...this.state.currentFeedbacks];
    const index = currentFeedbacks.findIndex(
      (item) => item.id === feedbackId
    );
    if (index !== -1) {
      currentFeedbacks[index].isClosed = true;
      this.setState({ currentFeedbacks });
    }
  };

  /**
   * Handles pagination
   */
  onPageChange = (page) => {
    const { feedbacks, itemsPerPage } = this.state;
    const indexOfLastFeedback = page * itemsPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - itemsPerPage;

    const currentFeedbacks = feedbacks.slice(
      indexOfFirstFeedback,
      indexOfLastFeedback
    );

    this.setState({
      currentPage: page,
      currentFeedbacks
    });
  };

  assignHasNewMessages = (feedbacks) => {
    feedbacks.forEach((feedback) => {
      const { Messages, userLastSeenAt } = feedback;
      sortMessages(Messages);
      const latestMessage = Messages[Messages.length - 1];

      if (latestMessage) {
        feedback.hasNewMessages =
          new Date(latestMessage.createdAt) >= new Date(userLastSeenAt) &&
          latestMessage.UserId == null;
      } else {
        feedback.hasNewMessages = false;
      }
    });
  };

  onMarkAllRead = (e) => {
    e.preventDefault();
    this.setState({ isConfirmationModalShown: true });
  };

  onModalClose = () =>
    this.setState({ isConfirmationModalShown: false });

  /**
   * Marks all feedbacks as read
   */
  markAllRead = () => {
    this.setState({
      isLoading: true,
      isConfirmationModalShown: false
    });

    markAllFeedbacksRead()
      .then((res) => this.onGetFeedbackSuccess(res.result))
      .catch((err) => this.onGetFeedbackError(err));
  };

  render() {
    const {
      currentFeedbacks,
      totalPages,
      currentPage,
      isLoading,
      isConfirmationModalShown,
      hasNewMessages
    } = this.state;

    return (
      <div>
        {isLoading && <LoadingSpinner height={60} width={60} />}

        {!isLoading && (
          <FeedbackList
            hasNewMessages={hasNewMessages}
            feedbacks={currentFeedbacks}
            feedbackClosed={this.feedbackClosed}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={this.onPageChange}
            onMarkAllRead={this.onMarkAllRead}
            history={this.props.history}
          />
        )}

        {isConfirmationModalShown && (
          <ConfirmationModal
            show
            onHide={this.onModalClose}
            onConfirm={this.markAllRead}
            body="Are you sure you want to mark everything as read?"
            noText="GO BACK"
            yesText="MARK AS READ"
          />
        )}
      </div>
    );
  }
}
