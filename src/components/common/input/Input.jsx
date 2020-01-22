import React from "react";
import "./Input.scss";
import PropTypes from "prop-types";

function getClassName(classesArray, property) {
  if (classesArray[property]) {
    return classesArray[property];
  } else {
    return false;
  }
}

export function Input({
  key,
  className,
  placeholder,
  type,
  name,
  value,
  errorMessage,
  onChange,
  iconName
}) {
  const iconNames = {
    user: "icon-user",
    email: "icon-user",
    password: "icon-lock"
  };
  const iconClass = getClassName(iconNames, iconName);
  return (
    <div className="input" key={key}>
      <div className="input__control">
        <input
          className={`${className ? className : ""} input__field${
            errorMessage ? " input__field_invalid" : ""
          }`}
          placeholder={placeholder}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
        />
      </div>
      {iconClass ? <i className={`icon ${iconClass} input__icon`} /> : null}
      <div className="input__error">
        {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      </div>
    </div>
  );
}
Input.propTypes = {
  key: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  iconName: PropTypes.string
};
