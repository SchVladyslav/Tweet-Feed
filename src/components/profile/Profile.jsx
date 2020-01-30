import React, {Component} from "react";
import ProfileForm from "../forms/ProfileForm/ProfileForm";
import {Button} from '../common/index';
import './Profile.scss';
import ChangePassForm from "../forms/ChangePassForm/ChangePassForm";

class Profile extends Component {

    state = {
        isModalShowed: false,
        oldPassword: '',
        password: '',
        confirmPassword: ''
    };

    updateState = state => {
        this.setState({
            oldPassword: state.oldPassword,
            password: state.password,
            confirmPassword: state.confirmPassword
        });
    };

    onChangePassBtnHandler = () => this.setState({isModalShowed: !this.state.isModalShowed});
    closeModalHandler = () => this.setState({isModalShowed: false});

    render() {
        return (
            <div className="profile">
                <div className="profile_btn_container">
                    <Button
                        type="button"
                        buttonSize="small"
                        buttonColorScheme="success"
                        onClick={this.onChangePassBtnHandler}
                    >
                        Change password
                    </Button>
                </div>
                <ChangePassForm
                    state={this.state}
                    updateState={this.updateState}
                    showModal={this.state.isModalShowed}
                    toggleModalVisibility={this.closeModalHandler}
                />
                <h1>Enter your personal data:</h1>
                <ProfileForm/>
            </div>
        )
    }
}

export default Profile;
