import React from 'react';

function RadioOption({ id, name, value, label, checked, onChange, child }) {
    return (
        <li className="flex flex-1 flex-col lg:flex-row">
            <label
                className="lg:my-2 w-40 lg:h-8 align-middle cursor-pointer"
                htmlFor={id}
            >
                <input
                    className="lg:h-8 mx-2 align-middle cursor-pointer"
                    type="radio"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked}
                />
                {label}
            </label>
            <div className="flex-1 ml-8 lg:ml-0 my-2 lg:my-3">
                {checked && child}
            </div>
        </li>
    );
}

export default RadioOption;
