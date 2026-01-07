import React, { Component } from "react";
import ModifyAccountForm from "../components/common/ModifyAccountForm";
import { updateUser, getCurrentUser } from "../services/http/authService";

export default class Account extends Component {
  state = {
    isSubmitting: false,
    error: {},
    success: ""
  };

  onSubmit = data => {
    this.setState({ isSubmitting: true, error: {}, success: "" });
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    const payload = {
      userId: currentUser.id,
      password: data.newPassword
    };
    updateUser(payload)
      .then(res => this.onModifyAccountSuccessful(res))
      .catch(error => this.onModifyAccountError(error));
  };

  onModifyAccountSuccessful = res => {
    this.setState({
      isSubmitting: false,
      success: "Password changed successfully"
    });
  };

  onModifyAccountError = error => {
    this.setState({ isSubmitting: false, error });
  };

  render() {
    const { isSubmitting, error, success } = this.state;
    return (
      <ModifyAccountForm
        onSubmit={this.onSubmit}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
      />
    );
  }
}
