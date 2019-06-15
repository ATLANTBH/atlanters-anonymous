import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import Widget from "./widget";
import widgetImages from "../../assets/create-survey/widgets";
import Navigator from "./navigator";

class CreateSurvey extends Component {
  state = {
    widgets: [
      {
        name: "Short Answer",
        image: widgetImages.shortAnswer
      },
      {
        name: "Paragraph",
        image: widgetImages.paragraph
      },
      {
        name: "Single Choice",
        image: widgetImages.singleChoice
      },
      {
        name: "Multiple Choice",
        image: widgetImages.multipleChoice
      },
      {
        name: "Linear Scale",
        image: widgetImages.linearScale
      },
      {
        name: "Star Rating",
        image: widgetImages.starRating
      }
    ],
    widgetObjects: [],
    forms: []
  };

  applyOnDrop(arr, dropResult) {
    let { removedIndex, addedIndex, payload } = dropResult;
    console.log(arr, dropResult);
    const result = [...arr];
    if (removedIndex !== null) {
      payload = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, payload);
    }
    this.setState({ forms: result });
  }

  shouldAcceptDrop(sourceContainerOptions, payload) {
    return true;
  }

  shouldAnimateDrop(sourceContainerOptions, payload) {
    return false;
  }

  componentDidMount() {
    const widgetObjects = this.state.widgets.map((element, index) => (
      <Widget
        key={index}
        id={index}
        items={this.state.widgets}
        name={element.name}
        image={element.image}
      />
    ));
    this.setState({ widgetObjects });
  }

  renderWidgets() {
    return this.state.widgetObjects;
  }

  applyOnDrop(arr, dropResult) {
    let { removedIndex, addedIndex, payload } = dropResult;
    console.log(arr, dropResult);
    const result = [...arr];
    if (removedIndex !== null) {
      payload = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, payload);
    }
    this.setState({ forms: result });
  }

  shouldAcceptDrop(sourceContainerOptions, payload) {
    return true;
  }

  shouldAnimateDrop(sourceContainerOptions, payload) {
    return false;
  }

  onDragEnter() {
    console.log("ENTERED");
  }

  onDragStart({ isSource, payload, willAcceptDrop }) {
    console.log(isSource, payload, willAcceptDrop);
  }

  render() {
    const { widgetObjects, forms } = this.state;
    return (
      <div className="create-survey-container">
        <Container
          getChildPayload={i => widgetObjects[i]}
          orientation={"horizontal"}
          behaviour="copy"
        >
          {widgetObjects}
        </Container>

        <div className="navigator-container">
          <Navigator />
        </div>

        <Container
          onDrop={e => {
            this.applyOnDrop(forms, e);
          }}
          getChildPayload={i => forms[i]}
          shouldAcceptDrop={this.shouldAcceptDrop}
          lockAxis="y"
          shouldAnimateDrop={this.shouldAnimateDrop}
          onDragEnter={this.onDragEnter}
          onDragStart={this.onDragStart}
          behaviour="contain"
        >
          {forms.map(item => (
            <Draggable key={item.props.id}>
              <p>{item.props.name}</p>
            </Draggable>
          ))}
        </Container>
      </div>
    );
  }
}

export default CreateSurvey;
