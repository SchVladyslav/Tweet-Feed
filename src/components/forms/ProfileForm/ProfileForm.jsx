import React, {Component} from "react";
import {Button, Input, Select} from "../../common/index";
import './ProfileForm.scss';

class ProfileForm extends Component {

  state = {
    firstName: 'Irina',
    lastName: 'Telesheva',
    email: 'megoirlik11@gmail.com',
    age: 19,
    gender: null
  };

  onSubmitHandler = event => {
    event.preventDefault();
    console.log(this.state);
  };

  handleFirstName = (event) => this.setState({firstName: event.target.value});
  handleLastName = (event) => this.setState({lastName: event.target.value});
  handleAge = (event) => this.setState({age: event.target.value});
  handleGender = (event) => this.setState({gender: event.target.value});

  render() {
    return (
        <div className="profile-form">
          <form onSubmit={this.onSubmitHandler} className="form">
            <div className="input-container">
              <Input
                  placeholder="Enter your first name"
                  value={this.state.firstName}
                  onChange={this.handleFirstName}
              />
              <Input
                  placeholder="Enter your last name"
                  value={this.state.lastName}
                  onChange={this.handleLastName}
              />
              <Input
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={event => console.log(event.target.value)}
              />
              <Input
                  placeholder="Enter your age"
                  value={this.state.age}
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
        </div>
    )
  }

}

export default ProfileForm;
