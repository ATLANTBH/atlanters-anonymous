import React, { Component, Fragment } from "react";
import { Container } from "react-smooth-dnd";
import uuid from "uuid";
import {
  DROP_CONTAINER_BORDER,
  TITLE_INDEX,
  TITLE_INIT_VALUE
} from "../../../../constants/survey";
import TitleForm from "../TitleForm";
import Common from "../widget-forms/Common";

export default class SurveyContainer extends Component {
  state = {
    forms: [],
    titleData: {
      title: TITLE_INIT_VALUE
    },
    activeItemIndex: TITLE_INDEX
  };

  componentDidMount() {
    const { titleData } = this.state;
    this.props.updateResult({ titleData });
  }

  /**
   * On form duplicate
   * @param {Object} item
   * @param {Number} index
   */
  onDuplicate(item, index) {
    const { forms } = this.state;
    const { data, payload } = item;
    const newItem = {
      id: uuid.v4(),
      payload,
      data
    };
    forms.splice(index + 1, 0, newItem);
    this.setState({ forms });
  }

  /**
   * On delete form
   * @param {Number} index
   */
  onDelete(index) {
    let { forms, activeItemIndex } = this.state;
    forms.splice(index, 1);
    if (activeItemIndex >= forms.length) activeItemIndex--;
    this.setState({ forms, activeItemIndex });
  }

  /**
   * Make active on click
   * @param {Index} index
   */
  onClick = index => {
    let { forms, activeItemIndex } = this.state;
    activeItemIndex = index;
    this.setState({ forms, activeItemIndex });
  };

  onTitleChange = data => {
    let { titleData } = this.state;
    titleData = data;
    this.props.updateResult({ titleData });
    this.setState(titleData);
  };

  /**
   * Get necessary info (question, description, etc.) from specific form
   * @param {Object} data
   */
  getData = data => {
    const { forms } = this.state;
    const index = forms.findIndex(form => {
      return form.id === data.id;
    });
    forms[index].data = data;
    this.props.updateResult({ forms });
    this.setState({ forms });
  };

  /**
   * On drop
   * @param {Array} forms
   * @param {Object} dropResult Contains info on drop
   */
  applyOnDrop = (forms, dropResult) => {
    let { removedIndex, addedIndex, payload } = dropResult;
    const result = [...forms];
    let newForm = {
      id: uuid.v4(),
      payload
    };
    if (removedIndex !== null) {
      newForm = result.splice(removedIndex, 1)[0];
    }
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, newForm);
    }
    const activeItemIndex = addedIndex;
    this.props.updateResult({ forms: result });
    this.setState({ forms: result, activeItemIndex });
  };

  renderForms = () => {
    const { forms, activeItemIndex } = this.state;
    return forms.map((item, index) => (
      <Common
        key={item.id}
        uuid={item.id}
        onClick={() => {
          this.onClick(index);
        }}
        {...item.payload.props}
        active={activeItemIndex === index}
        getData={this.getData}
        data={item.data}
        onDuplicate={() => this.onDuplicate(item, index)}
        onDelete={() => this.onDelete(index)}
      />
    ));
  };

  render() {
    const { forms, activeItemIndex } = this.state;
    return (
      <Fragment>
        <div className="title-container">
          <TitleForm
            active={activeItemIndex === TITLE_INDEX}
            onClick={() => this.onClick(TITLE_INDEX)}
            onChange={this.onTitleChange}
          />
        </div>

        <Container
          onDrop={e => this.applyOnDrop(forms, e)}
          getChildPayload={i => forms[i]}
          shouldAcceptDrop={() => {
            return true;
          }}
          lockAxis="y"
          shouldAnimateDrop={() => {
            return false;
          }}
          behaviour="contain"
          dragHandleSelector=".drag-handle-selector"
          style={{
            border: forms.length > 0 ? "" : DROP_CONTAINER_BORDER
          }}
        >
          {this.renderForms()}
        </Container>
      </Fragment>
    );
  }
}
