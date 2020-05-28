import PropTypes from "prop-types";
import React, { PureComponent } from "react";

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
    onNext: PropTypes.func.isRequired,

    /**
     * Error value
     */
    error: PropTypes.string.isRequired,
  };

  render() {
    const { value, onChange, onNext, error } = this.props;
    return (
      <form className="form feedback-card" onSubmit={onNext}>
        <div className="title form-title">Help us become better</div>
        <label className="basic" htmlFor={"feedback"}>
          How can we improve?
        </label>
        <textarea
          className="form-control"
          name="feedback"
          placeholder="A penny for your thoughts..."
          onChange={(e) => onChange(e.target.value)}
          value={value}
          wrap="hard"
          rows="4"
          cols="20"
        />
        <small className="form-text">
          *Everything you send us will be completely anonymous
        </small>
        <small className="error">{error}</small>
        <div className="submit-container">
          <button className="btn btn-primary submit filled1" disabled={!value}>
            <div className="filled1-text">NEXT</div>
          </button>
        </div>
      </form>
    );
  }
}
