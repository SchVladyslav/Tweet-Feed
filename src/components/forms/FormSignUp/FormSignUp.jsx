import React, { Component } from "react";
import { Button, Input } from "../../common/index";
import { validateFields } from "../../../helpers/ValidateFields";

export class FormSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.state,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      formValid: false
    };
  }

  handleUserInput = e => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState({ [name]: value }, () => {
      validateFields(name, value, this.state, "sign up");
      this.props.updateState(this.state);
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className="main__form"
        action=""
        onChange={this.handleUserInput}
        onSubmit={handleSubmit}
      >
        <ul className="form__list">
          <Input
            className="input input__email"
            type="text"
            placeholder="First Name"
            name="firstName"
            iconName="user"
            errorMessage={this.state.formErrors.firstName}
          />
          <Input
            className="input input"
            type="text"
            placeholder="Last Name"
            name="lastName"
            iconName="user"
            errorMessage={this.state.formErrors.lastName}
          />
          <Input
            className="input input__email"
            type="email"
            placeholder="E-mail"
            name="email"
            iconName="user"
            errorMessage={this.state.formErrors.email}
          />
          <Input
            className="input input__password"
            type="password"
            placeholder="Password"
            name="password"
            iconName="password"
            errorMessage={this.state.formErrors.password}
          />
          <Input
            className="input input__password"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            iconName="password"
            errorMessage={this.state.formErrors.confirmPassword}
          />
        </ul>
        <Button
          children="Sign Up"
          className="button button-auth"
          type="submit"
          buttonColorScheme="pearl"
          buttonSize="large"
          disabled={!this.state.formValid}
        />
      </form>
    );
  }
}
