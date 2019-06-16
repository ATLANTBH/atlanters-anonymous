import React from "react";
import SectionForm from "../../../common/section-form";

export default class Title extends SectionForm {
  state = {
    title: "",
    description: ""
  };

  handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    this.state[name] = value;
    this.setState(this.state);
    this.props.onChange(this.state);
  }

  render() {
    const { title, description } = this.state;
    return (
      <div className="section-form-title">
        {this.renderTextInput(
          "title",
          "Survey Title",
          this.handleChange.bind(this),
          "text",
          true,
          title
        )}
        {this.renderTextInput(
          "description",
          "Survey description (optional)",
          this.handleChange.bind(this),
          "text",
          false,
          description
        )}
      </div>
    );
  }
}
