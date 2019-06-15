import React, { Component } from "react";
import { Draggable } from "react-smooth-dnd";

class ShortAnswer extends Component {
  render() {
    return (
      <Draggable key={this.props.id} style={{ height: this.props.height }}>
        <div className="widget-form">
          <div className="drag-handle-selector">
            <div className="img">&#x2630;</div>
          </div>
          <div className="contents">
            <h1>
              {this.props.name} - {this.props.height}
            </h1>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default ShortAnswer;
