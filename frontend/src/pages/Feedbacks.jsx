import queryString from "query-string";
import React, { Component } from "react";
import FeedbackList from "../components/common/FeedbackList";
import { FEEDBACK_ROUTE } from "../constants/routes";
import { getAllFeedback, markAllFeedbacksRead } from "../services/http/feedbackService";
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
    isLoading: false,
    isConfirmationModalShown: false
  };

  componentDidMount() {
    getAllFeedback()
      .then((res) => this.onGetFeedbackSuccess(res.result))
      .catch((err) => this.onGetFeedbackError(err));
  }

  /**
   * Returns total pages based on number of feedbacks
   */
  calculateTotalPages = (res) => {
    const { itemsPerPage } = this.state;
    let { totalPages } = this.state;
    totalPages = [];
    for (let i = 1; i <= Math.ceil(res.length / itemsPerPage); i++) {
      totalPages.push(i);
    }
    return totalPages;
  };

  /**
   * Checks if page passed to url is a valid number
   */
  validatePage = (page) => {
    if (typeof currentPage != "number") {
      return 1;
    }
    return page;
  };

  onGetFeedbackSuccess = (feedbacks) => {
    const { page } = queryString.parse(this.props.location.search);
    this.assignHasNewMessages(feedbacks);
    // show feedback tickets that have new messages at the top of the list
    feedbacks = feedbacks.sort((feedbackA, feedbackB) => {
      return feedbackB.hasNewMessages - feedbackA.hasNewMessages;
    });
    this.setState({
      feedbacks,
      totalPages: this.calculateTotalPages(feedbacks),
      isLoading: false,
      hasNewMessages: feedbacks.filter(feedback => feedback.hasNewMessages).length > 0
    });
    this.onPageChange(this.validatePage(page));
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
    const { currentFeedbacks } = this.state;
    const index = currentFeedbacks.findIndex((item) => item.id === feedbackId);
    currentFeedbacks[index].isClosed = true;
    this.setState({ currentFeedbacks });
  };

  /**
   * Handles pagination
   */
  onPageChange = (page) => {
    const { feedbacks, itemsPerPage } = this.state;
    const indexOfLastFeedback = page * itemsPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - itemsPerPage;
    let currentFeedbacks = feedbacks.slice(
      indexOfFirstFeedback,
      indexOfLastFeedback
    );
    this.setState({ currentPage: parseInt(page), currentFeedbacks });
  };

  assignHasNewMessages = (feedbacks) => {
    feedbacks.map((feedback) => {
      const { Messages, userLastSeenAt } = feedback;
      sortMessages(Messages);
      const latestMessage = Messages[Messages.length - 1];
      if (latestMessage) {
        const adminSeenAt = userLastSeenAt;
        const latestMessageDate = latestMessage.createdAt;
        feedback.hasNewMessages =
          new Date(latestMessageDate) >= new Date(adminSeenAt) &&
          latestMessage.UserId == null;
      } else {
        feedback.hasNewMessages = false;
      }
      return feedback;
    });
  };

  onMarkAllRead = (e) => {
    e.preventDefault();
    this.setState({ isConfirmationModalShown: true });
  }

  /**
   * Called when confirmation modal gets closed.
   */
  onModalClose = () => this.setState({ isConfirmationModalShown: false });

  /**
   * Marks all feedbacks as read.
   */
  markAllRead = (e) => {
    this.setState({ isLoading: true, isConfirmationModalShown: false });
    markAllFeedbacksRead()
      .then((res) => this.onGetFeedbackSuccess(res.result))
      .catch((err) => this.onGetFeedbackError(err));
  }

  render() {
    const { currentFeedbacks, totalPages, currentPage, isLoading, isConfirmationModalShown, hasNewMessages } = this.state;
    return (
      <div>
        {isLoading && <LoadingSpinner height={60} width={60} />}
        {!isLoading && <FeedbackList
          hasNewMessages={hasNewMessages}
          feedbacks={currentFeedbacks}
          feedbackClosed={this.feedbackClosed}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={this.onPageChange}
          onMarkAllRead={this.onMarkAllRead}
          history={this.props.history}
        />}

        {isConfirmationModalShown && (<ConfirmationModal
            show={isConfirmationModalShown}
            onHide={this.onModalClose}
            onConfirm={this.markAllRead}
            body="Are you sure you want to mark everything as read?"
            noText="GO BACK"
            yesText="MARK AS READ"
          />
        )}
      </div>
    )
  }
}
