import classNames from "classnames";
import dateformat from "dateformat";
import PropTypes from "prop-types";
import React, { Component } from "react";
import seenImg from "../../assets/images/feedback/seen.png";
import { DEFAULT_USERNAME } from "../../constants/user";
import { getCurrentUser } from "../../services/http/authService";

export default class TicketMessage extends Component {
  static propTypes = {
    /**
     * Username of currently logged in user,
     * if not logged in username is defined in constants/strings
     */
    userName: PropTypes.string.isRequired,

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
    const user = getCurrentUser();
    const { userName } = this.props;
    if (user) {
      return user.name === userName ? 2 : 1;
    } else {
      return userName === DEFAULT_USERNAME ? 2 : 1;
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
        <div className="seen-container text-right">
          <div className="seen-msg">{dateformat(date, "dd/mm/yyyy HH:MM")}</div>
        </div>
        {this.displaySeen(index, totalMessages, seen)}
        {info && info}
      </div>
    );
  }
}
