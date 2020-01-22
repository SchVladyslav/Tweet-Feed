import React, {Component} from 'react';
import './Layout.scss';
import {NavLink} from "react-router-dom";
import Dropdown from "../common/dropdown/Dropdown";
import Button from "../common/button/Button";

class Layout extends Component {

    render() {
        return (
            <div>
                <nav className="navbar">
                    <i className="icon icon-mountains main-logo"/>
                    <Dropdown>
                        <Button type='submit' buttonColorScheme='transparent' color='black' buttonSize='small'>Logout</Button>
                    </Dropdown>
                </nav>
                <main>
                    <div className="main">
                        <aside className="sidebar">
                            <ul className="sidebar__list">
                                <div>
                                    <li className="sidebar__list__item">
                                        <NavLink
                                            to={'/dashboard'}
                                            className="sidebar__list__item__link"
                                        >
                                            News
                                        </NavLink>
                                    </li>
                                    <li className="sidebar__list__item">
                                        <NavLink
                                            to={'/events'}
                                            className="sidebar__list__item__link"
                                        >
                                            Events
                                        </NavLink>
                                    </li>
                                </div>
                                <li className="sidebar__list__item">
                                    <NavLink
                                        to={'/profile'}
                                        className="sidebar__list__item__link"
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                            </ul>
                        </aside>
                        <div className="main__content">
                            {this.props.children}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default Layout;
