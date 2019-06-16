import React from "react";
import SectionForm from "../../../common/section-form";

export default class Title extends SectionForm {
  state = {
    title: "",
    description: ""
  };

  render() {
    return (
      <div className="section-form-title">
        {this.renderTextInput("title", "Survey Title", "text", true)}
        {this.renderTextInput("description", "Survey description (optional)")}
      </div>
    );
  }
}
