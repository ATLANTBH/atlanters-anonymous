import PropTypes from "prop-types";
import React, { Component } from "react";
import send from "../../assets/images/feedback/send.png";
import { DEFAULT_USERNAME } from "../../constants/strings";
import { getCurrentUser } from "../../services/http/authService";
import { updateSeenAt } from "../../services/http/feedbackService";
import { connectSocket } from "../../services/socket/base";
import {
  emitMessage,
  emitSeen,
  onErrorReceived,
  onMessageReceived,
  onSeen
} from "../../services/socket/chat";
import TicketMessage from "./TicketMessage";

export default class FeedbackTicket extends Component {
  static propTypes = {
    /**
     * Feedback info returned from server after it is initially created
     */
    feedback: PropTypes.shape({
      id: PropTypes.string,
      isClosed: PropTypes.bool
    }),

    /**
     * Messages related to specific feedback
     */
    messages: PropTypes.array.isRequired
  };

  state = {
    messages: [],
    inputMessage: "",
    latestAuthorName: "",
    user: {
      name: "",
      id: ""
    },
    isMessageSubmitting: false,
    seen: false
  };

  anonymUser = () => {
    return {
      name: DEFAULT_USERNAME,
      id: -1
    };
  };

  resolveCurrentUser = () => {
    return getCurrentUser() ? getCurrentUser() : this.anonymUser();
  };

  resolveAuthorName = message => {
    return message.User ? message.User.name : this.anonymUser().name;
  };

  /**
   * Scroll to bottom of chat container
   */
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Checks if the client is the author of received chat message
   *
   * @param {String} messageAuthor received message author name
   * @param {String} currentClient name of current client
   */
  isAuthorCurrentClient = (messageAuthor, currentClient) => {
    return messageAuthor === currentClient;
  };

  /**
   * Called when server emits a message through socket
   *
   * @param {Object} data corresponds to message model from the server
   */
  onChatMessageReceived = data => {
    const { messages, user } = this.state;
    if (data.User == null) data.User = { name: DEFAULT_USERNAME };
    if (this.isAuthorCurrentClient(data.User.name, user.name)) {
      this.setState({ inputMessage: "" });
    }
    messages.push(data);
    const lastMessage = messages[messages.length - 1];
    const latestAuthorName = this.resolveAuthorName(lastMessage);
    this.setState({
      messages,
      isMessageSubmitting: false,
      seen: false,
      latestAuthorName
    });
  };

  /**
   * Called when server emits an error through socket
   *
   * @param {String} error error message
   */
  onChatErrorReceived = error => {
    alert(error);
    this.setState({ isMessageSubmitting: false });
    window.location.reload();
  };

  onSeenReceived = ({ user, date }) => {
    const currentUser = this.resolveCurrentUser();
    const { latestAuthorName } = this.state;
    if (
      user.name !== currentUser.name &&
      latestAuthorName === currentUser.name
    ) {
      this.setState({ seen: true });
    }
  };

  isSeen = (
    messageCreatedAt,
    latestAuthorName,
    feedbackSeenAt,
    currentUser
  ) => {
    if (
      new Date(feedbackSeenAt) >= new Date(messageCreatedAt) &&
      latestAuthorName === currentUser
    ) {
      return true;
    }
    return false;
  };

  componentDidMount() {
    this.scrollToBottom();
    connectSocket();
    const { feedback, messages } = this.props;
    const user = this.resolveCurrentUser();
    const lastMessage = messages[messages.length - 1];
    const latestAuthorName = this.resolveAuthorName(lastMessage);
    this.setState({
      user,
      messages,
      latestAuthorName,
      seen: this.isSeen(
        lastMessage.createdAt,
        latestAuthorName,
        user.name !== DEFAULT_USERNAME
          ? feedback.anonymLastSeenAt
          : feedback.userLastSeenAt,
        user.name
      )
    });
    onMessageReceived(feedback.id, this.onChatMessageReceived);
    onErrorReceived(user ? user.id : -1, this.onChatErrorReceived);
    onSeen(feedback.id, this.onSeenReceived);
    this.updateSeenInfo();
    window.addEventListener("focus", this.onFocus);
  }

  updateSeenInfo = () => {
    const user = this.resolveCurrentUser();
    const { id } = this.props.feedback;
    const date = new Date();
    const payload = {
      [user.name !== DEFAULT_USERNAME
        ? "userLastSeenAt"
        : "anonymLastSeenAt"]: date
    };
    updateSeenAt(id, payload)
      .then(res => this.onUpdateSeenSuccess(res.result, user, id, date))
      .catch(err => this.onUpdateSeenError(err));
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    window.removeEventListener("focus", this.onFocus);
  }

  onFocus = () => {
    this.updateSeenInfo();
  };

  onUpdateSeenSuccess(res, user, feedbackId, date) {
    emitSeen(user, feedbackId, date);
  }

  onUpdateSeenError(err) {
    this.updateSeenInfo().catch(err => alert(err));
  }

  /**
   * Called when new message is submited
   */
  onSendMessage = e => {
    e.preventDefault();
    const { inputMessage, user } = this.state;
    if (inputMessage === "") return;
    const { id } = this.props.feedback;
    this.setState({ isMessageSubmitting: true, seen: false });
    emitMessage(inputMessage, user.id, id);
  };

  render() {
    const { inputMessage, messages, seen } = this.state;
    const { feedback } = this.props;
    return (
      <div className="form feedback-card">
        <div className="messages-container">
          {messages.map((item, index) => (
            <TicketMessage
              key={index}
              totalMessages={messages.length}
              index={index}
              text={item.text}
              info={item.info}
              userName={item.User ? item.User.name : DEFAULT_USERNAME}
              seen={seen}
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
          className="submit-message-container"
          onSubmit={this.onSendMessage}
        >
          <input
            className="input"
            type="text"
            value={feedback.isClosed ? "This ticket is closed" : inputMessage}
            disabled={feedback.isClosed}
            placeholder="Type a message..."
            onChange={e => this.setState({ inputMessage: e.target.value })}
          />
          <input
            className="image"
            type="image"
            name="submit"
            border="0"
            alt="Submit"
            src={send}
          />
        </form>
      </div>
    );
  }
}
