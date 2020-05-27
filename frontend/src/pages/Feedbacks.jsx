import queryString from "query-string";
import React, { Component } from "react";
import FeedbackList from "../components/common/FeedbackList";
import { FEEDBACK_ROUTE } from "../constants/routes";
import { getAllFeedback } from "../services/http/feedbackService";
import { sortMessages } from "../utils/array";
import { newWindowLocation } from "../utils/navigate";

export default class Feedbacks extends Component {
  state = {
    feedbacks: [],
    currentFeedbacks: [],
    currentPage: 1,
    totalPages: [],
    itemsPerPage: 10,
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
    const { itemsPerPage, totalPages } = this.state;
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

  onGetFeedbackSuccess = (res) => {
    const { page } = queryString.parse(this.props.location.search);
    this.setState({
      feedbacks: res.reverse(),
      totalPages: this.calculateTotalPages(res),
    });
    this.onPageChange(this.validatePage(page));
  };

  onGetFeedbackError = (err) => {
    if (err.message.includes("Failed to fetch")) return;
    alert(err);
    newWindowLocation(FEEDBACK_ROUTE);
  };

  /**
   * When feedback successfully closed
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
    this.assignHasNewMessages(currentFeedbacks);
    currentFeedbacks = currentFeedbacks.sort((feedbackA, feedbackB) => {
      return feedbackB.hasNewMessages - feedbackA.hasNewMessages;
    });
    this.setState({ currentPage: parseInt(page), currentFeedbacks });
  };

  assignHasNewMessages = (feedbacks) => {
    feedbacks.map((feedback) => {
      const { Messages, userLastSeenAt } = feedback;
      sortMessages(Messages);
      const latestMessage = Messages[Messages.length - 1];
      const adminSeenAt = userLastSeenAt;
      const latestMessageDate = latestMessage.createdAt;
      feedback.hasNewMessages =
        new Date(latestMessageDate) >= new Date(adminSeenAt);
    });
  };

  render() {
    const { currentFeedbacks, totalPages, currentPage } = this.state;
    return (
      <FeedbackList
        feedbacks={currentFeedbacks}
        feedbackClosed={this.feedbackClosed}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={this.onPageChange}
        history={this.props.history}
      />
    );
  }
}
