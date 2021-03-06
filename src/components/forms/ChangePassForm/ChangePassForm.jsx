import React, {Component} from "react";
import {Button, Input, Modal} from '../../common';
import './ChangePassForm.scss';
import {validateFields} from "../../../helpers/ValidateFields";
import {authService} from "../../../services/auth.service";
import {userService} from "../../../services/user.service";

class ChangePassForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props.state,
            formErrors: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            formValid: false
        }
    }

    changePassSubmitHandler = event => {
        event.preventDefault();

        userService.changeUserPassword(authService.currentUser.id, this.state.newPassword);
        this.props.toggleModalVisibility();
        this.props.toggleLoading();
    };

    inputsChangeHandler = event => {
        const {name, value} = event.target;

        this.setState({[name]: value}, () => {
            validateFields(name, value, this.state, 'change pass');
            this.props.updateState(this.state);
        });
    };

    render() {
        const {showModal, toggleModalVisibility} = this.props;
        const {formErrors, formValid} = this.state;

        return (
            <>
                <Modal
                    modalTitle="Changing password"
                    isModalOpen={showModal}
                    toggleModalVisibility={toggleModalVisibility}
                    maxWidth="550px"
                >
                    <form
                        className="change-pass-form"
                        onChange={this.inputsChangeHandler}
                        onSubmit={this.changePassSubmitHandler}
                    >
                        <Input
                            type="password"
                            placeholder="Enter old password"
                            name="oldPassword"
                            iconName="password"
                            errorMessage={formErrors.oldPassword}
                        />
                        <Input
                            type="password"
                            placeholder="Enter new password"
                            name="newPassword"
                            iconName="password"
                            errorMessage={formErrors.newPassword}
                        />
                        <Input
                            type="password"
                            placeholder="Repeat your new password"
                            name="confirmPassword"
                            iconName="password"
                            errorMessage={formErrors.confirmPassword}
                        />
                        <Button
                            type="submit"
                            buttonColorScheme="light"
                            onClick={this.changePassSubmitHandler}
                            disabled={!formValid}
                        >
                            Change password
                        </Button>
                    </form>
                </Modal>
            </>
        );
    }
}

export default ChangePassForm;
