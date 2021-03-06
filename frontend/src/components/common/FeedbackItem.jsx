import dateformat from "dateformat";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { FEEDBACK_CHAT } from "../../constants/routes";

export default class FeedbackItem extends Component {
  static propTypes = {
    /**
     * Feedback creation date
     */
    createdAt: PropTypes.string.isRequired,

    /**
     * Is ticket closed
     */
    isClosed: PropTypes.bool.isRequired,

    /**
     * Latest date user had seen the ticket
     */
    userSeenAt: PropTypes.string.isRequired,

    /**
     * Has unread messages
     */
    hasNewMessages: PropTypes.bool.isRequired,
  };

  onFeedback = () => {
    const { id } = this.props;
    this.props.history.push(FEEDBACK_CHAT(id));
  };

  onClose = (e) => {
    e.stopPropagation();
    this.props.onCloseFeedback(this.props.id);
  };

  renderNotificationIcon = (hasNewMessages) => {
    if (hasNewMessages) {
      return <span className="circle" style={{ color: "#00a4d8" }}></span>;
    } else return <span className="circle" style={{ color: "#a9a9a9" }}></span>;
  };

  render() {
    const { createdAt, userSeenAt, hasNewMessages } = this.props;
    return (
      <tr className="feedback-item-container" onClick={this.onFeedback}>
        <td className="notification-icon">
          {this.renderNotificationIcon(hasNewMessages)}
        </td>
        <td>
          <div className="text created-at">
            {dateformat(createdAt, "dd/mm/yyyy HH:MM")}
          </div>
        </td>
        <td>
          <div className="text user-seen-at">
            {dateformat(userSeenAt, "dd/mm/yyyy HH:MM")}
          </div>
        </td>
      </tr>
    );
  }
}
