import React, { Component } from "react";
import Navigator from "./common/Navigator";
import WidgetContainer from "./common/WidgetContainer";
import SurveyContainer from "./common/SurveyContainer";

class CreateSurvey extends Component {
  state = {};

  updateResult = result => {
    this.setState(result);
  };

  render() {
    return (
      <div className="create-survey-container">
        <WidgetContainer />
        <Navigator survey={this.state} />
        <SurveyContainer updateResult={this.updateResult} />
      </div>
    );
  }
}

export default CreateSurvey;
