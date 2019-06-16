import React, { Component } from "react";
import SectionForm from "../../../common/section-form";

class ShortAnswer extends SectionForm {
  state = {
    question: "",
    description: ""
  };

  handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    this.state[name] = value;
    this.setState(this.state);
    this.props.onChange(this.state);
  }

  render() {
    const { question, description } = this.state;

    return (
      <div className="section-form-short-answer">
        {this.renderQuestionInput(
          "question",
          "Short Answer",
          this.handleChange.bind(this),
          "text",
          question
        )}
        {this.renderTextInput(
          "description",
          "Question description (optional)",
          this.handleChange.bind(this),
          "text",
          false,
          description
        )}
      </div>
    );
  }
}

export default ShortAnswer;
