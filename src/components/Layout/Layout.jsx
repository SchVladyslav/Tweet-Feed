import React, {Component} from 'react';
import './Layout.scss';
import {NavLink} from "react-router-dom";
import {Dropdown, Logout} from "../common/index";
import PropTypes from "prop-types";
import {authService} from "../../services/auth.service";

class Layout extends Component {

    state = {
        isBurgerContentShowed: false
    };

    onBurderBtnHandler = () => this.setState({isBurgerContentShowed: !this.state.isBurgerContentShowed});

    renderLinks = type => {
        const links = [
            {value: 'News', path: '/dashboard'},
            {value: 'Events', path: '/events'},
            {value: 'Profile', path: '/profile'}
        ];
        return links.map(link => {
            console.log(link);
            return (
                <li className={`${type}__list__item`} key={Math.random()}>
                    <NavLink
                        to={link.path}
                        className="link"
                    >
                        {link.value}
                    </NavLink>
                </li>
            )
        })
    };

    render() {
        return (
            <>
                <header className="header">
                    <i className="icon icon-menu icon-32 header__menu-icon" onClick={this.onBurderBtnHandler}/>
                    <i className="icon icon-mountains main-logo header__logo"/>
                    {authService.currentUser ?
                        <Dropdown>
                            <Logout/>
                        </Dropdown>
                        : null
                    }
                </header>
                <main className="main">
                    {authService.currentUser ?
                        <>
                            {this.state.isBurgerContentShowed ?
                                <div className="burger">
                                    <ul className="burger__list">
                                        {this.renderLinks('burger')}
                                    </ul>
                                </div>
                                : null }
                                <aside className="sidebar">
                                    <ul className="sidebar__list">
                                        {this.renderLinks('sidebar')}
                                    </ul>
                                </aside>
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
