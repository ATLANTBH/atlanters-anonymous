import React from "react";
import classNames from "classnames";

const Input = ({ name, placeholder, error, type, ...rest }) => {
  return (
    <input
      {...rest}
      type={type}
      name={name}
      id={name}
      className={classNames("create-survey-input", name)}
      placeholder={placeholder}
    />
  );
};
export default Input;
