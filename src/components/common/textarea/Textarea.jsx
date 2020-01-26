import React from 'react';
import './textarea.scss'
import PropTypes from "prop-types";
import Preloader from "../preloader/Preloader";

function Textarea({key, className, name, cols, rows, placeholder, children, isInvalid, onChange, value}) {
    return (
        <textarea
            name={name}
            placeholder={placeholder}
            cols={cols}
            rows={rows}
            className={`textarea ${className ? className : ''} ${isInvalid ? 'textarea_invalid' : ''}`}
            key={key}
            onChange={onChange}
            value={value}

        >{children}</textarea>
    );
}

export default Textarea;
Textarea.propTypes = {
    key: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.string,
    cols: PropTypes.string,
    rows: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    isInvalid: PropTypes.bool,
    onChange: PropTypes.func
};
