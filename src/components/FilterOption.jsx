import { useState } from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

function FilterOption({
    id,
    value,
    label,
    setValue,
    setSelected,
    type,
    defaultValue,
    selected,
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
        if (selected) {
            setValue(value, input);
        }
    };
    const renderInput = () => {
        switch (type) {
            case 'string':
                return (
                    <TextInput
                        id={optionId}
                        setInput={setInput}
                        updateValue={updateValue}
                        defaultValue={defaultValue}
                    />
                );
            case 'number':
                return (
                    <NumberInput
                        id={optionId}
                        setInput={setInput}
                        updateValue={updateValue}
                        defaultValue={defaultValue}
                    />
                );
            case 'date':
                return <span></span>;
        }
    };
    return (
        <tr className="mx-4 flex flex-1">
            <td className="w-36">
                <input
                    className="h-8 m-1 align-middle cursor-pointer"
                    type="checkbox"
                    id={optionId}
                    name={id}
                    value={value}
                    defaultChecked={selected}
                    onClick={onClick}
                />
                <label
                    className="h-8 align-middle text-base cursor-pointer"
                    htmlFor={optionId}
                >
                    {label}
                </label>
            </td>
            <td className="flex flex-1">{selected && renderInput()}</td>
        </tr>
    );
}

export default FilterOption;
