import React from 'react';
import './textarea.scss'

function Textarea({key, className, name, cols, rows, placeholder, children, isInvalid, onChange}) {
    return (
        <textarea
            name={name}
            placeholder={placeholder}
            cols={cols}
            rows={rows}
            className={`textarea ${className ? className : ''} ${isInvalid ? 'textarea_invalid' : ''}`}
            key={key}
            onChange={onChange}

        >{children}</textarea>
    );
}

export default Textarea;
