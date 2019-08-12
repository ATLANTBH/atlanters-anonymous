import React, { Component } from "react";
import { getFeedbackMessages } from "../../services/http/feedbackService";
import TicketMessage from "./TicketMessage";
import { getCurrentUser } from "../../services/http/authService";
import PropTypes from "prop-types";
import { DEFAULT_USERNAME } from "../../constants/strings";
import {
  onMessageReceived,
  onErrorReceived,
  emitMessage
} from "../../services/socket/chat";
import { connectSocket } from "../../services/socket/base";

export default class FeedbackTicket extends Component {
  static propTypes = {
    /**
     * Feedback info returned from server after it is initially created
     */
    feedbackInfo: PropTypes.isRequired,
    feedbackInfo: PropTypes.shape({
      id: PropTypes.string,
      isClosed: PropTypes.bool
    })
  };

  state = {
    messages: [],
    inputMessage: "",
    user: {
      name: "",
      id: ""
    },
    isMessageSubmitting: false
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
    this.setState({ messages, isMessageSubmitting: false });
  };

  /**
   * Called when server emits an error through socket
   *
   * @param {String} error error message
   */
  onChatErrorReceived = error => {
    alert(error);
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
      .then(res => this.onGetMessagesSuccess(res.result))
      .catch(err => this.onGetMessagesError(err));
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  /**
   * Called when messages successfully received on component mount
   *
   * @param {Array} res array of messages from the server
   */
  onGetMessagesSuccess(res) {
    this.setState({ messages: res });
    const { user } = this.state;
    onMessageReceived(this.props.feedbackInfo.id, this.onChatMessageReceived);
    onErrorReceived(
      user.name === DEFAULT_USERNAME ? -1 : user.id,
      this.onChatErrorReceived
    );
  }

  /**
   * Called on error when fetching messages on component mount
   *
   * @param {Object} err
   */
  onGetMessagesError(err) {
    alert(err.message);
  }

  /**
   * Called when new message is submited
   */
  onSendMessage = e => {
    e.preventDefault();
    const { inputMessage, user } = this.state;
    if (inputMessage === "") return;
    const { id } = this.props.feedbackInfo;
    this.setState({ isMessageSubmitting: true });
    emitMessage(inputMessage, user.id, id);
  };

  render() {
    const { inputMessage, messages, isMessageSubmitting } = this.state;
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
            value={
              feedbackInfo.isClosed ? "This ticket is closed" : inputMessage
            }
            disabled={feedbackInfo.isClosed}
            onChange={e => this.setState({ inputMessage: e.target.value })}
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
