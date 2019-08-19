import PropTypes from "prop-types";
import React, { Component } from "react";
import send from "../../assets/images/feedback/send.png";
import { FEEDBACK_ROUTE } from "../../constants/routes";
import { DEFAULT_USERNAME } from "../../constants/strings";
import { getCurrentUser } from "../../services/http/authService";
import {
  postFeedbackMessage,
  updateSeenAt
} from "../../services/http/feedbackService";
import { connectSocket } from "../../services/socket/base";
import {
  emitMessage,
  emitSeen,
  onErrorReceived,
  onMessageReceived,
  onSeen
} from "../../services/socket/chat";
import { newWindowLocation } from "../../utils/navigate";
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
    this.messagesEnd.scrollIntoView();
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
    if (!this.isAuthorCurrentClient(data.User.name, user.name)) {
      messages.push(data);
      const latestAuthorName = this.resolveAuthorName(data);
      this.setState({
        messages,
        isMessageSubmitting: false,
        seen: false,
        latestAuthorName
      });
    }
  };

  /**
   * Called when server emits an error through socket
   *
   * @param {String} error error message
   */
  onChatErrorReceived = error => {
    alert(error);
    this.setState({ isMessageSubmitting: false });
    newWindowLocation(FEEDBACK_ROUTE);
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

  // TODO(Vedad): Refactor
  componentDidMount() {
    this.scrollToBottom();
    const socket = connectSocket();
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
      ),
      socket
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
      .catch(err => this.onUpdateSeenError(err))
      .then(res => this.onUpdateSeenSuccess(res.result, user, id, date))
      .catch(err => this.onEmitSeenError(err));
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
    alert(err.message);
    newWindowLocation(FEEDBACK_ROUTE);
  }

  // TODO(Vedad): Test this out
  onEmitSeenError(err) {
    console.log(err, "Disconnecting socket...");
    this.state.socket.disconnect();
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
    postFeedbackMessage(id, user.id === -1 ? "" : user.id, {
      text: inputMessage
    })
      .then(res => this.onPostFeedbackMessageSuccess(res.result))
      .catch(err => this.onPostFeedbackMessageError(err));
  };

  onPostFeedbackMessageSuccess = res => {
    const { messages } = this.state;
    if (res.User == null) res.User = { name: DEFAULT_USERNAME };
    messages.push(res);
    const lastMessage = messages[messages.length - 1];
    const latestAuthorName = this.resolveAuthorName(lastMessage);
    this.setState({
      messages,
      isMessageSubmitting: false,
      seen: false,
      latestAuthorName,
      inputMessage: ""
    });
    emitMessage(this.props.feedback.id, res);
  };

  onPostFeedbackMessageError = err => {
    alert(err);
    newWindowLocation(FEEDBACK_ROUTE);
  };

  render() {
    const { inputMessage, messages, seen, isMessageSubmitting } = this.state;
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
            disabled={isMessageSubmitting}
            src={send}
          />
        </form>
      </div>
    );
  }
}
