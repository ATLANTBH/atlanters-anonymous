import React from "react";
import Form from "./ui/form/Form";
import Joi from "joi-browser";
import inputNames from "../../constants/form/names/input";
import labels from "../../constants/form/labels";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoadingSpinner from "./ui/LoadingSpinner";
const { buttonLabels, inputLabels } = labels;

export default class SignInForm extends Form {
  static propTypes = {
    /**
     * Error to display if submit was a failure
     */
    error: PropTypes.object,

    /**
     * Is sign in info submitting
     */
    isSubmitting: PropTypes.bool.isRequired
  };

  state = {
    submitPressed: false,
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  onSubmit = e => {
    this.handleSubmit(e, this.props.onSubmit);
  };

  render() {
    const { error, isSubmitting } = this.props;
    return (
      <div className="container-fluid">
        <div className="form-row row">
          <div className="col-lg-3">
            <form onSubmit={this.onSubmit} className="form sign-in">
              <h1 className="sign-in title text-center">Sign in</h1>
              {this.renderInput(
                inputNames.EMAIL,
                inputLabels.EMAIL,
                inputLabels.EMAIL,
                isSubmitting,
                "email"
              )}
              {this.renderInput(
                inputNames.SIGNIN_PASSWORD,
                inputLabels.PASSWORD,
                inputLabels.PASSWORD,
                isSubmitting,
                "password"
              )}

              {isSubmitting && (
                <LoadingSpinner
                  text="Signin you in..."
                  height={50}
                  width={50}
                />
              )}
              {!isSubmitting && (
                <section>
                  <div className="error-text big">{error.message}</div>
                  <div className="text-center">
                    {this.renderButton(
                      buttonLabels.SIGNIN,
                      "sign-in",
                      "submit",
                      this.state.submitPressed
                    )}
                    <Link className="redirect-sign-up" to="/sign-up">
                      Don't have an account?
                    </Link>
                  </div>
                </section>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
