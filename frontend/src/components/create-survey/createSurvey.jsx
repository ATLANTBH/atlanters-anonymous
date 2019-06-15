import React, { Component } from "react";
import { Container, Draggable } from "react-smooth-dnd";
import Widget from "./widget";
import widgetImages from "../../assets/create-survey/widgets";
import Navigator from "./navigator";
import widgetForms from "./widget-forms";
import Common from "./widget-forms/common";

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
    formData: {
      forms: [],
      activeItemIndex: 0
    }
  };

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
    const result = [...arr];
    const formData = { ...this.state.formData };
    if (removedIndex !== null) {
      payload = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, payload);
    }
    formData.activeItemIndex = formData.forms.length === 0 ? 0 : addedIndex;
    formData.forms = result;
    this.setState({ formData });
  }

  shouldAcceptDrop(sourceContainerOptions, payload) {
    return true;
  }

  shouldAnimateDrop(sourceContainerOptions, payload) {
    return false;
  }

  onClick = index => {
    const { formData } = this.state;
    formData.activeItemIndex = index;
    this.setState({ formsData: formData });
  };

  onRemove = index => {
    this.setState(state => {
      const formData = state.formData;
      formData.forms.splice(index, 1);
      if (--formData.activeItemIndex < 0) ++formData.activeItemIndex;
      return { formData };
    });
  };

  render() {
    const { widgetObjects, formData, widgets } = this.state;
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
          <Navigator survey={formData.forms} />
        </div>

        <Container
          onDrop={e => {
            this.applyOnDrop(formData.forms, e);
          }}
          getChildPayload={i => formData.forms[i]}
          shouldAcceptDrop={this.shouldAcceptDrop}
          lockAxis="y"
          shouldAnimateDrop={this.shouldAnimateDrop}
          behaviour="contain"
          dragHandleSelector=".drag-handle-selector"
        >
          {formData.forms.map((item, index) => (
            <Common
              key={index}
              handleDelete={() => {
                this.onRemove(index);
              }}
              handleClick={() => {
                this.onClick(index);
              }}
              {...item.props}
              active={formData.activeItemIndex === index}
            />
          ))}
        </Container>
      </div>
    );
  }
}

export default CreateSurvey;
