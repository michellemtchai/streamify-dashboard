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
        console.log('value', value);
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
        <li className="mx-4">
            <label
                className="w-36 h-8 align-middle text-base cursor-pointer"
                htmlFor={optionId}
            >
                <input
                    className="h-8 m-1 align-middle cursor-pointer"
                    type="checkbox"
                    id={optionId}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onClick}
                />
                {label}
            </label>
            <div className="flex flex-1">{checked && child}</div>
        </li>
    );
}

export default CheckBoxOption;
