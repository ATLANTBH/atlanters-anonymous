import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

class CardContainer extends Component {
  // todo: flip show more btn based on number of inital items shown
  state = {
    renderShowMore: true,
    displayAllItems: false
  };

  toggleShowMore() {
    this.setState({
      displayAllItems: !this.state.displayAllItems
    });
  }

  render() {
    const { displayAllItems, renderShowMore } = this.state;
    const { loadItemsCallback, hasMore, loader, items, title } = this.props;

    return (
      <React.Fragment>
        <h4 className="surveys-title">{title}</h4>
        {displayAllItems ? (
          <InfiniteScroll
            className="all-surveys-container"
            pageStart={0}
            loadMore={loadItemsCallback}
            hasMore={hasMore}
            loader={loader}
            useWindow={false}
          >
            {items}
          </InfiniteScroll>
        ) : (
          <div className="surveys-container">{items}</div>
        )}

        {renderShowMore && (
          <p className="show-all" onClick={this.toggleShowMore.bind(this)}>
            {displayAllItems ? "Show less" : "Show more"}
          </p>
        )}
      </React.Fragment>
    );
  }
}

export default CardContainer;
