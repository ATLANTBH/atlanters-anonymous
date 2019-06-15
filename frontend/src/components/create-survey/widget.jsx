import React, { Component } from "react";
import movableIndicator from "../../assets/create-survey/widgets/movable-indicator.png";
import { Draggable, Container } from "react-smooth-dnd";

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
          />
          <p>{this.props.name}</p>
          <img className="move" src={movableIndicator} alt="Move" />
        </div>
      </Draggable>
    );
  }
}

export default Widget;