import React, { Component } from "react";
import { getFeedbackMessages } from "../../services/http/feedbackService";

export default class FeedbackTicket extends Component {
  state = {
    info: {
      data: ""
    },
    messages: []
  };

  componentDidMount() {
    const { info } = this.props;
    this.setState({ info });
    getFeedbackMessages(info.id)
      .then(res => this.onGetMessagesSuccess(res.result))
      .catch(err => this.onGetMessagesError(err));
  }

  onGetMessagesSuccess(res) {
    this.setState({ messages: res });
  }

  onGetMessagesError(err) {
    alert(err.message);
  }

  render() {
    return (
      <ul>
        {this.state.messages.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    );
  }
}
