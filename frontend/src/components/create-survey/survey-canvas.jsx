import React, { Component } from "react";
import { Draggable, Container } from "react-smooth-dnd";

class SurveyCanvas extends Component {
  state = {};

  render() {
    return (
      <div className="survey-canvas">
        <Container
          onDrop={e => {
            this.props.applyOnDrop(this.props.items2, e);
          }}
          getChildPayload={i => this.props.items2[i]}
          shouldAcceptDrop={this.props.shouldAcceptDrop}
          style={{
            height: "auto",
            backgroundColor: "white",
            overflowY: "scroll",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr"
          }}
          lockAxis="y"
          shouldAnimateDrop={this.props.shouldAnimateDrop}
        >
          {this.props.items2.map(item => (
            <Draggable
              key={item.id}
              style={{
                height: "100px",
                gridColumnStart: "2",
                gridColumnEnd: "6"
              }}
            >
              {item.text}
            </Draggable>
          ))}
        </Container>
      </div>
    );
  }
}

export default SurveyCanvas;
