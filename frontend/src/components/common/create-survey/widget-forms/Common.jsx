import React, { Component } from "react";
import { Draggable } from "react-smooth-dnd";
import MovableIndicator from "../../../../assets/images/create-survey/widgets/movable-indicator.png";
import Duplicate from "../../../../assets/images/create-survey/duplicate.png";
import Trash from "../../../../assets/images/create-survey/trash.png";
import Switch from "react-switch";
import {
  SWITCH_OFF_COLOR,
  SWITCH_ON_COLOR,
  SWITCH_WIDTH,
  SWITCH_HEIGHT
} from "../../../../constants/survey";

class Common extends Component {
  state = {
    data: {},
    active: false,
    required: false
  };

  /**
   * On toggle 'required'
   */
  onSwitch = () => {
    let { data, required } = this.state;
    required = !required;
    this.props.getData({
      ...data,
      required
    });
    this.setState({ required });
  };

  /**
   * On data change in specific form
   */
  getData = data => {
    const { required } = this.state;
    this.props.getData({
      ...data,
      required
    });
    this.setState({ data });
  };

  render() {
    const { data } = this.props;
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
            <img
              className="img"
              alt="Move"
              draggable={false}
              src={MovableIndicator}
            />
          </div>
          <div className="contents">
            <this.props.form
              name={this.props.name}
              getData={this.getData}
              data={data}
              id={this.props.uuid}
            />
          </div>
          {this.props.active && (
            <div className="footer">
              <hr className="horizontal-seperator" />
              <div className="items">
                <Switch
                  className="switch"
                  onChange={this.onSwitch}
                  checked={data ? data.required : false}
                  width={SWITCH_WIDTH}
                  height={SWITCH_HEIGHT}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  offColor={SWITCH_OFF_COLOR}
                  onColor={SWITCH_ON_COLOR}
                />
                <p className="required-text">Required</p>
                <img
                  className="duplicate-img"
                  onClick={this.props.onDuplicate}
                  src={Duplicate}
                  alt="duplicate"
                />
                <img
                  className="trash-img"
                  onClick={this.props.onDelete}
                  src={Trash}
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
