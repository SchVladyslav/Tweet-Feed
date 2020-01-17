import React from "react";
import PropTypes from "prop-types";

export const Button = (props, { buttonState }) => {
  return (
    <button
      className={props.className}
      type={props.type}
      disabled={!buttonState}
    >
      {props.label}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  className: ""
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit"]),
  className: PropTypes.string
};
