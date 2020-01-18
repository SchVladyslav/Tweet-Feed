import React from "react";
import './input.scss';

export default function Input({key, className, placeholder, type, errorMessage, onChange}) {

    return <React.Fragment>
        <div className='input-wrap' key={key}>
            <input
                className={`${className ? className : ''} input${errorMessage ? ' input_invalid' : ''}`}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
            />
            <i className="icon icon-user input__icon"/>
            {errorMessage ? <p className='error-message'>{errorMessage}</p> : null}
        </div>

    </React.Fragment>
}
