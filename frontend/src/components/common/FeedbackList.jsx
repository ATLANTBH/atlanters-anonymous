import classNames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { closeFeedback } from "../../services/http/feedbackService";
import FeedbackItem from "./FeedbackItem";

export default class FeedbackList extends Component {
  static propTypes = {
    /**
     * Array of feedbacks for the current page
     */
    feedbacks: PropTypes.array.isRequired,

    /**
     * True if there is at least one unread message
     */
    hasNewMessages: PropTypes.bool.isRequired,

    /**
     * Total number of pages
     */
    totalPages: PropTypes.array.isRequired,

    /**
     * Current page number
     */
    currentPage: PropTypes.number.isRequired,

    /**
     * Handles pagination
     */
    onPageChange: PropTypes.func.isRequired,

    /**
     * Enables marking all feedbacks as read
     */
    onMarkAllRead: PropTypes.func.isRequired,

    /**
     * Handles feedback when successfully closed
     */
    feedbackClosed: PropTypes.func.isRequired,
  };
  state = {};

  onCloseFeedback = (feedbackId) => {
    closeFeedback(feedbackId)
      .then((res) => this.onCloseFeedbackSuccess(res.result, feedbackId))
      .catch((err) => this.onCloseFeedbackError(err));
  };

  onCloseFeedbackSuccess = (res, feedbackId) => {
    this.props.feedbackClosed(feedbackId);
  };

  onCloseFeedbackError = (err) => {
    alert(err);
    window.location.reload();
  };

  renderFeedback = (feedback, index) => {
    const { Messages } = feedback;
    if (Messages && Messages.length !== 0)
      return (
        <FeedbackItem
          key={feedback.id}
          id={feedback.id}
          createdAt={feedback.createdAt}
          isClosed={feedback.isClosed}
          onCloseFeedback={this.onCloseFeedback}
          userSeenAt={feedback.anonymLastSeenAt}
          hasNewMessages={feedback.hasNewMessages}
          history={this.props.history}
        />
      );
  };

  /**
   * When page number is clicked
   */
  onPageChange = (e) => {
    let currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", e.target.id);
    this.props.history.push(
      window.location.pathname + "?" + currentUrlParams.toString()
    );
    this.props.onPageChange(e.target.id);
  };

  render() {
    let { feedbacks, totalPages, currentPage, hasNewMessages } = this.props;
    return (
      <div className="feedbacks-container">
        <div className="page">
          <div className="pagination">
            {totalPages.map((number) => (
              <li
                className={classNames(
                  "number",
                  currentPage === number ? "selected" : ""
                )}
                key={number}
                id={number}
                onClick={this.onPageChange}
              >
                {number}
              </li>
            ))}
          </div>
          <div>
            <Table className="feedbacks-table">
              <thead>
                <tr className="feedback-item-container info table-head">
                  <td className="notification-icon header" onClick={this.props.onMarkAllRead}>
                    <span className="circle header" style={hasNewMessages ? { color: "rgb(0, 164, 216)" } : { color: "rgb(169, 169, 169)" }}></span>
                  </td>
                  <td>Feedback Created</td>
                  <td>Latest User Visit</td>
                </tr>
              </thead>
              <tbody className="table-body">
                {feedbacks.map((item, index) =>
                  this.renderFeedback(item, index)
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
