import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { authService } from "../../services/auth.service";
import FormSignIn from "../forms/FormSignIn/FormSignIn";
import { Preloader } from "../common/index";

class AuthSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isFetching: false
    };

    /*if (authService.currentUser) {
      this.props.history.push("/dashboard");
    }*/
  }

  updateState = state => {
    this.setState({ email: state.email, password: state.password });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ isFetching: true });
    authService.signIn(email, password).then(
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
    const { isFetching } = this.state;
    return (
      <>
        {isFetching ? <Preloader /> : ""}
        <FormSignIn
          state={this.state}
          updateState={this.updateState}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default withRouter(AuthSignIn);
