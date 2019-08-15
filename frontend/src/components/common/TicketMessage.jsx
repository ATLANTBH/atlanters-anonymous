import React, { Component } from "react";
import { getCurrentUser } from "../../services/http/authService";
import PropTypes from "prop-types";
import { DEFAULT_USERNAME } from "../../constants/strings";

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
      return "seen";
    }
  }

  render() {
    const { text, seen, index, totalMessages, info } = this.props;
    const column = this.getColumn();
    return (
      <div
        style={{
          display: "block",
          float: column === 2 ? "right" : "left",
          clear: "both"
        }}
      >
        <div
          style={{
            marginBottom: "5px",
            padding: "4px 12px 4px 12px",
            backgroundColor: column === 2 ? "lightblue" : "lightgray",
            borderRadius: "1.3em"
          }}
        >
          {text}
        </div>
        {this.displaySeen(index, totalMessages, seen)}
        {info && info}
      </div>
    );
  }
}
