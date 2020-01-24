import React from 'react';
import './Checkbox.scss';
import PropTypes from 'prop-types';

function Checkbox({label, isChecked, handleCheckboxChange}) {

    Checkbox.propTypes = {
        label: PropTypes.string.isRequired,
        isChecked: PropTypes.bool.isRequired,
        handleCheckboxChange: PropTypes.func.isRequired,
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
            />
            <label htmlFor="checkbox" className="checkbox__label">
                <span className="checkbox__text">{label}</span>
            </label>
        </>
    );
}

export default Checkbox;
