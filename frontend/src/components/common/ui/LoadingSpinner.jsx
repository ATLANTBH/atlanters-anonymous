// TODO(Vedad): remove one div
import React, { Component } from "react";
import Loader from "react-loader-spinner";

export default class LoadingSpinner extends Component {
  render() {
    return (
      <div className="moon-loader-wrapper">
        <Loader type="Oval" color="#00a3da" height="60" width="60" />
      </div>
    );
  }
}
