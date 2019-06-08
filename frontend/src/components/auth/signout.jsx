import { Component } from "react";
import auth from "../../services/authService";

export default class SignOut extends Component {
  async componentDidMount() {
    try {
      await auth.logout();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Sign out not successful: " + err.response.data.message);
      }
      window.location = "/";
      return;
    }
    window.location = "/signin";
  }

  render() {
    return null;
  }
}
