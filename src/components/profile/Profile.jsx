import React, {Component} from "react";
import ProfileForm from "../forms/ProfileForm/ProfileForm";
import {Button, Preloader} from '../common';
import './Profile.scss';
import ChangePassForm from "../forms/ChangePassForm/ChangePassForm";

class Profile extends Component {

    state = {
        isModalShowed: false,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        isLoading: false
    };

    updateState = state => {
        this.setState({
            oldPassword: state.oldPassword,
            newPassword: state.newPassword,
            confirmPassword: state.confirmPassword,
        });
    };

    toggleLoading = () => {
        this.setState({isLoading: !this.state.isLoading});
        setTimeout(() => {
            this.setState({isLoading: !this.state.isLoading});
        }, 1500);
    };

    modalVisibilityHandler = () => this.setState({isModalShowed: !this.state.isModalShowed});

    render() {
        const {isLoading} = this.state;
        return (
            <>
                {!isLoading ?
                    <div className="profile">
                        <div className="profile_btn_container">
                            <Button
                                type="button"
                                buttonSize="small"
                                buttonColorScheme="success"
                                onClick={this.modalVisibilityHandler}
                            >
                                Change password
                            </Button>
                        </div>
                        <ChangePassForm
                            state={this.state}
                            updateState={this.updateState}
                            showModal={this.state.isModalShowed}
                            toggleModalVisibility={this.modalVisibilityHandler}
                            toggleLoading={this.toggleLoading}
                        />
                        <h1>Enter your personal data:</h1>
                        <ProfileForm
                            toggleLoading={this.toggleLoading}
                        />
                    </div>
                    : <Preloader/>}
            </>
        )
    }
}

export default Profile;