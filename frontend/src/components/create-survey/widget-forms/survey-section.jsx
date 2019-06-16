import React, { Component, useState } from "react";
import Switch from "react-switch";
import { Draggable } from "react-smooth-dnd";
import duplicate from "../../../assets/create-survey/duplicate.png";
import trash from "../../../assets/create-survey/trash.png";
import dragHandle from "../../../assets/create-survey/drag-handle.png";

const SurveySection = props => {
  const [checked, setChecked] = useState(false);

  return (
    <Draggable
      onClick={props.handleClick}
      key={props.index}
      style={{ height: props.height }}
    >
      <div className={"widget-form " + (props.active ? "active" : " inactive")}>
        {!props.isTitleForm && (
          <div className="drag-handle-selector">
            <img
              className="drag-handle-img"
              src={dragHandle}
              alt="Drag handle"
            />
          </div>
        )}
        <div className="contents">
          <props.form name={props.name} />
        </div>
        {!props.isTitleForm && props.active && (
          <div className="footer">
            <hr className="horizontal-seperator" />
            <div className="items">
              <Switch
                className="switch"
                onChange={() => setChecked(!checked)}
                checked={checked}
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
                onClick={props.handleDuplicate}
                src={duplicate}
                alt="duplicate"
              />
              <img
                className="trash-img"
                onClick={props.handleDelete}
                src={trash}
                alt="trash"
              />
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default SurveySection;
