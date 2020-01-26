import React, { Component } from "react";
import { withRouter } from "react-router";
import { FormSignUp } from "../forms/FormSignUp/FormSignUp";
import { authService } from "../../services/auth.service";
import { Preloader } from "../common/preloader/Preloader";

class AuthSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isFetching: false
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
    this.setState({ isFetching: true });
    authService
      .signUp(firstName, lastName, email, password, confirmPassword)
      .then(
        () => {
          const { from } = this.props.location.state || {
            from: { pathname: "/signin" }
          };
          this.props.history.push(from);
        },
        error => {
          console.error(error);
        }
      );
  };

  render() {
    const { isFetching } = this.state;
    return (
      <>
        {isFetching ? <Preloader /> : ""}
        <FormSignUp
          state={this.state}
          updateState={this.updateState}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default withRouter(AuthSignUp);
