import React, { Component } from "react";
import { Card } from "react-bootstrap";
import ph from "../../../assets/ph.png";

class PollCard extends Component {
  state = {};

  render() {
    return (
      <div className="animate">
        <Card className="poll-card align-items-center d-flex justify-content-center">
          <Card.Img src={ph} alt="Card image" />
          <Card.ImgOverlay className=" align-items-center d-flex justify-content-center">
            <Card.Text>{this.props.title}</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </div>
    );
  }
}

export default PollCard;
