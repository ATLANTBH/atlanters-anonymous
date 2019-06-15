import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import Widget from "./widget";
import widgetImages from "../../assets/create-survey/widgets";
import Navigator from "./navigator";
import widgetForms from "./widget-forms";

class CreateSurvey extends Component {
  state = {
    widgets: [
      {
        name: "Short Answer",
        image: widgetImages.shortAnswer,
        form: widgetForms.ShortAnswer,
        height: "170px"
      },
      {
        name: "Paragraph",
        image: widgetImages.paragraph,
        form: widgetForms.ShortAnswer,
        height: "350px"
      },
      {
        name: "Single Choice",
        image: widgetImages.singleChoice,
        form: widgetForms.ShortAnswer,
        height: "160px"
      },
      {
        name: "Multiple Choice",
        image: widgetImages.multipleChoice,
        form: widgetForms.ShortAnswer,
        height: "160px"
      },
      {
        name: "Linear Scale",
        image: widgetImages.linearScale,
        form: widgetForms.ShortAnswer,
        height: "160px"
      },
      {
        name: "Star Rating",
        image: widgetImages.starRating,
        form: widgetForms.ShortAnswer,
        height: "160px"
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
        name={element.name}
        image={element.image}
        form={element.form}
        height={element.height}
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
          dragHandleSelector=".drag-handle-selector"
        >
          {forms.map(item => (
            <>
              <item.props.form {...item.props} />
            </>
          ))}
        </Container>
      </div>
    );
  }
}

export default CreateSurvey;
