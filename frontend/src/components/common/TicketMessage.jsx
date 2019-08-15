import React, { Component } from "react";
import { getCurrentUser } from "../../services/http/authService";
import PropTypes from "prop-types";
import { DEFAULT_USERNAME } from "../../constants/strings";
import classNames from "classnames";
import seenImg from "../../assets/images/feedback/seen.png";

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
    text: PropTypes.string.isRequired
  };

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
        </div>
      );
    }
  }

  render() {
    const { text, seen, index, totalMessages, info } = this.props;
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
        {this.displaySeen(index, totalMessages, seen)}
        {info && info}
      </div>
    );
  }
}
