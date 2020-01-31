import React from 'react';
import './Select.scss';
import PropTypes from 'prop-types';

export default function Select({name, label, selectValue, onChangeHandler}) {

    Select.propTypes = {
        label: PropTypes.string.isRequired,
        onChangeHandler: PropTypes.func.isRequired
    };

    return (
        <label className="label">{label}
            <select
                className="select select__text"
                onChange={onChangeHandler}
                defaultValue={selectValue || "default"}
                name={name}
            >
                <option className="select__text" disabled value="default">-</option>
                <option className="select__text" value="female">Female</option>
                <option className="select__text" value="male">Male</option>
            </select>
        </label>
    )
}

