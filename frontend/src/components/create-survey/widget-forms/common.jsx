import React, { Component } from "react";
import { Draggable } from "react-smooth-dnd";

class Common extends Component {
  state = {
    active: false
  };

  render() {
    return (
      <Draggable
        onClick={this.props.onClick}
        key={this.props.id}
        style={{ height: this.props.height }}
      >
        <div
          className={
            "widget-form " + (this.props.active ? "active" : " inactive")
          }
        >
          <div className="drag-handle-selector">
            <div className="img">&#x2630;</div>
          </div>
          <div className="contents">
            <this.props.form name={this.props.name} />
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Common;
