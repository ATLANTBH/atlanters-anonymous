import React, { Component } from "react";
import PollCard from "./cards/poll-card";
import pollTemplateService from "../../services/pollTemplateService";
import InfiniteScroll from "react-infinite-scroller";

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

  renderPollTemplates(count) {
    const pollTemplates = this.state.pollTemplates;
    return pollTemplates.slice(0, count);
  }

  async loadItems(page) {
    let { pollTemplates, hasMore } = this.state;
    let currentCount = pollTemplates.length;
    pollTemplates = await this.fetchPollTemplates(pollTemplates.length + 5);
    if (pollTemplates.length == currentCount) hasMore = false;
    this.setState({ pollTemplates, hasMore });
  }

  toggleShowMore() {
    this.setState({
      renderAllPollTemplates: !this.state.renderAllPollTemplates
    });
  }

  displayItems(count) {
    const items = [];
    this.renderPollTemplates(count).map(element => {
      items.push(<PollCard key={element.id} title={element.title} />);
    });
    return items;
  }

  render() {
    let items = [];
    items.push(<PollCard key={0} title={"+"} />);
    this.state.pollTemplates.map(element =>
      items.push(<PollCard key={element.id} title={element.title} />)
    );

    return (
      <div className="dashboard-container">
        <div className="main-view">
          <h4 className="surveys-title">Surveys</h4>
          {this.state.renderAllPollTemplates ? (
            <InfiniteScroll
              className="all-surveys-container"
              pageStart={0}
              loadMore={this.loadItems.bind(this)}
              hasMore={this.state.hasMore}
              loader={
                <div className="loader text-center" key={-1}>
                  Loading..
                </div>
              }
              useWindow={false}
            >
              {items}
            </InfiniteScroll>
          ) : (
            <div className="surveys-container">
              <PollCard title={"+"} />
              {this.state.pollTemplates.map(element => (
                <PollCard key={element.id} title={element.title} />
              ))}
            </div>
          )}

          {this.state.renderShowMore && (
            <p className="show-all" onClick={this.toggleShowMore.bind(this)}>
              {this.state.renderAllPollTemplates ? "Show less" : "Show more"}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
