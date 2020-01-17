import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Routes from './Routes';

import Dashboard from "./pages/dashboardPage/DashboardPage";
import SignIn from "./pages/SignInPage/SignInPage";
import SignUp from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
