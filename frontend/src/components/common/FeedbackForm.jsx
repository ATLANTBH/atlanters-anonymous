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
    onNextClicked: PropTypes.func.isRequired
  };

  render() {
    const { value, onChange, onNextClicked } = this.props;
    return (
      <form className="form feedback-card" onSubmit={onNextClicked}>
        <div className="title form-title">Help us become better</div>
        <label className="basic" htmlFor={"feedback"}>
          How can we improve?
        </label>
        <textarea
          className="form-control"
          name="feedback"
          placeholder="A penny for your thoughts..."
          onChange={onChange}
          value={value}
          wrap="hard"
          rows="4"
          cols="20"
        />
        <small className="form-text">
          *Everything you send us will be completely anonymous
        </small>
        <div className="submit-container">
          <button className="btn btn-primary submit filled1" disabled={!value}>
            <div className="filled1-text">NEXT</div>
          </button>
        </div>
      </form>
    );
  }
}
