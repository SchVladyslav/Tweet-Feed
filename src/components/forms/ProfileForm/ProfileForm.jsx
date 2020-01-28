import React, {Component} from "react";
import {Button, Input, Select} from "../../common/index";
import './ProfileForm.scss';
import {userService} from "../../../services/user.service";
import Preloader from "../../common/preloader/Preloader";

class ProfileForm extends Component {

    state = {
        user: null
    };

    onSubmitHandler = event => {
        event.preventDefault();
        console.log(this.state);
    };

    componentDidMount() {
       const user = userService.getUserData();
      this.setState({user: user})
    }


    handleFirstName = (event) => this.setState({firstName: event.target.value});
    handleLastName = (event) => this.setState({lastName: event.target.value});
    handleAge = (event) => this.setState({age: event.target.value});
    handleGender = (event) => this.setState({gender: event.target.value});

    render() {
        console.log(this.state.user);
        return (
            <div className="profile-form">
                {this.state.user ?
                    <form onSubmit={this.onSubmitHandler} className="form">
                        <div className="input-container">
                            <Input
                                placeholder="Enter your first name"
                                value={this.state.user.firstName}
                                onChange={this.handleFirstName}
                            />
                            <Input
                                placeholder="Enter your last name"
                                value={this.state.user.lastName}
                                onChange={this.handleLastName}
                            />
                            <Input
                                placeholder="Enter your email"
                                value={this.state.user.email}
                                onChange={event => console.log(event.target.value)}
                            />
                            <Input
                                placeholder="Enter your age"
                                value={this.state.user.age}
                                type="number"
                                onChange={this.handleAge}
                            />
                            <Select
                                label={'Choose your gender:'}
                                onChangeHandler={this.handleGender}
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
