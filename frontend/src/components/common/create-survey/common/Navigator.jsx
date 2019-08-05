import React, { Component } from "react";
import arrows from "../../../../assets/images/create-survey/arrows";

export default class Navigator extends Component {
  state = {};

  onSubmit = () => {
    console.log(this.props.survey);
  };

  render() {
    return (
      <div className="navigator-container">
        <div className="navigator">
          <p className="back">
            <img src={arrows.arrowLeftEnabled} alt="Back" />
            Back
          </p>
          <p className="steps">Step 1 of 2</p>
          <p className="next" onClick={this.onSubmit}>
            Next
            <img src={arrows.arrowRightDisabled} alt="Next" />
          </p>
        </div>
      </div>
    );
  }
}