import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label className="basic" htmlFor={name}>
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className={error ? "form-control error" : "form-control"}
        placeholder={label}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Input;
