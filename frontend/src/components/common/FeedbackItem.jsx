import dateformat from "dateformat";
import React, { Component } from "react";
import { FEEDBACK_CHAT } from "../../constants/routes";
import { newWindowLocation } from "../../utils/navigate";

export default class FeedbackItem extends Component {
  onFeedback = () => {
    const { id } = this.props;
    newWindowLocation(FEEDBACK_CHAT(id));
  };

  onClose = e => {
    e.stopPropagation();
    this.props.onCloseFeedback(this.props.id);
  };

  outputMessage = message => {
    return message.length > 40 ? message.slice(0, 40) + "..." : message;
  };

  render() {
    const { createdAt, message, isClosed, userSeenAt } = this.props;
    return (
      <div className="feedback-item-container" onClick={this.onFeedback}>
        <div className="text created-at">
          {dateformat(createdAt, "dd/mm/yyyy HH:MM")}
        </div>
        <div className="text user-seen-at">
          {dateformat(userSeenAt, "dd/mm/yyyy HH:MM")}
        </div>
        <div className="text message">{this.outputMessage(message)}</div>
        <div className="closed">
          {!isClosed ? (
            <div className="button text-center">
              <button
                className="btn btn-danger button"
                onClick={e => this.onClose(e)}
              >
                <div className="close-text">Close</div>
              </button>
            </div>
          ) : (
            <div className="text text-center">Closed</div>
          )}
        </div>
      </div>
    );
  }
}
