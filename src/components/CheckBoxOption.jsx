import { useState } from 'react';
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
    return (
        <li className="mx-4 flex">
            <input
                className="h-full my-3 align-top cursor-pointer"
                type="checkbox"
                id={optionId}
                name={name}
                value={value}
                checked={checked}
                onChange={onClick}
            />
            <label
                className="m-1 w-36 align-middle text-base cursor-pointer"
                htmlFor={optionId}
            >
                {label}
            </label>
            <div className="flex flex-1">{checked && child}</div>
        </li>
    );
}

export default CheckBoxOption;
