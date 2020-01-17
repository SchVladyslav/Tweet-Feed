import React, { Component } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      formValid: false
    };
  }

  render() {
    return (
      <form className="main__form" action="">
        <ul className="form__list">
          <li>
            <Input
              className="input__email"
              type="email"
              placeholder="E-mail"
              name="email"
              value={this.state.email}
              handleChange={event => this.handleUserInput(event)}
            />
            <i className="icon icon-user input__icon"></i>
          </li>
          <li>
            <Input
              className="input__password"
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              handleChange={event => this.handleUserInput(event)}
            />
            <i className="icon icon-lock input__icon"></i>
          </li>
        </ul>
        <Button
          label="Sign Up"
          className="button"
          type="submit"
          buttonState={this.state.formValid}
        />
      </form>
    );
  }
}
