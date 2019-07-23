import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class FeedbackForm extends PureComponent {
  static propTypes = {
    /**
     * Value of a feedback.
     */
    value: PropTypes.string.isRequired,

    /**
     * Called when value gets changed.
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Called when submission of feedback is requested.
     */
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    const { value, onChange, onSubmit } = this.props;

    // TODO(kklisura): Render just a basic form with single text area and a footer with buttons.
    return null;
  }
}
