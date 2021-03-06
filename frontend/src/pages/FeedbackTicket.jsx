import React, { Component } from "react";
import TicketMessage from "../components/common/TicketMessage";
import { ANONYMOUS_LAST_SEEN, USER_LAST_SEEN } from "../constants/strings";
import { DEFAULT_USERNAME, DEFAULT_USER_ID } from "../constants/user";
import { getCurrentUser } from "../services/http/authService";
import {
  closeFeedback,
  getFeedback,
  getFeedbackMessages,
  postFeedbackMessage,
  updateSeenAt,
} from "../services/http/feedbackService";
import { connectSocket } from "../services/socket/base";
import {
  emitMessage,
  onErrorReceived,
  onMessageReceived,
  onSeen,
} from "../services/socket/chat";
import { sortMessages } from "../utils/array";
import { validateInputMessage } from "../utils/strings";
import { ANONYMOUS_USER } from "../utils/user";

export default class FeedbackTicket extends Component {
  state = {
    id: "",
    messages: [],
    inputMessage: "",
    latestAuthorName: "",
    /**
     * Current user (anonymous or logged in)
     */
    user: {
      name: "",
      id: "",
    },
    isMessageSubmitting: false,
    seen: false,
    /**
     * Checks if this client is the author of received chat message
     */
    isAuthorCurrentClient: false,
    isClosed: false,
    error: "",
  };

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focus = this.focus.bind(this);
  }

  resolveCurrentUser = () => {
    return getCurrentUser() ? getCurrentUser() : ANONYMOUS_USER;
  };

  resolveAuthorName = (message) => {
    return message.User ? message.User.name : ANONYMOUS_USER.name;
  };

  /**
   * Scroll to bottom of chat container
   */
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  };

  /**
   * Called when server emits a message through socket
   *
   * @param {Object} data corresponds to message model from the server
   */
  onChatMessageReceived = (data) => {
    const latestAuthorName = this.resolveAuthorName(data[data.length - 1]);
    this.setState({
      messages: data,
      isMessageSubmitting: false,
      seen: false,
      latestAuthorName,
    });
  };

  /**
   * Called when server emits an error through socket
   *
   * @param {String} error error message
   */
  onChatErrorReceived = (error) => {
    this.state.socket.disconnect();
    this.setState({ isMessageSubmitting: false });
  };

  /**
   * Called when seen is transmitted
   */
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

  /**
   * If error occured in a socket
   * @param {Object} err
   */
  onEmitSeenError(err) {
    this.state.socket.disconnect();
  }

  /**
   * Returns true if latest message was seen by user on opposite end, and
   * if current user is author of latest message
   *
   * @param {String} messageCreatedAt when message was created
   * @param {String} latestAuthorName author of latest message
   * @param {String} feedbackSeenAt when user on opposite end had seen the message
   * @param {String} currentUser represents if current client is anonymous or logged in
   */
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

  /**
   * Sets states of necessary properties on mount
   */
  updateMountState = (socket, user, { isClosed, messages, id }) => {
    const lastMessage = messages[messages.length - 1];
    const latestAuthorName = this.resolveAuthorName(lastMessage);
    this.setState({
      id,
      user,
      messages,
      latestAuthorName,
      socket,
      isClosed,
      error: "",
    });
  };

  onGetFeedbackMessagesSuccess = (feedbackResult, messagesResult) => {
    this.scrollToBottom();
    const socket = connectSocket();
    const user = this.resolveCurrentUser();
    const feedback = {
      id: feedbackResult.id,
      isClosed: feedbackResult.isClosed,
      messages: messagesResult.messages,
    };
    this.updateMountState(socket, user, feedback);
    onMessageReceived(feedback.id, this.onChatMessageReceived);
    onErrorReceived(user ? user.id : DEFAULT_USER_ID, this.onChatErrorReceived);
    onSeen(feedback.id, this.onSeenReceived);
    this.updateSeenInfo();
    window.addEventListener("focus", this.onFocus);
  };

  onGetFeedbackMessagesError = (err) => {};

  onGetFeedbackSuccess = (feedback) => {
    getFeedbackMessages(this.props.match.params.feedbackId)
      .then((res) => this.onGetFeedbackMessagesSuccess(feedback, res.result))
      .catch((err) => this.onGetFeedbackMessagesError(err));
  };

  onGetFeedbackError = (err) => {};

  componentDidMount() {
    getFeedback(this.props.match.params.feedbackId)
      .then((res) => this.onGetFeedbackSuccess(res.result))
      .catch((err) => this.onGetFeedbackError(err));
  }

  /**
   * Updates latest user visit
   */
  updateSeenInfo = () => {
    const user = this.resolveCurrentUser();
    const { id } = this.state;
    const date = new Date();
    const payload = {
      [user.name !== DEFAULT_USERNAME
        ? USER_LAST_SEEN
        : ANONYMOUS_LAST_SEEN]: date,
    };
    updateSeenAt(id, payload)
      .catch((err) => this.onUpdateSeenError(err))
      .then((res) => this.onUpdateSeenSuccess(res.result, user, id, date))
      .catch((err) => this.onEmitSeenError(err));
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

  onUpdateSeenSuccess(res, user, feedbackId, date) {}

  /**
   * If error occured during REST call
   * @param {Object} err
   */
  onUpdateSeenError(err) {
    if (err.message.includes("Failed to fetch")) {
      return;
    }
    this.setState({ error: err.message });
  }

  onCloseFeedback = () => {
    const { id } = this.state;
    closeFeedback(id)
      .then((res) => this.onCloseFeedbackSuccess())
      .catch((err) => this.onCloseFeedbackError(err));
  };

  onCloseFeedbackSuccess = () => {
    this.setState({ isClosed: true });
  };

  onCloseFeedbackError = (err) => {
    alert(err);
    window.location.reload();
  };

  onSendMessage = (e) => {
    e.preventDefault();
    const { inputMessage, user } = this.state;
    if (inputMessage === "") return;
    const error = validateInputMessage(inputMessage);
    if (error) {
      this.setState({ error });
      return;
    }
    const { id } = this.state;
    this.setState({ isMessageSubmitting: true });
    postFeedbackMessage(id, user.id === DEFAULT_USER_ID ? "" : user.id, {
      text: inputMessage,
    })
      .then((res) => this.onPostFeedbackMessageSuccess(res.result))
      .catch((err) => this.onPostFeedbackMessageError(err));
  };

  onPostFeedbackMessageSuccess = (res) => {
    const { messages } = this.state;
    messages.push(res);
    const lastMessage = messages[messages.length - 1];
    const latestAuthorName = this.resolveAuthorName(lastMessage);
    this.setState({
      messages,
      isMessageSubmitting: false,
      isAuthorCurrentClient: true,
      seen: false,
      latestAuthorName,
      inputMessage: "",
    });
    emitMessage(this.state.id, messages);
    this.focus();
  };

  onPostFeedbackMessageError = (err) => {
    this.setState({ error: err.message, isMessageSubmitting: false });
  };

  onEnter = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.onSendMessage(e);
    }
  };

  displayMessages = (messages, seen) => {
    const sortedMessages = sortMessages(messages);
    return sortedMessages.map((item, index) => (
      <TicketMessage
        key={index}
        totalMessages={messages.length}
        index={index}
        text={item.text}
        info={item.info}
        user={item.User}
        seen={seen}
        date={item.createdAt}
      />
    ));
  };

  /**
   * focus on message input field
   */
  focus() {
    this.textInput.current.focus();
  }

  render() {
    const {
      inputMessage,
      messages,
      seen,
      isMessageSubmitting,
      error,
      isClosed,
      id,
    } = this.state;
    return (
      <div className="feedback-ticket">
        <div className="form feedback-card">
          <div className="ticket-title text-center">Ticket id: {id}</div>
          <hr />
          <div className="messages-container">
            {this.displayMessages(messages, seen)}
            <div
              className="bottom-message"
              ref={(el) => {
                this.messagesEnd = el;
              }}
            >
              {error}
            </div>
          </div>
          <form
            className="submit-message-container"
            onSubmit={this.onSendMessage}
            ref={(el) => (this.submitForm = el)}
          >
            <textarea
              className="input"
              placeholder="Type a message ..."
              onChange={(e) => this.setState({ inputMessage: e.target.value })}
              value={isClosed ? "This ticket is closed" : inputMessage}
              disabled={isClosed || isMessageSubmitting}
              ref={this.textInput}
              wrap="hard"
              rows="2"
              cols="20"
              onKeyDown={this.onEnter}
            />
          </form>
        </div>
      </div>
    );
  }
}
