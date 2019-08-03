import React, { Component } from "react";
import movableIndicator from "../../../assets/images/create-survey/widgets/movable-indicator.png";
import { Draggable } from "react-smooth-dnd";

class Widget extends Component {
  state = {};
  render() {
    return (
      <Draggable key={this.props.id}>
        <div className="widget-container">
          <img
            className="left-img"
            src={this.props.image}
            alt={this.props.name}
            draggable={false}
          />
          <p>{this.props.name}</p>
          <img
            className="move"
            src={movableIndicator}
            alt="Move"
            draggable={false}
          />
        </div>
      </Draggable>
    );
  }
}

export default Widget;
