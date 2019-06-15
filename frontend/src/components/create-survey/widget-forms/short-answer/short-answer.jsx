import React, { Component } from "react";
import { Draggable } from "react-smooth-dnd";

class ShortAnswer extends Component {
  render() {
    return (
      <h1>
        {this.props.name} - {this.props.height}
      </h1>
    );
  }
}

export default ShortAnswer;
