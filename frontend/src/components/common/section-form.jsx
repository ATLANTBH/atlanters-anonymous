import React, { Component } from "react";

class SectionForm extends Component {
  renderTextInput(
    name,
    placeholder,
    handleChange = null,
    type = "text",
    large = false,
    value = ""
  ) {
    return (
      <input
        className={"input text-input " + (large ? "large" : "")}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    );
  }

  renderQuestionInput(
    name,
    placeholder,
    handleChange,
    type = "text",
    value = ""
  ) {
    return (
      <input
        className={"input question-input"}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        readOnly={false}
      />
    );
  }
}

export default SectionForm;
