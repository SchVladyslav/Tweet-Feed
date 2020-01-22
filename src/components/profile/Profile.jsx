import React, {Component} from "react";
import ProfileForm from "../forms/ProfileForm/ProfileForm";
import './Profile.scss';

class Profile extends Component {
    render() {
        return(
            <div className="profile">
            <h1>Enter your personal data:</h1>
            <ProfileForm/>
            </div>
        )
    }
}

export default Profile;
