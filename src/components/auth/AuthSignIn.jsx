import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Form } from "../forms/Form";
import { authService } from "../../services/auth.service";

class AuthSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

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
    return (
      <Form
        state={this.state}
        updateState={this.updateState}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default withRouter(AuthSignIn);

// () => {
//   const { from } = this.props.location.state || {
//     from: { pathname: "/dashboard" }
//   };
//   this.props.history.push(from);
// },
// error => {
//   console.log(error);
// }
