import React, { Component } from "react";
import Form from "../elements/Form";
import { authService } from "../../services/auth.service";
import { withRouter } from "react-router-dom";

class AuthSignIn extends Component {
  constructor(props) {
    super(props);

    this.inputSettings = [
      {
        className: "input input__email",
        type: "email",
        placeholder: "E-mail",
        name: "email"
      },
      {
        className: "input input__email",
        type: "password",
        placeholder: "Password",
        name: "password"
      }
    ];

    this.buttonSettings = [
      {
        label: "Sign In",
        className: "button",
        type: "submit"
      }
    ];

    if (authService.currentUserValue) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <Form
        inputSettings={this.inputSettings}
        buttonSettings={this.buttonSettings}
      />
    );
  }
}

export default withRouter(AuthSignIn);
