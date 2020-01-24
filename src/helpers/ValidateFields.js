export const ValidateFields = (fieldName, value) => {
    let message = "";

    switch (fieldName) {
        case "firstName":
            message = value.length ? "" : "Enter your First Name";
            break;
        case "lastName":
            message = value.length ? "" : "Enter your Last Name";
            break;
        case "email":
            let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            message = emailValid ? "" : "Email is invalid!";
            break;
        case "password":
            message = value.length > 6 ? "" : "Password is too short";
            break;
        case "сonfirmPassword":
            message = value.length > 6 ? "" : "Passwords are not matching!";
            break;
        default:
            break;
    }
    // this.setState( //destructuring?
    //     {
    //         firstName: value,
    //         formErrors: fieldName,
    //         emailValid: fieldName,
    //         passwordValid: fieldName,
    //         confirmPasswordValid: fieldName
    //     },
    //     this.validateForm
    // );
}

const validateForm = () => {
    this.setState({
        formValid:
            this.state.emailValid &&
            this.state.passwordValid &&
            this.state.confirmPasswordValid
    });
}