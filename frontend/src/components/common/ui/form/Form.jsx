import Joi from "joi";
import React, { Component } from "react";
import {
  CONFIRM_PASSWORD,
  SIGNUP_PASSWORD,
  NEW_PASSWORD
} from "../../../../constants/form/names/input";
import Button from "./Button";
import Input from "./Input";

export default class Form extends Component {
  state = {
    submitPressed: false,
    data: {},
    errors: {}
  };

  validate = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    // Build a schema for a single property
    const schema = Joi.object({
      [name]: this.schema.extract(name)
    });

    const { error } = schema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e, onSubmit) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;

    onSubmit(this.state.data);
  };

  deleteProperty = (obj, property) => {
    delete obj[property];
  };

  toggleSubmitFlag = submitFlag => {
    this.setState({ submitPressed: !submitFlag });
  };

  validateConfirmPassword(
    password,
    confirmPassword,
    confirmPasswordName,
    errors
  ) {
    if (password !== confirmPassword) {
      const errorMessage = this.validateProperty({
        name: confirmPasswordName,
        value: confirmPassword
      });
      errors[confirmPasswordName] = errorMessage;
    } else {
      this.deleteProperty(errors, confirmPasswordName);
    }
  }

  handleChange = ({ currentTarget }) => {
    const errors = { ...this.state.errors };
    const { name, value } = currentTarget;
    const { signUpPassword, confirmPassword, newPassword } = this.state.data;

    if (
      name === CONFIRM_PASSWORD &&
      (value === signUpPassword || value === newPassword)
    ) {
      this.deleteProperty(errors, name);
    } else {
      const errorMessage = this.validateProperty(currentTarget);
      if (errorMessage) {
        errors[name] = errorMessage;
      } else {
        this.deleteProperty(errors, name);
      }

      if (
        (name === SIGNUP_PASSWORD || name === NEW_PASSWORD) &&
        confirmPassword?.length > 0
      ) {
        this.validateConfirmPassword(
          value,
          confirmPassword,
          CONFIRM_PASSWORD,
          errors
        );
      }
    }

    const data = { ...this.state.data, [name]: value };
    this.setState({ data, errors });
  };

  renderButton(label, className, type, buttonPressed = false) {
    return (
      <Button
        type={type}
        validate={this.validate()}
        buttonPressed={buttonPressed}
        className={className}
        label={label}
      />
    );
  }

  renderInput(
    name,
    label,
    placeholder,
    disabled = false,
    type = "text",
    required = false
  ) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        required={required}
        value={data[name] || ""}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}
