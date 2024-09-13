import React, { useState, useEffect } from 'react';

function TextInput({ id, defaultValue, updateValue }) {
    let [value, setValue] = useState('');
    const onChange = (event) => {
        let newVal = event.target.value;
        setValue(newVal);
    };
    const onBlur = () => {
        updateValue(value);
    };
    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        } else {
            updateValue(value);
        }
    }, [defaultValue]);
    return (
        <input
            type="text"
            className="rounded px-1 mx-4 py-none border border-slate-300 border-2 solid flex-1 top-1 relative"
            placeholder="Filter query..."
            id={`${id}-text-input`}
            name={id}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
        />
    );
}

export default TextInput;
