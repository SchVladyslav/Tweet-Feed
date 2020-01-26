export const validateFields = (fieldName, value, state) => {
    const stateObj = state;

    const MIN_PASS_LENGTH = 4;
    const SignIn_STATE_LENGTH = 5;

    let emailValid, passValid, confirmPasswordValid;

    switch (fieldName) {
        case "firstName":
            stateObj.formErrors.firstName = value.length ? "" : "Enter Your First Name!";
            break;
        case "lastName":
            stateObj.formErrors.lastName = value.length ? "" : "Enter Your Last Name!";
            break;
        case "email":
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            stateObj.formErrors.email = emailValid ? "" : "Email is Invalid!";
            break;
        case "password":
            passValid = value.length >= MIN_PASS_LENGTH;
            stateObj.formErrors.password = passValid ? "" : "Password is too short! Expected at least 4 symbols!";
            break;
        case "confirmPassword":
            confirmPasswordValid = value === stateObj.password ? true : false;
            stateObj.formErrors.confirmPassword = confirmPasswordValid ? "" : "Passwords are not matching!";
            break;
        default:
            break;
    }

    Object.keys(stateObj).length === SignIn_STATE_LENGTH
        ? validSignInForm(emailValid, passValid, stateObj)
        : validSignUpForm(stateObj.firstName.length, stateObj.lastName.length, emailValid, confirmPasswordValid, stateObj);
}

const validSignInForm = (emailValid, passValid, stateObj) => {
    if (emailValid !== null && passValid)
        stateObj.formValid = true;
    else
        stateObj.formValid = false;
}

const validSignUpForm = (firstName, lastName, emailValid, confirmPasswordValid, stateObj) => {
    if (emailValid !== null && firstName && lastName && confirmPasswordValid)
        stateObj.formValid = true;
    else
        stateObj.formValid = false;
}