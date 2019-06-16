import React, { Component } from "react";

class SectionForm extends Component {
  handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    console.log(name, value);
  }

  renderTextInput(name, placeholder, type = "text", large = false) {
    return (
      <input
        className={"text-input " + (large ? "large" : "")}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={"off"}
        onChange={this.handleChange}
      />
    );
  }
}

export default SectionForm;
