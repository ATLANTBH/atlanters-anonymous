import React, { Component } from "react";

class SectionForm extends Component {
  renderTextInput(name, placeholder, type = "text", large = false) {
    return (
      <input
        className={"text-input " + (large ? "large" : "")}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={"off"}
      />
    );
  }
}

export default SectionForm;
