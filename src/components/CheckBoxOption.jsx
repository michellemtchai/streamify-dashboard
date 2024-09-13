import React, { useState } from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import DateInput from './DateInput';

function CheckBoxOption({
    id,
    name,
    value,
    label,
    checked,
    setValue,
    setSelected,
    child,
}) {
    let [input, setInput] = useState(null);
    let optionId = `${id}-${value}`;

    const onClick = () => {
        setSelected(value);
    };
    const onChange = (event) => {
        setInput(event.target.value);
    };
    const updateValue = (input) => {
        if (checked) {
            setValue(value, input);
        }
        setInput(input);
    };
    const inputTestId = () => {
        return `${name}-choice-${value}-${checked ? 'checked' : 'unchecked'}`;
    };
    const labelTestId = () => {
        return `${name}-choice-${value}-label`;
    };

    return (
        <li className="mx-4 flex flex-col md:flex-row">
            <div className="w-36">
                <input
                    data-testid={inputTestId()}
                    className="my-2 align-top cursor-pointer"
                    type="checkbox"
                    id={optionId}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onClick}
                />
                <label
                    data-testid={labelTestId()}
                    className="m-1 align-middle text-base cursor-pointer"
                    htmlFor={optionId}
                >
                    {label}
                </label>
            </div>

            <div className="flex flex-1">{checked && child}</div>
        </li>
    );
}

export default CheckBoxOption;
