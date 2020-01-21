import React from "react";
import './dropdown.scss'

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    handleClick(e) {
        const dropdown_content = document.querySelector('.dropdown__content');
        const dropdown = document.querySelector('.user-avatar_small');
        if (!e.path.includes(dropdown_content) && this.state.isOpen || dropdown === e.target) {
            this.setState({
                isOpen: !this.state.isOpen
            })
        }
    }

    render() {
        return <div className="dropdown">
            <img className='user-avatar_small'
                 width='40'
                 height='40'
                 src={require('../../../assets/img/user_avatar.svg')}
                 alt="user avatar"
            />
            {this.state.isOpen ? (<div className="dropdown__content">
                {this.props.children}
            </div>) : null}

        </div>
    }
}
