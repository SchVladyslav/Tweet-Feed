<<<<<<< HEAD
<<<<<<< HEAD
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

<<<<<<< HEAD
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
    authService.signIn(email, password).then(
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
=======
import React from "react";
import { Link } from "react-router-dom";
=======
import React, { Component } from "react";
>>>>>>> Authorization added
import Form from "../elements/Form";
import { authService } from "../../services/auth.service";
import { withRouter } from "react-router-dom";

<<<<<<< HEAD
export const AuthSignIn = () => {
  return (
    <div className="container">
      <main className="main-content">
        <div className="main-logo">
          <i className="icon icon-mountain"></i>
        </div>
        <h1 className="main__title">Log In</h1>
        <Form />
        <div className="form__controls">
          <p className="main__social-text">Or sign up using</p>
          <Link className="hint" to="/signup">
            Don't have an account?
          </Link>
        </div>
      </main>
    </div>
  );
};
>>>>>>> common elements added
=======
class AuthSignIn extends Component {
  constructor(props) {
    super(props);

=======
>>>>>>> Jwt token added
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
>>>>>>> Authorization added
