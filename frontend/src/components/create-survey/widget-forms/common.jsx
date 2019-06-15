import React, { Component } from "react";
import Switch from "react-switch";
import { Draggable } from "react-smooth-dnd";
import duplicate from "../../../assets/create-survey/duplicate.png";
import trash from "../../../assets/create-survey/trash.png";

class Common extends Component {
  state = {
    active: false,
    checked: false
  };

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <Draggable
        onClick={this.props.handleClick}
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
          {this.props.active && (
            <div className="footer">
              <hr className="horizontal-seperator" />
              <div className="items">
                <Switch
                  className="switch"
                  onChange={this.handleChange.bind(this)}
                  checked={this.state.checked}
                  width={30}
                  height={14}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  offColor="#C1C2C2"
                  onColor="#00a4d8"
                />
                <p className="required-text">Required</p>
                <img
                  className="duplicate-img"
                  onClick={this.props.handleDuplicate}
                  src={duplicate}
                  alt="duplicate"
                />
                <img
                  className="trash-img"
                  onClick={this.props.handleDelete}
                  src={trash}
                  alt="trash"
                />
              </div>
            </div>
          )}
        </div>
      </Draggable>
    );
  }
}

export default Common;
