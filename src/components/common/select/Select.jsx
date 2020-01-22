import React from 'react';
import './Select.scss';

export default function Select({onChangeHandler}) {
    return (
        <label className="label">Choose your gender:
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

