import React from "react";
import SectionForm from "../../../common/section-form";

export default class Title extends SectionForm {
  render() {
    return (
      <div className="section-form-title">
        <form className="">
          {this.renderTextInput("title", "Survey Title", "text", true)}
          {this.renderTextInput("description", "Survey description (optional)")}
        </form>
      </div>
    );
  }
}
