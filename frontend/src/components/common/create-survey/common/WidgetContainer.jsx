import React, { Component } from "react";
import { Container } from "react-smooth-dnd";
import widgets from "../../../../utils/widgets";
import Widget from "../Widget";

export default class WidgetContainer extends Component {
  state = {
    widgetObjects: []
  };

  /**
   * Set default title &
   * Map widget objects to Widget Components
   */
  componentDidMount() {
    const widgetObjects = widgets.map((element, index) => (
      <Widget key={index} id={index} {...element} />
    ));
    this.setState({ widgetObjects });
  }

  render() {
    const { widgetObjects } = this.state;
    return (
      <Container
        getChildPayload={i => widgetObjects[i]}
        orientation="horizontal"
        behaviour="copy"
      >
        {widgetObjects}
      </Container>
    );
  }
}
