import React, { Component } from "react";
import "./Layout.scss";
import { NavLink } from "react-router-dom";
import Dropdown from "../common/dropdown/Dropdown";
import { Logout } from "../common/logout/Logout";

class Layout extends Component {
  render() {
    // console.log(
    //   window.location.pathname !== "/signin" &&
    //     window.location.pathname !== "/signup"
    // );
    return (
      <>
        <header className="header">
          <i className="icon icon-mountains main-logo" />
          {window.location.pathname !== "/signin" &&
          window.location.pathname !== "/signup" ? (
            <Dropdown>
              <Logout />
            </Dropdown>
          ) : null}
        </header>
        <main className="main">
          {window.location.pathname !== "/signin" &&
          window.location.pathname !== "/signup" ? (
            <>
              <aside className="sidebar">
                <ul className="sidebar__list">
                  <div>
                    <li className="sidebar__list__item">
                      <NavLink to={"/dashboard"} className="link">
                        News
                      </NavLink>
                    </li>
                    <li className="sidebar__list__item">
                      <NavLink to={"/events"} className="link">
                        Events
                      </NavLink>
                    </li>
                  </div>
                  <li className="sidebar__list__item">
                    <NavLink to={"/profile"} className="link">
                      Profile
                    </NavLink>
                  </li>
                </ul>
              </aside>
              <div className="main__content">{this.props.children}</div>
            </>
          ) : (
            this.props.children
          )}
        </main>
      </>
    );
  }
}

export default Layout;
