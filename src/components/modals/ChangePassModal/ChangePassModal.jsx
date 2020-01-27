import React, {Component} from "react";
import {Button, Input} from '../../common/index';
import './ChangePassModal.scss';
import {validateFields} from "../../../helpers/ValidateFields";
import {authService} from "../../../services/auth.service";

class ChangePassModal extends Component {

    state = {
        oldPassword: '',
        password: '',
        confirmPassword: '',
        formErrors: {
            oldPassword: '',
            password: '',
            confirmPassword: ''
        },
        formValid: false
    };

    changePassSubmitHandler = () => {
        console.log(this.state.formValid);
        console.log(authService.currentUser);
    };

    InputsChangeHandler = event => {
        const {name, value} = event.target;
        const {confirmPassword, oldPassword, password} = this.state.formErrors;

        this.setState({[name]: value}, () => {
            validateFields(name, value, this.state);
            console.log(confirmPassword, oldPassword, password);
        });

        this.setState({formValid: !confirmPassword && !oldPassword && !password});
    };

    render() {
        const {showModal} = this.props;

        return (
            <>
                {showModal ?
                    <div className="modal__background">
                        <form
                            className="modal"
                            onChange={this.InputsChangeHandler}
                            onSubmit={this.changePassSubmitHandler}
                        >
                            <Input
                                type="password"
                                placeholder="Enter old password"
                                name="oldPassword"
                                iconName="password"
                                errorMessage={this.state.formErrors.oldPassword}
                            />
                            <Input
                                type="password"
                                placeholder="Enter new password"
                                name="password"
                                iconName="password"
                                errorMessage={this.state.formErrors.password}
                            />
                            <Input
                                type="password"
                                placeholder="Repeat your new password"
                                name="confirmPassword"
                                iconName="password"
                                errorMessage={this.state.formErrors.confirmPassword}
                            />
                            <Button
                                type="button"
                                buttonColorScheme="light"
                                onClick={this.changePassSubmitHandler}
                                //disabled={!this.state.formValid}
                            >
                                Change password
                            </Button>
                        </form>
                    </div>
                    : null}
            </>
        );
    }
}

export default ChangePassModal;
