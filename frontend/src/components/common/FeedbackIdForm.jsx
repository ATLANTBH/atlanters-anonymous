import PropTypes from "prop-types";
import React, { Component } from "react";

export default class FeedbackIdForm extends Component {
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
     * Show an error if not null
     */
    error: PropTypes.string
  };

  render() {
    const { value, onChange, onNext, error } = this.props;
    return (
      <form className="form feedback-card feedback-id" onSubmit={onNext}>
        <div className="title form-title feedback-id">
          Already created a ticket?
        </div>
        <input
          className="form-control"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Ticket id..."
        />
        <small className="form-text">
          *Example: 07b772c3-45b2-4d91-9149-84f842acd8f2
        </small>
        <small className="form-text error">{error && error}</small>
        <div className="submit-container feedback-id">
          <button className="btn btn-primary submit filled1" disabled={!value}>
            <div className="filled1-text">NEXT</div>
          </button>
        </div>
      </form>
    );
  }
}
