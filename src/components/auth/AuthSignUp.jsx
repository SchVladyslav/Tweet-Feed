import React from "react";
import Form from "../elements/Form";

export const AuthSignUp = () => {
  const inputSettings = [
    {
      className: "input",
      type: "text",
      placeholder: "First Name",
      name: "firstName"
    },
    {
      className: "input",
      type: "text",
      placeholder: "Last Name",
      name: "lastName"
    },
    {
      className: "input input__email",
      type: "email",
      placeholder: "E-mail",
      name: "email"
    },
    {
      className: "input input__password",
      type: "password",
      placeholder: "Password",
      name: "password"
    },
    {
      className: "input input__password",
      type: "password",
      placeholder: "Confirm Password",
      name: "сonfirmPassword"
    }
  ];

  const buttonSettings = [
    {
      label: "Sign Up",
      className: "button",
      type: "submit"
    }
  ];

  return <Form inputSettings={inputSettings} buttonSettings={buttonSettings} />;
};
