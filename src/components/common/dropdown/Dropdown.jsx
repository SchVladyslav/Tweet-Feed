import React from "react";
import './dropdown.scss'

export default function Dropdown({children}) {
    return <div className="dropdown">
        <img className='user-avatar_small'
             width='40'
             height='40'
             src={require('../../../assets/img/user_avatar.svg')}
             alt="user avatar"/>
        <div className="dropdown-content">
            {children}
        </div>
    </div>
}
