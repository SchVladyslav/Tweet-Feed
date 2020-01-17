import React from "react";
import PropTypes from "prop-types";

export const Input = props => {
  const InputProps = {
    className: props.className,
    name: props.name,
    type: props.type,
    placeholder: props.placeholder,
    value: props.value,
    handleChange: props.handleChange,
    label: props.label,
    error: props.error
  };

  return (
    <React.Fragment>
      {/* <label htmlFor={props.name} className="input-label">
        {InputProps.label}
      </label> */}
      <input
        className={InputProps.className}
        name={InputProps.name}
        type={InputProps.type}
        value={InputProps.value}
        handleChange={InputProps.handleChange}
        placeholder={InputProps.placeholder}
        style={InputProps.error && { border: "1px solid red" }}
      />
      {InputProps.error && <p>{InputProps.error}</p>}
    </React.Fragment>
  );
};

Input.defaultProps = {
  type: "text",
  className: ""
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password"]),
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
};
