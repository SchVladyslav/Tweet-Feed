import React, { Component } from "react";
import PropTypes from "prop-types";

export class Input extends Component {
  constructor(props) {
    super(props);

    this.InputProps = {
      className: props.settings.className,
      name: props.settings.name,
      type: props.settings.type,
      placeholder: props.settings.placeholder,
      value: props.settings.value,
      label: props.settings.label,
      error: props.settings.error
    };
  }

  render() {
    return (
      <React.Fragment>
        <input
          className={this.InputProps.className}
          name={this.InputProps.name}
          type={this.InputProps.type}
          value={this.InputProps.value}
          placeholder={this.InputProps.placeholder}
          style={this.InputProps.error && { border: "1px solid red" }}
        />
        {this.InputProps.error && <p>{this.InputProps.error}</p>}
      </React.Fragment>
    );
  }
}

Input.defaultProps = {
  type: "text",
  className: ""
};

Input.propTypes = {
  name: PropTypes.string, //.isRequired
  type: PropTypes.string,
  type: PropTypes.oneOf(["text", "number", "password"]),
  placeholder: PropTypes.string, //.isRequired
  className: PropTypes.string,
  value: PropTypes.any
  //onChange: PropTypes.func.isRequired
};

{
  /* <label htmlFor={props.name} className="input-label">
        {InputProps.label}
      </label> */
}
