import React, { Component } from "react";
import PollCard from "./cards/poll-card";
import pollTemplateService from "../../services/pollTemplateService";
import CardContainer from "./cards/card-container";

class Dashboard extends Component {
  state = {
    pollTemplates: [],
    renderShowMore: true,
    renderAllPollTemplates: false,
    hasMore: true
  };

  async fetchPollTemplates(count) {
    const result = await pollTemplateService.getPollTemplates(count);
    return result.data;
  }

  async componentDidMount() {
    const pollTemplates = await this.fetchPollTemplates(10);
    this.setState({ pollTemplates });
  }

  async loadPollTemplates(page) {
    let { pollTemplates, hasMore } = this.state;
    let currentCount = pollTemplates.length;
    pollTemplates = await this.fetchPollTemplates(pollTemplates.length + 5);
    if (pollTemplates.length == currentCount) hasMore = false;
    this.setState({ pollTemplates, hasMore });
  }

  getPollTemplateCards() {
    let pollTemplateCards = [];
    pollTemplateCards.push(<PollCard key={0} title={"+"} />);
    this.state.pollTemplates.map(element =>
      pollTemplateCards.push(
        <PollCard key={element.id} title={element.title} />
      )
    );
    return pollTemplateCards;
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="main-view">
          <CardContainer
            title={"Surveys"}
            loadItemsCallback={this.loadPollTemplates.bind(this)}
            hasMore={this.state.hasMore}
            loader={
              <div className="loader text-center" key={-1}>
                Loading..
              </div>
            }
            items={this.getPollTemplateCards()}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
