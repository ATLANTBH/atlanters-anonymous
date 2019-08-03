import React, { Component } from "react";
import Input from "../ui/create-survey/Input";
import classNames from "classnames";
import {
  TITLE_INIT_VALUE,
  SURVEY_DESCRIPTION_PLACEHOLDER
} from "../../../constants/survey";

export default class TitleForm extends Component {
  state = {
    title: TITLE_INIT_VALUE,
    description: ""
  };

  handleChange({ currentTarget }) {
    const { name, value } = currentTarget;
    const newState = this.state;
    newState[name] = value;
    this.setState(newState);
    this.props.onChange(newState);
  }

  render() {
    const { title, description } = this.state;
    const { active } = this.props;
    return (
      <div
        className={classNames(
          "widget-form",
          { active: active, inactive: !active },
          "title"
        )}
        onClick={this.props.onClick}
      >
        <Input
          type="text"
          name="title"
          value={title}
          placeholder={TITLE_INIT_VALUE}
          onChange={this.handleChange.bind(this)}
        />
        <Input
          type="text"
          name="description"
          value={description}
          placeholder={SURVEY_DESCRIPTION_PLACEHOLDER}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
