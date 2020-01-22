import React, {Component} from 'react';
import './Layout.scss';
import {NavLink} from "react-router-dom";
import Dropdown from "../common/dropdown/Dropdown";

class Layout extends Component {

    render() {
        return (
            <>
                <header className="header">
                    <i className="icon icon-mountains main-logo"/>
                    <Dropdown>
                        <NavLink to={'/signin'} className="link">Logout</NavLink>
                    </Dropdown>
                </header>
                <main className="main">
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
                        </aside>
                        <div className="main__content">
                            {this.props.children}
                        </div>
                </main>
            </>
        )
    }
}
