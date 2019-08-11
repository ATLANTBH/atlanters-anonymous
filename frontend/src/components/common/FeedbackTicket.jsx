import React, { Component } from "react";
import { getFeedbackMessages } from "../../services/http/feedbackService";
import TicketMessage from "./TicketMessage";
import { getCurrentUser } from "../../services/http/authService";
import PropTypes from "prop-types";
import { DEFAULT_USERNAME, CHAT_EVENT } from "../../constants/strings";
import { onMessageReceived, emitMessage } from "../../services/socket/chat";
import { connectSocket } from "../../services/socket/base";

export default class FeedbackTicket extends Component {
  static propTypes = {
    /**
     * Result returned from server after feedback is created
     */
    feedbackInfo: PropTypes.isRequired,
    feedbackInfo: PropTypes.shape({
      id: PropTypes.string,
      isClosed: PropTypes.bool
    })
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

  onChatMessageReceived = data => {
    if (data.error) {
      alert(data.error);
    } else {
      const { messages } = this.state;
      messages.push(data);
      this.setState({ messages, newMessage: "" });
    }
    this.setState({ isMessageSubmitting: false });
  };

  componentDidMount() {
    this.scrollToBottom();
    connectSocket();
    const { feedbackInfo } = this.props;
    const user = getCurrentUser();
    this.setState({
      user: {
        name: user ? user.name : DEFAULT_USERNAME,
        id: user ? user.id : null
      }
    });
    getFeedbackMessages(feedbackInfo.id)
      .then(res => this.onGetMessagesSuccess(res.result, feedbackInfo.id))
      .catch(err => this.onGetMessagesError(err));
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onGetMessagesSuccess(res) {
    this.setState({ messages: res });
    onMessageReceived(this.props.feedbackInfo.id, this.onChatMessageReceived);
  }

  onGetMessagesError(err) {
    alert(err.message);
  }

  onSendMessage = e => {
    e.preventDefault();
    const { newMessage, user } = this.state;
    if (newMessage === "") return;
    const { id } = this.props.feedbackInfo;
    this.setState({ isMessageSubmitting: true });
    emitMessage(newMessage, user.id, id);
  };

  render() {
    const { newMessage, messages, isMessageSubmitting } = this.state;
    const { feedbackInfo } = this.props;
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
            value={feedbackInfo.isClosed ? "This ticket is closed" : newMessage}
            disabled={feedbackInfo.isClosed}
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
