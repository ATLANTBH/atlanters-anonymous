import React, { Component } from "react";
import arrows from "../../assets/create-survey/arrows";

class Navigator extends Component {
  state = {};
  render() {
    return (
      <div className="navigator">
        <p className="back">
          <img src={arrows.arrowLeftEnabled} />
          Back
        </p>
        <p className="steps">Step 1 of 2</p>
        <p className="next">
          Next
          <img src={arrows.arrowRightDisabled} />
        </p>
      </div>
    );
  }
}

export default Navigator;
