import React, { Component } from "react";
import PropTypes from "prop-types";
import { redirect, newWindowLocation } from "../../utils/navigate";
import { FEEDBACK_CHAT } from "../../constants/routes";
import dateformat from "dateformat";

export default class FeedbackItem extends Component {
  onFeedback = () => {
    const { id } = this.props;
    newWindowLocation(FEEDBACK_CHAT(id));
  };

  onClose = e => {
    e.stopPropagation();
    this.props.onCloseFeedback(this.props.id);
  };

  render() {
    const { createdAt, message, isClosed } = this.props;
    return (
      <div
        className="feedback-item-container"
        style={{
          gridColumn: 2,
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          backgroundColor: "white",
          borderRadius: "6px",
          padding: "15px",
          marginBottom: "10px",
          gridGap: "30px"
        }}
        onClick={this.onFeedback}
      >
        <div style={{ gridColumn: 1 }}>
          {dateformat(createdAt, "dd/mm/yyyy HH:MM")}
        </div>
        <div style={{ gridColumn: 2 }}>{message}</div>
        {!isClosed ? (
          <div style={{ gridColumn: 3 }} className="text-right">
            <button onClick={e => this.onClose(e)}>Close Ticket</button>
          </div>
        ) : (
          <div style={{ color: "darkred" }}>Closed</div>
        )}
      </div>
    );
  }
}
