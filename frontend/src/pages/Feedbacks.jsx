import React, { Component } from "react";
import { getAllFeedback } from "../services/http/feedbackService";
import { newWindowLocation } from "../utils/navigate";
import { FEEDBACK_ROUTE } from "../constants/routes";
import FeedbackList from "../components/common/FeedbackList";
import queryString from "query-string";

export default class Feedbacks extends Component {
  state = {
    feedbacks: [],
    currentFeedbacks: [],
    currentPage: 1,
    totalPages: [],
    itemsPerPage: 10
  };

  componentDidMount() {
    getAllFeedback()
      .then(res => this.onGetFeedbackSuccess(res.result))
      .catch(err => this.onGetFeedbackError(err));
  }

  calcTotalPages = res => {
    const { itemsPerPage, totalPages } = this.state;
    for (let i = 1; i <= Math.ceil(res.length / itemsPerPage); i++) {
      totalPages.push(i);
    }
    return totalPages;
  };

  onGetFeedbackSuccess = res => {
    const { page } = queryString.parse(this.props.location.search);
    this.setState({
      feedbacks: res.reverse(),
      totalPages: this.calcTotalPages(res)
    });
    this.onPageChange(page);
  };

  onGetFeedbackError = err => {
    alert(err);
    newWindowLocation(FEEDBACK_ROUTE);
  };

  feedbackClosed = feedbackId => {
    const { currentFeedbacks } = this.state;
    const index = currentFeedbacks.findIndex(item => item.id === feedbackId);
    currentFeedbacks[index].isClosed = true;
    this.setState({ currentFeedbacks });
  };

  onPageChange = page => {
    const { feedbacks, itemsPerPage } = this.state;
    const indexOfLastFeedback = page * itemsPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - itemsPerPage;
    const currentFeedbacks = feedbacks.slice(
      indexOfFirstFeedback,
      indexOfLastFeedback
    );
    this.setState({ currentPage: page, currentFeedbacks });
  };

  render() {
    return (
      <FeedbackList
        feedbacks={this.state.currentFeedbacks}
        feedbackClosed={this.feedbackClosed}
        totalPages={this.state.totalPages}
        onPageChange={this.onPageChange}
        history={this.props.history}
      />
    );
  }
}
