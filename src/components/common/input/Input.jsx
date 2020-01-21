import React from "react";
import './input.scss';

function getClassName(classesArray, property) {
    if (classesArray[property]) {
        return classesArray[property];
    } else {
        return false;
    }
}

export default function Input({key, className, placeholder, type, errorMessage, onChange, iconName}) {

    const iconNames = {
        user: 'icon-user',
        email: 'icon-user',
        password: 'icon-lock',
    };
    const iconClass = getClassName(iconNames, iconName);
    return <div className='input' key={key}>
        <div className="input__control">
            <input
                className={`${className ? className : ''} input__field${errorMessage ? ' input__field_invalid' : ''}`}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
            />
        </div>
        {iconClass ? <i className={`icon ${iconClass} input__icon`}/>
            : null
        }
        <div className="input__error">
            {errorMessage ? <p className='error-message'>{errorMessage}</p> : null}
        </div>

    </div>
}
