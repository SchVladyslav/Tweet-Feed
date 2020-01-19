import React from "react";
import './withLayout.scss';
import userLogo from '../../assets/icons/account.png';
import burger from '../../assets/icons/hamburger.svg';
import close from '../../assets/icons/close.svg';

export function withLayout(Component) {
    return class extends React.Component {
        render() {
            return (
                <>
                    <nav className="navbar"> return class extends
                        <img
                            src={burger}
                            alt="burger-menu"
                            className="icon"
                        />
                        <img
                            src={userLogo}
                            alt="user-logo"
                            className="icon"
                        />
                    </nav>
                    <main>
                        <div className="main">
                                <aside className="sidebar">
                                    <img
                                        src={close}
                                        alt="close"
                                        className="sidebar__icon icon"
                                    />
                                    <ul className="sidebar__list">
                                        <li className="sidebar__list__item">
                                            <a>News</a>
                                        </li>
                                        <li className="sidebar__list__item">
                                            <a>Events</a>
                                        </li>
                                        <li className="sidebar__list__item">
                                            <a>Profile</a>
                                        </li>
                                    </ul>
                                </aside>
                            <Component/>
                        </div>
                    </main>
                </>
            )
        }
    }
}
