import React from "react";
import { FormSignUp } from "../forms/FormSignUp/FormSignUp";
import { Component } from "react";
import { authService } from "../../services/auth.service";

export class AuthSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  updateState = state => {
    this.setState({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state;
    authService
      .signUp(firstName, lastName, email, password, confirmPassword)
      .then(
        () => {
          const { from } = this.props.location.state || {
            from: { pathname: "/dashboard" }
          };
          this.props.history.push(from);
        },
        error => {
          console.error(error);
        }
      );
  };

  render() {
    return (
      <FormSignUp
        state={this.state}
        updateState={this.updateState}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
