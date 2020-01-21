import React, { Component } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { ValidateFields } from "../../helpers/ValidateFields";

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

  handleUserInput = e => {
    const { name } = e.target;
    const { value } = e.target;

    this.setState({ [name]: value }, () => {
      this.props.updateState(this.state);
    });
    // , () => {
    //   ValidateFields(name, value);
    // });
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
