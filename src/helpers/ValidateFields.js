import {authService} from "../services/auth.service";

export const validateFields = (fieldName, value, state, formType) => {
    const stateObj = state;

    const MIN_PASS_LENGTH = 4;

    let emailValid, passValid, confirmPasswordValid, oldPasswordValid;

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
            confirmPasswordValid = value === stateObj.password;
            stateObj.formErrors.confirmPassword = confirmPasswordValid ? "" : "Passwords are not matching!";
            break;
        case "oldPassword":
            oldPasswordValid = value === authService.currentUser.password;
            stateObj.formErrors.oldPassword = oldPasswordValid ? "" : 'Wrong old password!';
            break;
        default:
            break;
    }

    switch (formType) {
        case 'sign in':
            validSignInForm(emailValid, passValid, stateObj);
            break;
        case 'sign up':
            validSignUpForm(stateObj.firstName.length, stateObj.lastName.length, emailValid, confirmPasswordValid, stateObj);
            break;
        case 'change pass':
            validChangePassForm(stateObj.oldPassword, stateObj.password, confirmPasswordValid, stateObj);
            break;
        default:
            break;
    }
};

const validSignInForm = (emailValid, passValid, stateObj) => {
    stateObj.formValid = !!(emailValid !== null && passValid);
};

const validSignUpForm = (firstName, lastName, emailValid, confirmPasswordValid, stateObj) => {
    stateObj.formValid = !!(emailValid !== null && firstName && lastName && confirmPasswordValid);
};

const validChangePassForm = (oldPasswordValid, passValid, confirmPasswordValid, stateObj) => {
    stateObj.formValid = !!(oldPasswordValid && passValid && confirmPasswordValid);
};
