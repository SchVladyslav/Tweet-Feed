import React, {Component} from 'react';
import './Layout.scss';
import {NavLink} from "react-router-dom";
import {Dropdown, Logout} from "../common/index";
import PropTypes from "prop-types";

class Layout extends Component {

    state = {
        isBurgerShowed: window.innerWidth < 1200,
        isBurgerContentShowed: false
    };

    onBurderBtnHandler = () => this.setState({isBurgerContentShowed: !this.state.isBurgerContentShowed});

    render() {
        return (
            <>
                <header className="header">
                    {this.state.isBurgerShowed ?
                        <i className="icon icon-menu icon-32 header__menu-icon" onClick={this.onBurderBtnHandler}/> :
                        <i className="icon icon-mountains main-logo"/>}
                    {window.location.pathname !== '/signin' && window.location.pathname !== '/signup' ?
                        <Dropdown>
                            <Logout/>
                        </Dropdown>
                        : null
                    }
                </header>
                <main className="main">
                    {window.location.pathname !== '/signin' && window.location.pathname !== '/signup' ?
                        <>
                            {this.state.isBurgerContentShowed || !this.state.isBurgerShowed ?
                                <aside className="sidebar">
                                    <ul className="sidebar__list">
                                        <div>
                                            <li className="sidebar__list__item">
                                                <NavLink
                                                    to={'/dashboard'}
                                                    className="link"
                                                >
                                                    News
                                                </NavLink>
                                            </li>
                                            <li className="sidebar__list__item">
                                                <NavLink
                                                    to={'/events'}
                                                    className="link"
                                                >
                                                    Events
                                                </NavLink>
                                            </li>
                                        </div>
                                        <li className="sidebar__list__item">
                                            <NavLink
                                                to={'/profile'}
                                                className="link"
                                            >
                                                Profile
                                            </NavLink>
                                        </li>
                                    </ul>
                                </aside> : null}
                            <div className="main__content">
                                {this.props.children}
                            </div>
                        </>
                        : this.props.children}
                </main>
            </>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.element
};

export default Layout;
