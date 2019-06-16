import React, { Component } from "react";
import { Container } from "react-smooth-dnd";
import Widget from "./widget";
import widgetImages from "../../assets/create-survey/widgets";
import Navigator from "./navigator";
import widgetForms from "./widget-forms";
import SurveySection from "./widget-forms/survey-section";

class CreateSurvey extends Component {
  state = {
    widgets: [
      {
        name: "Title",
        image: widgetImages.shortAnswer,
        form: widgetForms.Title,
        height: "113px"
      },
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
      activeItemIndex: 0,
      formResult: []
    }
  };

  widgetOnClick = Form => {
    let { forms, activeItemIndex, formResult } = this.state.formData;

    forms.push(Form);
    formResult.push(this.getDefaultFormResult(Form.props.name));

    activeItemIndex = forms.length - 1;
    this.setState({ formData: { forms, activeItemIndex, formResult } });
  };

  componentDidMount() {
    const widgetObjects = this.state.widgets.map((element, index) => (
      <Widget
        key={index}
        id={index}
        {...element}
        onClick={() => {
          this.widgetOnClick(<Widget key={index} id={index} {...element} />);
        }}
        isTitleForm={index === 0 ? false : true}
        data={{}}
      />
    ));
    const formData = this.state.formData;

    // add title form
    formData.forms.push(widgetObjects[0]);
    formData.formResult = this.getUpdatedFormResult(formData.forms);

    this.setState({ widgetObjects, formData });
  }

  renderWidgets() {
    return this.state.widgetObjects;
  }

  applyOnDrop(arr, dropResult) {
    let { removedIndex, addedIndex, payload } = dropResult;
    const result = [...arr];
    let { activeItemIndex, forms, formResult } = this.state.formData;
    if (removedIndex !== null) {
      payload = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      // prevents adding a form above the title form
      if (addedIndex === 0) addedIndex = forms.length;

      result.splice(addedIndex, 0, payload);
      formResult.splice(
        addedIndex,
        0,
        this.getDefaultFormResult(payload.props.name)
      );
    }
    activeItemIndex = forms.length === 0 ? 0 : addedIndex;

    forms = result;
    formResult = this.getUpdatedFormResult(forms);

    this.setState({ formData: { forms, activeItemIndex, formResult } });
  }

  getUpdatedFormResult(forms) {
    const { formResult } = this.state.formData;
    for (let i = 0; i < forms.length; i++) {
      formResult[i] = {
        type: forms[i].props.name,
        data: formResult[i] ? formResult[i].data : {},
        required: formResult[i] ? formResult[i].required : false
      };
    }
    return formResult;
  }

  getDefaultFormResult(type) {
    return {
      type,
      data: {},
      required: false
    };
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
    this.setState({ formData });
  };

  onDelete = index => {
    this.setState(state => {
      const formData = state.formData;

      formData.forms.splice(index, 1);
      formData.formResult.splice(index, 1);

      if (formData.activeItemIndex >= formData.forms.length)
        formData.activeItemIndex--;
      return { formData };
    });
  };

  onDuplicate = (item, index) => {
    const { formData } = this.state;

    formData.forms.splice(index + 1, 0, item);
    formData.formResult.splice(
      index + 1,
      0,
      this.getDefaultFormResult(item.props.name)
    );

    this.setState({ formData });
  };

  onChange = (data, required, index) => {
    const formData = { ...this.state.formData };

    formData.formResult[index].data = data;
    formData.formResult[index].required = required;

    this.setState({ formData });
  };

  renderForms = formData => {
    return formData.forms.map((item, index) => {
      // title (index=0) must be first form
      return (
        <SurveySection
          key={index}
          handleDelete={
            index === 0
              ? null
              : () => {
                  this.onDelete(index);
                }
          }
          handleClick={() => {
            this.onClick(index);
          }}
          handleDuplicate={
            index === 0
              ? null
              : () => {
                  this.onDuplicate(item, index);
                }
          }
          handleChange={this.onChange}
          {...item.props}
          index={index}
          active={formData.activeItemIndex === index}
          isTitleForm={index === 0}
          isRequired={formData.formResult[index].required ? true : false}
          data={formData.formResult[index].data}
        />
      );
    });
  };

  render() {
    const { widgetObjects, formData } = this.state;
    return (
      <div className="create-survey-container">
        <Container
          getChildPayload={i => widgetObjects[i + 1]}
          orientation={"horizontal"}
          behaviour="copy"
        >
          {widgetObjects}
        </Container>

        <div className="navigator-container">
          <Navigator survey={formData.formResult} />
        </div>

        <Container
          onDrop={e => {
            this.applyOnDrop(formData.forms, e);
          }}
          getChildPayload={i => formData.forms[i]}
          shouldAcceptDrop={this.shouldAcceptDrop}
          lockAxis="y"
          shouldAnimateDrop={this.shouldAnimateDrop}
          onDragStart={this.onDragStart}
          behaviour="contain"
          dragHandleSelector=".drag-handle-selector"
        >
          {this.renderForms(formData)}
        </Container>
      </div>
    );
  }
}

export default CreateSurvey;
