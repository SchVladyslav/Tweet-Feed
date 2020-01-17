import React, { Component } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.formProps = {
      state: props.state,
      inputSettings: props.inputSettings,
      buttonSettings: props.buttonSettings
    };

    this.state = {
      formValid: false
      //this.props.updateState(this.state);
    };

    this.setState({ [name]: value });
    // , () => {
    //   ValidateFields(name, value);
    // });
  }

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
    const { handleSubmit } = this.props;
    return (
      <form
        className="main__form"
        action=""
        onChange={this.handleUserInput}
        onSubmit={handleSubmit}
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
=======
  render() {
=======
>>>>>>> Jwt token added
    return (
      <form
        className="main__form"
        action=""
        onChange={this.handleUserInput}
        onSubmit={handleSubmit}
      >
        <ul className="form__list">{this.renderInputs()}</ul>
        {this.renderButtons()}
=======
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
>>>>>>> common elements added
      </form>
    );
  }
}
<<<<<<< HEAD

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
>>>>>>> Authorization added
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              handleChange={event => this.handleUserInput(event)}
            />
<<<<<<< HEAD
<<<<<<< HEAD
<i className="icon icon-lock input__icon"></i> */
}