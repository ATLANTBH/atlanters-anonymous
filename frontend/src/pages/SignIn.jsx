import React, { Component } from "react";
import SignInForm from "../components/common/SignInForm";
import { TOKEN_HEADER } from "../constants/headers";
import { FEEDBACK_ROUTE } from "../constants/routes";
import { getJwt, setJwt, signIn } from "../services/http/authService";
import { newWindowLocation } from "../utils/navigate";

export default class SignIn extends Component {
  state = {
    isSubmitting: false,
    error: {}
  };

  onSubmit = data => {
    this.setState({ isSubmitting: true, error: {} });
    signIn(data)
      .then(res => this.onSignInSuccessful(res))
      .catch(err => this.onSignInError(err));
  };

  onSignInSuccessful = res => {
    console.log(res);
    setJwt(res.headers.get(TOKEN_HEADER));
    this.setState({ isSubmitting: false });
    newWindowLocation(FEEDBACK_ROUTE);
  };

  onSignInError = error => {
    this.setState({ isSubmitting: false, error });
  };

  render() {
    if (getJwt()) {
      newWindowLocation(FEEDBACK_ROUTE);
    }

    const { isSubmitting, error } = this.state;
    return (
      <SignInForm
        onSubmit={this.onSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
    );
  }
}
