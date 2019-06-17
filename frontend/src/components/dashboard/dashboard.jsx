import React, { Component } from "react";
import SurveysContainer from "./containers/surveys-container";
import { getAllFeedback } from "../../services/feedbackService";

class Dashboard extends Component {
  state = {
    allFeedback: []
  };

  async componentDidMount() {
    const allFeedback = await getAllFeedback();
    this.setState({ allFeedback: allFeedback.data.reverse() });
  }

  formatTime(time) {
    const date = new Date(time);
    const dateString = date.toDateString();
    const timeString = date.toLocaleTimeString();
    return (
      <div>
        {dateString} - {timeString}
      </div>
    );
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="main-view">
          {this.state.allFeedback.map(element => (
            <div
              className="form text-center"
              key={element.id}
              style={{ marginTop: "30px" }}
            >
              <div>{this.formatTime(element.createdAt)}</div>
              <hr />
              {element.data}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Dashboard;
