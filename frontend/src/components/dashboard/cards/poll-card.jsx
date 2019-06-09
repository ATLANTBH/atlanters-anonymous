import React from "react";
import { Card } from "react-bootstrap";
import ph from "../../../assets/ph.png";

const PollCard = ({ title }) => {
  return (
    <Card className="poll-card align-items-center d-flex justify-content-center">
      <Card.Img src={ph} alt="Card image" />
      <Card.ImgOverlay className=" align-items-center d-flex justify-content-center">
        <Card.Text>{title}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default PollCard;
