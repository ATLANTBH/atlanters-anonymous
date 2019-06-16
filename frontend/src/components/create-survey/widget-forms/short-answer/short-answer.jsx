import React, { Component } from "react";
import SectionForm from "../../../common/section-form";

class ShortAnswer extends SectionForm {
  state = {
    question: "",
    description: ""
  };

  handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    // this.state[name] = value;
    // console.log("SETTING STATE");
    // this.setState(this.state);
    this.props.onChange(name, value);
  }

  render() {
    // const { question, description } = this.state;
    // console.log("PROP DATA", this.props.data);
    return (
      <div className="section-form-short-answer">
        <input
          className={"input question-input"}
          type="text"
          name="question"
          value={this.props.question}
          placeholder="Short Answer"
          onChange={this.handleChange.bind(this)}
          readOnly={false}
        />
        <input
          className={"input text-input"}
          type="text"
          name="description"
          placeholder="Description"
          onChange={this.handleChange.bind(this)}
          value={this.props.description}
        />
        {/* {this.renderQuestionInput(
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
        )} */}
      </div>
    );
  }
}

export default ShortAnswer;
