import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./DashboardPage.scss";
import Dashboard from "../../components/dashboard/Dashboard";
import Layout from "../../components/Layout/Layout";

class DashboardPage extends Component {
  render() {
    return (

        <Layout><Dashboard /></Layout>
    );
  }
}

export default DashboardPage;
