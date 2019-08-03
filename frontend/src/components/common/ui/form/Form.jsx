import Joi from "joi-browser";
import React, { Component } from "react";
import {
  CONFIRM_PASSWORD,
  SIGNUP_PASSWORD
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
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) {
      return null;
    }

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors ? errors : null;
  };

  validateProperty = ({ name, value }) => {
    const obj = {
      [name]: value
    };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e, onSubmit) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    onSubmit(this.state.data);
  };

  deleteProperty = (obj, property) => {
    delete obj[property];
  };

  toggleSubmitFlag = submitFlag => {
    let submitPressed = !submitFlag;
    this.setState({ submitPressed });
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
    const { signUpPassword, confirmPassword } = this.state.data;

    if (name === CONFIRM_PASSWORD && value === signUpPassword) {
      this.deleteProperty(errors, name);
    } else {
      const errorMessage = this.validateProperty(currentTarget);
      if (errorMessage) {
        errors[name] = errorMessage;
      } else {
        this.deleteProperty(errors, name);
      }
      if (name === SIGNUP_PASSWORD && confirmPassword.length > 0) {
        this.validateConfirmPassword(
          value,
          confirmPassword,
          CONFIRM_PASSWORD,
          errors
        );
      }
    }

    const data = { ...this.state.data };
    data[name] = value;
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
    placholder,
    disabled = false,
    type = "text",
    required = false
  ) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        placeholder={placholder}
        disabled={disabled}
        type={type}
        required={required}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}
