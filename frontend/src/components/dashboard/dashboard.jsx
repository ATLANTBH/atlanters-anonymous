import React, { Component } from "react";
import PollCard from "./cards/poll-card";
import pollTemplateService from "../../services/pollTemplateService";
import InfiniteScroll from "react-infinite-scroll-component";

class Dashboard extends Component {
  state = {
    pollTemplates: [],
    showMore: false,
    hasMore: true,
    loadAmount: 5
  };

  async toggleShowMore() {
    let { pollTemplates, showMore, loadAmount } = { ...this.state };
    if (showMore) {
      pollTemplates.splice(5, pollTemplates.length - 1);
      this.state.hasMore = true;
    } else {
      this.setState({
        pollTemplates: await this.fetchPollTemplates(loadAmount * 3)
      });
    }
    this.setState({ showMore: !showMore });
  }

  async fetchPollTemplates(count) {
    let pollTemplates = this.state.pollTemplates;
    const result = await pollTemplateService.getPollTemplates(count);
    pollTemplates = result.data;
    return pollTemplates;
  }

  async componentDidMount() {
    const pollTemplates = await this.fetchPollTemplates(this.state.loadAmount);
    this.setState({ pollTemplates });
  }

  async fetchMoreData() {
    let { pollTemplates, hasMore, loadAmount } = this.state;
    let currentCount = pollTemplates.length;
    pollTemplates = await this.fetchPollTemplates(currentCount + loadAmount);
    if (pollTemplates.length == currentCount) hasMore = false;
    this.setState({ pollTemplates, hasMore });
  }

  render() {
    return (
      <div className="container-fluid dashboard-container">
        <div className="row">
          <div className="col" />
          <div className="col-7">
            <h2 className="surveys-title">Surveys</h2>
            {this.state.showMore ? (
              <InfiniteScroll
                dataLength={this.state.pollTemplates.length}
                next={this.fetchMoreData.bind(this)}
                hasMore={this.state.hasMore}
                loader={<p>Loading...</p>}
                height={this.state.loadAmount * 100}
              >
                <div className="wrapper">
                  {this.state.pollTemplates.map(element => (
                    <PollCard key={element.id} title={element.title} />
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="wrapper">
                {this.state.pollTemplates.map(element => (
                  <PollCard key={element.id} title={element.title} />
                ))}
              </div>
            )}
            <p
              className="text-right show-all"
              onClick={this.toggleShowMore.bind(this)}
            >
              {!this.state.showMore ? "Show more" : "Show less"}
            </p>
          </div>
          <div className="col" />
        </div>
      </div>
    );
  }
}

export default Dashboard;
