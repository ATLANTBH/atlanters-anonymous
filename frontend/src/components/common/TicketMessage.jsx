import classNames from "classnames";
import dateformat from "dateformat";
import PropTypes from "prop-types";
import React, { Component } from "react";
import seenImg from "../../assets/images/feedback/seen.png";
import { getCurrentUser } from "../../services/http/authService";

export default class TicketMessage extends Component {
  static propTypes = {
    /**
     * Currently logged in user,
     */
    user: PropTypes.object,

    /**
     * Message to display
     */
    text: PropTypes.string.isRequired,

    /**
     * If user on other end saw the message
     */
    seen: PropTypes.bool.isRequired,

    /**
     * Current message index
     */
    index: PropTypes.number.isRequired,

    /**
     * Total number of messages
     */
    totalMessages: PropTypes.number.isRequired,

    /**
     * When the message was created
     */
    date: PropTypes.string.isRequired,
  };

  /**
   * Used to output message on the left or the right of chat
   */
  getColumn = () => {
    const currentUser = getCurrentUser();
    const { user } = this.props;
    const leftColumn = 1;
    const rightColumn = 2;
    if (currentUser) {
      return user ? rightColumn : leftColumn;
    } else {
      return user ? leftColumn : rightColumn;
    }
  };

  displaySeen(index, totalMessages, seen) {
    if (index === totalMessages - 1 && seen) {
      return (
        <div className="seen-container text-right">
          <img className="seen" src={seenImg} alt="Seen" />
          <div className="seen-msg">Seen</div>
        </div>
      );
    }
  }

  render() {
    const { text, seen, index, totalMessages, info, date } = this.props;
    const column = this.getColumn();
    return (
      <div
        className={classNames(
          "message-container",
          column === 2 ? "right" : "left"
        )}
      >
        <div
          className={classNames(
            "message-text",
            column === 2 ? "right" : "left"
          )}
        >
          {text}
        </div>
        <div className="seen-container">
          <div
            className={classNames("seen-msg", column === 2 ? "right" : "left")}
          >
            {dateformat(date, "dd/mm/yyyy HH:MM")}
          </div>
        </div>
        {this.displaySeen(index, totalMessages, seen)}
        {info && info}
      </div>
    );
  }
}
