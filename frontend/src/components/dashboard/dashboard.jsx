import React, { Component } from "react";
import SurveysContainer from "./containers/surveys-container";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <div className="main-view">
          <SurveysContainer isDraft={false} />
          <SurveysContainer isDraft={true} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
