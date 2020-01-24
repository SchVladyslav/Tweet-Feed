import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { authService } from './services/auth.service';
import { Role } from './helpers/Role';
import './App.scss';
import Routes from "./Routes";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false
    }
  }

  componentDidMount() {
    const isLoggedIn = authService.currentUser;
    this.setState({
      currentUser: isLoggedIn,
      isAdmin: isLoggedIn && isLoggedIn.role === Role.Admin
    });
  }

  render() {
    return (
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
    );
  }

}
