import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  const getInput = () => {
    return rest.type === "textarea" ? <textarea /> : <input />;
  };

  return (
    <div className="form-group">
      <label className="basic" htmlFor={name}>
        {label}
      </label>
      {rest.type === "textarea" ? (
        <textarea
          {...rest}
          name={name}
          id={name}
          className={error ? "form-control error" : "form-control"}
          placeholder={label}
        />
      ) : (
        <input
          {...rest}
          name={name}
          id={name}
          className={error ? "form-control error" : "form-control"}
          placeholder={label}
        />
      )}
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default Input;
