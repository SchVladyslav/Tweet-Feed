import React, { Component } from "react";
import { Button, Input } from "../../common/index";
import { ValidateFields } from "../../../helpers/ValidateFields";
import { authService } from "../../../services/auth.service";

class FormSignIn extends Component {
  constructor(props) {
    super(props);

    this.formProps = {
      state: props.state
    };

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
            type="email"
            placeholder="E-mail"
            name="email"
            iconName="email"
            // errorMessage="Enter an E-mail!"
          />
          <Input
            className="input input__password"
            type="password"
            placeholder="Password"
            name="password"
            iconName="password"
            // errorMessage="Enter a Password!"
          />
        </ul>
        <Button
          children="Sign In"
          className="button"
          type="submit"
          buttonColorScheme="primary"
          buttonSize="small"
        />
      </form>
    );
  }
}

export default FormSignIn;
