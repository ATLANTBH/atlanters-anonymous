import React from "react";
import Form from "../common/form";
import { Redirect } from "react-router-dom";
import auth from "../../services/authService";

class PwEmailSent extends Form {
  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    const state = this.props.location.state;
    return (
      <div className="container-fluid">
        <div className="form-row row">
          <div className="col-lg-3">
            <div className="row no-account-row">
              <form className="form pw-email-sent">
                <h1 className="pw-email-sent text-center">Check Your Email</h1>
                <p className="par">
                  If <b>{state.params.email}</b> is your email, you should
                  receive an email containing instructions on how to create a
                  new password.
                </p>
                <p className="p2 title">Didn't receive the email?</p>
                <p className="par">
                  Check spam or bulk folders for a message coming from{" "}
                  <b>account-noreply@atlantbh.com</b>
                </p>
                <div className="col form-group text-center return-sign-in-text">
                  <a
                    onClick={() => {
                      this.handleRedirect("signin");
                    }}
                  >
                    Return to sign in
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PwEmailSent;
