import React, { Component } from "react";
import PropTypes from "prop-types";

export class Button extends Component {
  constructor(props, { buttonState }) {
    super(props);

    this.buttonProps = {
      className: props.settings.className,
      label: props.settings.label,
      type: props.settings.type,
      buttonState: buttonState
    };
  }

  render() {
    return (
      <button
        className={this.buttonProps.className}
        type={this.buttonProps.type}
        //disabled={!this.buttonState}
      >
        {this.buttonProps.label}
      </button>
    );
  }
}

Button.defaultProps = {
  type: "button",
  className: ""
};

Button.propTypes = {
  name: PropTypes.string, //.isRequired
  type: PropTypes.string, //.isRequired
  label: PropTypes.string, //.isRequired
  type: PropTypes.oneOf(["button", "submit"]),
  className: PropTypes.string
};
