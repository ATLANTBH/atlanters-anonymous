import React, { Component } from "react";
import Input from "../../ui/create-survey/Input";
import {
  QUESTION_PLACEHOLDER,
  DESCRIPTION_PLACEHOLDER,
  TYPE_SHORT_ANSWER
} from "../../../../constants/survey";

export default class ShortAnswer extends Component {
  state = {
    question: "",
    description: ""
  };

  handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    let { question, description } = this.state;
    question = name === "question" ? value : question;
    description = name === "description" ? value : description;
    this.props.getData({
      question,
      description,
      type: TYPE_SHORT_ANSWER,
      id: this.props.id
    });
    this.setState({ [name]: value });
  }

  /**
   * Used to update data state if item duplicated
   */
  componentDidMount() {
    const { data } = this.props;
    if (data) {
      const question = data.question ? data.question : "";
      const description = data.description ? data.description : "";
      this.setState({ question, description });
    }
  }

  render() {
    return (
      <div className="section-form-short-answer">
        <Input
          type="text"
          name="question"
          value={this.state.question}
          placeholder={QUESTION_PLACEHOLDER}
          onChange={this.handleChange.bind(this)}
        />
        <Input
          type="text"
          name="description"
          value={this.state.description}
          placeholder={DESCRIPTION_PLACEHOLDER}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
