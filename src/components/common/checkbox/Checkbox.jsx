import React from 'react';
import './Checkbox.scss';
import PropTypes from 'prop-types';

function Checkbox({label, name, isChecked, defaultChecked, handleCheckboxChange}) {

    Checkbox.propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string,
        isChecked: PropTypes.bool,
        handleCheckboxChange: PropTypes.func,
    };

    return (
        <>
            <input
                type="checkbox"
                id="checkbox"
                value={label}
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="checkbox"
                name={name}
                defaultChecked={defaultChecked}
            />
            <label htmlFor="checkbox" className="checkbox__label">
                <span className="checkbox__text">{label}</span>
            </label>
        </>
    );
}

export default Checkbox;
