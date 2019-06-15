import React, { Component } from "react";
import PollCard from "../cards/poll-card";
import pollTemplateService from "../../../services/pollTemplateService";
import CardContainer from "./card-container";
import { Link } from "react-router-dom";

class SurveysContainer extends Component {
  state = {
    pollTemplates: null,
    renderShowMore: true,
    renderAllPollTemplates: false,
    hasMore: true
  };

  async fetchPollTemplates(count) {
    try {
      const result = await pollTemplateService.getPollTemplates(
        count,
        this.props.isDraft
      );
      return result.data.length === 0 ? null : result.data;
    } catch (err) {
      console.log(err.response);
    }
  }

  async componentDidMount() {
    const pollTemplates = await this.fetchPollTemplates(10);
    this.setState({ pollTemplates });
  }

  async loadPollTemplates(page) {
    let { pollTemplates, hasMore } = this.state;
    let currentCount = pollTemplates.length;
    pollTemplates = await this.fetchPollTemplates(pollTemplates.length + 5);
    if (pollTemplates.length >= currentCount) hasMore = false;
    this.setState({ pollTemplates, hasMore });
  }

  getCreateSurveyCard() {
    return (
      <Link key={0} to="/createSurvey">
        <PollCard title={"+"} />
      </Link>
    );
  }

  getPollTemplateCards() {
    let pollTemplateCards = [];
    if (!this.props.isDraft) pollTemplateCards.push(this.getCreateSurveyCard());
    this.state.pollTemplates.map(element =>
      pollTemplateCards.push(
        <PollCard key={element.id} title={element.title} />
      )
    );
    return pollTemplateCards;
  }

  render() {
    const { isDraft } = this.props;
    const { pollTemplates, hasMore } = this.state;
    return pollTemplates ? (
      <CardContainer
        title={isDraft ? "Drafts" : "Surveys"}
        loadItemsCallback={this.loadPollTemplates.bind(this)}
        hasMore={hasMore}
        loader={
          <div className="loader text-center" key={-1}>
            Loading..
          </div>
        }
        items={this.getPollTemplateCards()}
      />
    ) : isDraft ? (
      <p style={{ marginTop: "80px", textAlign: "center" }}>
        - No draft surveys found -
      </p>
    ) : (
      this.getCreateSurveyCard()
    );
  }
}

export default SurveysContainer;
