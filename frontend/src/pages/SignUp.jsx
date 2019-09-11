import React, { Component } from "react";
import SignUpForm from "../components/common/SignUpForm";
import { signUp } from "../services/http/authService";

export default class SignUp extends Component {
  state = {
    isSubmitting: false,
    error: {},
    success: ""
  };

  /**
   * Called at the end of handleSubmit in Form class (/ui/form/Form.jsx)
   *
   * @param {Object} data Data from input fields
   */
  onSubmit = data => {
    this.setState({ isSubmitting: true, error: {}, success: "" });
    signUp(data)
      .then(res => this.onSignUpSuccessful(res))
      .catch(err => this.onSignUpError(err));
  };

  onSignUpSuccessful = res => {
    this.setState({
      isSubmitting: false,
      success: "User registered successfully"
    });
  };

  onSignUpError = error => {
    this.setState({ isSubmitting: false, error });
  };

  render() {
    const { isSubmitting, error, success } = this.state;
    return (
      <SignUpForm
        onSubmit={this.onSubmit}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
      />
    );
  }
}
