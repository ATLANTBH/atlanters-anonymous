import React, { Component } from "react";
import {
  getFeedbackMessages,
  submitMessage
} from "../../services/http/feedbackService";
import TicketMessage from "./TicketMessage";
import { getCurrentUser } from "../../services/http/authService";
import PropTypes from "prop-types";
import { DEFAULT_USERNAME } from "../../constants/strings";
export default class FeedbackTicket extends Component {
  static propTypes = {
    /**
     * Result returned from server after feedback is created
     */
    info: PropTypes.object.isRequired
  };

  state = {
    messages: [],
    newMessage: "",
    user: {
      name: "",
      id: ""
    },
    isMessageSubmitting: false
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
    const { info } = this.props;
    const user = getCurrentUser();
    this.setState({
      user: {
        name: user ? user.name : DEFAULT_USERNAME,
        id: user ? user.id : null
      }
    });
    getFeedbackMessages(info.id)
      .then(res => this.onGetMessagesSuccess(res.result))
      .catch(err => this.onGetMessagesError(err));
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onGetMessagesSuccess(res) {
    this.setState({ messages: res });
  }

  onGetMessagesError(err) {
    alert(err.message);
  }

  onSendMessage = e => {
    e.preventDefault();
    const { newMessage, user } = this.state;
    if (newMessage === "") return;
    const { id } = this.props.info;
    this.setState({ isMessageSubmitting: true });
    submitMessage(id, user.id, { text: newMessage })
      .then(res => this.onSendMessageSuccess(res.result))
      .catch(err => this.onSendMessageError(err));
  };

  onSendMessageSuccess = res => {
    const { messages } = this.state;
    messages.push(res);
    this.setState({ newMessage: "", messages, isMessageSubmitting: false });
  };

  onSendMessageError = err => {
    alert(err);
    this.setState({ isMessageSubmitting: false });
  };

  render() {
    const { newMessage, messages, isMessageSubmitting } = this.state;
    const { info } = this.props;
    return (
      <div className="form feedback-card">
        <div
          style={{
            width: "100%",
            height: "300px",
            border: "1px solid #94a8c2",
            overflow: "auto",
            borderRadius: "4px",
            padding: "16px 16px 0px 16px"
          }}
        >
          {messages.map((item, index) => (
            <TicketMessage
              key={index}
              index={index}
              text={item.text}
              userName={item.User ? item.User.name : DEFAULT_USERNAME}
            />
          ))}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "4fr 1fr"
          }}
          onSubmit={this.onSendMessage}
        >
          <input
            type="text"
            style={{
              border: "1px solid #94a8c2",
              borderTop: 0,
              width: "100%",
              gridColumn: "1",
              borderRadius: "4px"
            }}
            value={info.isClosed ? "This ticket is closed" : newMessage}
            disabled={info.isClosed}
            onChange={e => this.setState({ newMessage: e.target.value })}
          />
          <button
            style={{
              gridColumn: "2",
              border: "1px solid #94a8c2",
              borderTop: 0,
              borderLeft: 0
            }}
            disabled={isMessageSubmitting}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}
