import React, { Component } from "react";
import { PropTypes } from "prop-types";

import { Button, Input } from "../../common/index";
import { validateFields } from "../../../helpers/ValidateFields";

class FormSignIn extends Component {
  constructor(props) {
    super(props);

    this.formProps = {
      state: props.state
    };

    this.state = {
      ...props.state,
      formErrors: {
        email: "",
        password: ""
      },
      formValid: false
    };
  }

  handleUserInput = e => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState({ [name]: value }, () => {
      validateFields(name, value, this.state, "sign in");
      this.props.updateState(this.state);
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className="main__form"
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
        </ul>
        <Button
          disabled={!this.state.formValid}
          children="Sign In"
          className="button button-auth"
          type="submit"
          buttonColorScheme="pearl"
          buttonSize="large"
        />
      </form>
    );
  }
}

export default FormSignIn;

FormSignIn.propTypes = {
  formErrors: PropTypes.objectOf(PropTypes.string),
  formValid: PropTypes.bool.isRequired
};
