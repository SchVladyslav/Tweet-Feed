import React from 'react';
import './Select.scss';
import PropTypes from 'prop-types';

export default function Select({label, onChangeHandler}) {

    Select.propTypes = {
        label: PropTypes.string.isRequired,
        onChangeHandler: PropTypes.func.isRequired
    };

    return (
        <label className="label">{label}
            <select
                className="select select__text"
                defaultValue="default"
                onChange={onChangeHandler}
            >
                <option className="select__text" disabled value="default">-</option>
                <option className="select__text" value="female">Female</option>
                <option className="select__text" value="male">Male</option>
            </select>
        </label>
    )
}
