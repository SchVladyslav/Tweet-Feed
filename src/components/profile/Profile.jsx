import React, {Component} from "react";
import ProfileForm from "../forms/ProfileForm/ProfileForm";
import {Button} from '../common/index';
import './Profile.scss';
import ChangePassModal from "../modals/ChangePassModal/ChangePassModal";

class Profile extends Component {

    state = {
        isModalShowed: false
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
                    { this.state.isModalShowed ?
                        <i
                            className="icon icon-close modal-close"
                            onClick={this.closeModalHandler}
                        />
                        : null }
                </div>
                <ChangePassModal state={this.state} showModal={this.state.isModalShowed}/>
                <h1>Enter your personal data:</h1>
                <ProfileForm/>
            </div>
        )
    }
}

export default Profile;
