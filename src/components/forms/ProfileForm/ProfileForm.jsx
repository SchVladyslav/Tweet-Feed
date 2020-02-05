import React, {Component} from "react";
import {Button, Input, Select, Preloader} from "../../common";
import './ProfileForm.scss';
import {userService} from "../../../services/user.service";
import {authService} from "../../../services/auth.service";
import {Role} from "../../../helpers/FakeAPI/Role";

class ProfileForm extends Component {

    state = {
        user: null
    };

    onSubmitHandler = event => {
        event.preventDefault();

        if (authService.currentUser.role !== Role.Admin) {
            const isUpdatedProfile = userService.updateUserData(
                authService.currentUser.id,
                this.state.user
            );

            if (isUpdatedProfile) return this.props.toggleLoading();

        } else window.alert('Only readers can change profile!');
    };

    componentDidMount() {
        setTimeout(this.fetchUserData, 1000);
    }

    fetchUserData = () => {
        const user = userService.getUserDataById(authService.currentUser.id);
        this.setState({user});
    };

    handleInputChange = event => {
        const {name, value} = event.target;
        const {user} = this.state;

        this.setState({user: {...user, [name]: value}});

    };

    render() {
        const {user} = this.state;
        return (
            <div className="profile-form">
                {user ?
                    <form onSubmit={this.onSubmitHandler} className="form">
                        <div className="input-container">
                            <Input
                                placeholder="Enter your first name"
                                name="firstName"
                                value={user.firstName || ''}
                                onChange={this.handleInputChange}
                            />
                            <Input
                                placeholder="Enter your last name"
                                name="lastName"
                                value={user.lastName || ''}
                                onChange={this.handleInputChange}
                            />
                            <Input
                                placeholder="Enter your email"
                                value={user.email || ''}
                                onChange={() => window.alert("You can't change email!")}
                            />
                            <Input
                                placeholder="Enter your age"
                                name="age"
                                value={user.age || ''}
                                type="number"
                                onChange={this.handleInputChange}
                            />
                            <Select
                                label={'Choose your gender:'}
                                name="gender"
                                onChangeHandler={this.handleInputChange}
                                selectValue={user.gender}
                            />
                        </div>
                        <Button
                            buttonColorScheme={'primary'}
                            type={'submit'}
                        > Save profile
                        </Button>
                    </form>
                    : <Preloader/>
                }
            </div>
        )
    }

}

export default ProfileForm;
