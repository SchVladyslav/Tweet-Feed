import React, { Component } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { authService } from "../../services/auth.service";
import { ValidateFields } from "../../helpers/ValidateFields";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.formProps = {
      inputSettings: props.inputSettings,
      buttonSettings: props.buttonSettings
    };

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      formValid: false
    };
  }

  handleUserInput = e => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState({ [name]: value });
    // , () => {
    //   ValidateFields(name, value);
    // });
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    authService.login(email, password); //.then(
    //   user => {
    //     console.log(this.props);
    //     const { from } = this.props.location.state || {
    //       from: { pathname: "/dashboard" }
    //     };
    //     this.props.history.push(from);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  };

  renderInputs() {
    return this.formProps.inputSettings.map((settings, key) => (
      <li className="form__item" key={key}>
        <Input settings={settings} />
        <i
          className={`icon ${
            settings.type === "password" ? "icon-lock" : "icon-user"
          }  input__icon`}
        ></i>
      </li>
    ));
  }

  renderButtons() {
    return this.formProps.buttonSettings.map((settings, key) => (
      <Button
        settings={settings}
        buttonState={this.state.formValid}
        key={key}
      />
    ));
  }

  render() {
    return (
      <form
        className="main__form"
        action=""
        onChange={this.handleUserInput}
        onSubmit={this.handleSubmit}
      >
        <ul className="form__list">{this.renderInputs()}</ul>
        {this.renderButtons()}
      </form>
    );
  }
}

{
  /* <Button
          label="Sign Up"
          className="button"
          type="submit"
          handleClick={event => this.handleClick(event)}
          buttonState={this.state.formValid}
        /> */
}

{
  /* <Input
              className="input input__password"
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              handleChange={event => this.handleUserInput(event)}
            />
            <i className="icon icon-lock input__icon"></i> */
}
