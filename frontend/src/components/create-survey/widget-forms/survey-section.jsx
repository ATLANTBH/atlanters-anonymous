import React, { Component, useState } from "react";
import Switch from "react-switch";
import { Draggable } from "react-smooth-dnd";
import duplicate from "../../../assets/create-survey/duplicate.png";
import trash from "../../../assets/create-survey/trash.png";
import dragHandle from "../../../assets/create-survey/drag-handle.png";

class SurveySection extends Component {
  state = {
    data: {}
  };

  handleChange = data => {
    this.props.handleChange(
      data,
      this.props.isTitleForm || this.props.isRequired,
      this.props.index
    );
    this.setState({ data });
  };

  handleChecked = () => {
    this.props.handleChange(
      this.state.data,
      !this.props.isRequired,
      this.props.index
    );
  };

  render() {
    return (
      <Draggable
        onClick={this.props.handleClick}
        key={this.props.index}
        style={{ height: this.props.height }}
      >
        <div
          className={
            "widget-form " + (this.props.active ? "active" : " inactive")
          }
        >
          {!this.props.isTitleForm && (
            <div className="drag-handle-selector">
              <img
                className="drag-handle-img"
                src={dragHandle}
                alt="Drag handle"
              />
            </div>
          )}
          <div className="contents">
            <this.props.form
              name={this.props.name}
              data={this.props.data}
              onChange={this.handleChange}
            />
          </div>
          {!this.props.isTitleForm && this.props.active && (
            <div className="footer">
              <hr className="horizontal-seperator" />
              <div className="items">
                <Switch
                  className="switch"
                  onChange={this.handleChecked}
                  checked={this.props.isRequired}
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

export default SurveySection;
