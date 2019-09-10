import React, { Component } from "react";
import SignUpForm from "../components/common/SignUpForm";
import { TOKEN_HEADER } from "../constants/headers";
import { FEEDBACK_ROUTE } from "../constants/routes";
import { setJwt, signUp } from "../services/http/authService";
import { newWindowLocation } from "../utils/navigate";

export default class SignUp extends Component {
  state = {
    isSubmitting: false,
    error: {}
  };

  /**
   * Called at the end of handleSubmit in Form class (/ui/form/Form.jsx)
   *
   * @param {Object} data Data from input fields
   */
  onSubmit = data => {
    this.setState({ isSubmitting: true, error: {} });
    signUp(data)
      .then(res => this.onSignUpSuccessful(res))
      .catch(err => this.onSignUpError(err));
  };

  onSignUpSuccessful = res => {
    setJwt(res.headers.get(TOKEN_HEADER));
    this.setState({ isSubmitting: false });
    newWindowLocation(FEEDBACK_ROUTE);
  };

  onSignUpError = error => {
    this.setState({ isSubmitting: false, error });
  };

  render() {
    const { isSubmitting, error } = this.state;
    return (
      <SignUpForm
        onSubmit={this.onSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    );
  }
}
