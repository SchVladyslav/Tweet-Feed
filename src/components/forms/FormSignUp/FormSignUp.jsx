import React, { Component } from "react";
import { Button, Input } from "../../common/index";
import { ValidateFields } from "../../../helpers/ValidateFields";
import { authService } from "../../../services/auth.service";

export class FormSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.state,
      formValid: false
    };
  }

  handleUserInput = e => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState({ [name]: value }, () => {
      //ValidateFields(name, value);
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
            //errorMessage="Enter your First Name!"
          />
          <Input
            className="input input"
            type="text"
            placeholder="Last Name"
            name="lastName"
            iconName="user"
            //errorMessage="Enter your Last Name!"
          />
          <Input
            className="input input__email"
            type="email"
            placeholder="E-mail"
            name="email"
            iconName="user"
            //errorMessage="Enter an E-mail!"
          />
          <Input
            className="input input__password"
            type="password"
            placeholder="Password"
            name="password"
            iconName="password"
            //errorMessage="Enter a Password!"
          />
          <Input
            className="input input__password"
            type="password"
            placeholder="Confirm Password"
            name="password"
            iconName="password"
            //errorMessage="Passwords aren't matched!"
          />
        </ul>
        <Button
          children="Sign Up"
          className="button"
          type="submit"
          buttonColorScheme="primary"
          buttonSize="small"
        />
      </form>
    );
  }
}
