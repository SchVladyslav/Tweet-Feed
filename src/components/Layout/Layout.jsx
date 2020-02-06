import React, {Component} from 'react';
import './Layout.scss';
import {NavLink} from "react-router-dom";
import {Dropdown, Logout} from "../common";
import PropTypes from "prop-types";
import {withRouter} from "react-router";

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
        const {pathname} = this.props.location;
        const isAuthPage = pathname !== '/signin' && pathname !== '/signup';
        return (
            <>
                <header className="header">
                    <i className="icon icon-menu icon-32 header__menu-icon" onClick={this.onBurderBtnHandler}/>
                    <i className="icon icon-mountains main-logo header__logo"/>
                    {isAuthPage ?
                        <Dropdown>
                            <Logout/>
                        </Dropdown>
                        : null
                    }
                </header>
                <main className="main">
                    {isAuthPage ?
                        <>
                            {this.state.isBurgerContentShowed ?
                                <div className="burger">
                                    <ul className="burger__list">
                                        {this.renderLinks('burger')}
                                    </ul>
                                </div>
                                : null}
                            <aside className="sidebar">
                                <ul className="sidebar__list">
                                    {this.renderLinks('sidebar')}
                                </ul>
                            </aside>
                            <div className="main__content">
                                {this.props.children}
                            </div>
                        </>
                        : this.props.children }
                </main>
            </>
        )
    }
}
Layout.propTypes = {
    children: PropTypes.element
};
export default withRouter(Layout);