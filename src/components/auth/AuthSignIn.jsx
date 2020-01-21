import React, { Component } from "react";
import Form from "../elements/Form";
import { authService } from "../../services/auth.service";
import { withRouter } from "react-router-dom";

class AuthSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

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

  updateState = state => {
    this.setState({ email: state.email, password: state.password });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    authService.login(email, password).then(
      () => {
        const { from } = this.props.location.state || {
          from: { pathname: "/dashboard" }
        };
        this.props.history.push(from);
      },
      error => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <Form
        state={this.state}
        updateState={this.updateState}
        handleSubmit={this.handleSubmit}
        inputSettings={this.inputSettings}
        buttonSettings={this.buttonSettings}
      />
    );
  }
}

export default withRouter(AuthSignIn);
