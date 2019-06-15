import React, { Component } from "react";
import { Card } from "react-bootstrap";
import ph from "../../../assets/ph.png";

const PollCard = props => {
  return (
    <Card className="poll-card align-items-center d-flex justify-content-center">
      <Card.Img src={ph} alt="Card image" />
      <Card.ImgOverlay className=" align-items-center d-flex justify-content-center">
        <Card.Text>{props.title}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default PollCard;
