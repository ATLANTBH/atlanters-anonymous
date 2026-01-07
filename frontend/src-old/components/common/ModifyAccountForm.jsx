import Joi from "joi-browser";
import PropTypes from "prop-types";
import React from "react";
import { CHANGE } from "../../constants/form/labels/button";
import {
  CONFIRM_PASSWORD_LABEL,
  NEW_PASSWORD_LABEL,
} from "../../constants/form/labels/input";
import {
  CONFIRM_PASSWORD,
  NEW_PASSWORD,
} from "../../constants/form/names/input";
import Form from "./ui/form/Form";
import LoadingSpinner from "./ui/LoadingSpinner";

export default class ModifyAccountForm extends Form {
  static propTypes = {
    /**
     * Error to display if submit was a failure
     */
    error: PropTypes.object,

    /**
     * Success to display if submit was a success
     */
    success: PropTypes.string,

    /**
     * Is sign up info submitting
     */
    isSubmitting: PropTypes.bool.isRequired,
  };

  state = {
    submitPressed: false,
    data: {
      newPassword: "",
      confirmPassword: "",
    },
    errors: {},
  };

  schema = {
    newPassword: Joi.string().required().label(NEW_PASSWORD_LABEL).min(8),
    confirmPassword: Joi.valid(Joi.ref(NEW_PASSWORD))
      .options({
        language: { any: { allowOnly: "must match password" } },
      })
      .label(CONFIRM_PASSWORD_LABEL),
  };

  onSubmit = (e) => {
    this.handleSubmit(e, this.props.onSubmit);
  };

  render() {
    const { error, isSubmitting, success } = this.props;
    return (
      <div className="container-fluid">
        <div className="form-row row">
          <div className="col-lg-3">
            <form onSubmit={this.onSubmit} className="form sign-up">
              <h1
                className="sign-up title text-center"
                style={{ fontSize: "30px" }}
              >
                Change Password
              </h1>
              {this.renderInput(
                NEW_PASSWORD,
                NEW_PASSWORD_LABEL,
                NEW_PASSWORD_LABEL,
                isSubmitting,
                "password",
                true
              )}
              {this.renderInput(
                CONFIRM_PASSWORD,
                CONFIRM_PASSWORD_LABEL,
                CONFIRM_PASSWORD_LABEL,
                isSubmitting,
                "password",
                true
              )}
              {isSubmitting && (
                <LoadingSpinner
                  height={50}
                  width={50}
                  text="Changing your password..."
                />
              )}
              {!isSubmitting && (
                <section>
                  <div className="error-text big">{error.message}</div>
                  <div
                    className="success-text big"
                    style={{ color: "#28a745", marginBottom: "10px" }}
                  >
                    {success}
                  </div>
                  <div className="text-center">
                    {this.renderButton(CHANGE, "modify-account", "submit")}
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
