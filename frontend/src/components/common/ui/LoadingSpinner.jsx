import React, { Component } from "react";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";

export default class LoadingSpinner extends Component {
  static propTypes = {
    /**
     * Text shown below the loader
     */
    text: PropTypes.string,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };

  render() {
    const { text, height, width } = this.props;
    return (
      <div className="moon-loader-wrapper">
        <Loader type="Oval" color="#00a3da" height={height} width={width} />
        <p style={{ marginTop: "10px" }}>{text}</p>
      </div>
    );
  }
}
