import React, {Component} from "react";
import {Button, Input} from '../../common/index';
import './ChangePassModal.scss';
import {validateFields} from "../../../helpers/ValidateFields";
import {authService} from "../../../services/auth.service";
import {userService} from "../../../services/user.service";

class ChangePassModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props.state,
            formErrors: {
                oldPassword: '',
                password: '',
                confirmPassword: ''
            },
            formValid: false
        }
    }


    changePassSubmitHandler = event => {
        event.preventDefault();
        userService.updateUserPassword(authService.currentUser.id, this.state.password);
    };

    InputsChangeHandler = event => {
        const {name, value} = event.target;

        this.setState({[name]: value}, () => {
            validateFields(name, value, this.state, 'change pass');
            this.props.updateState(this.state);
            console.log(this.state.formValid);
        });
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
                                type="submit"
                                buttonColorScheme="light"
                                onClick={this.changePassSubmitHandler}
                                disabled={!this.state.formValid}
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
