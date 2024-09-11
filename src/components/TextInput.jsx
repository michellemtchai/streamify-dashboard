import { useState, useEffect } from 'react';
import Input from './Input';

function TextInput({ id, defaultValue, setInput, updateValue }) {
    let [value, setValue] = useState('');
    const onChange = (event) => {
        let newVal = event.target.value;
        setValue(newVal);
        setInput(newVal);
    };
    const onBlur = () => {
        updateValue(value);
    };
    useEffect(() => {
        setValue(defaultValue ?? value);
        setInput(value);
        updateValue(value);
    }, [defaultValue]);
    return (
        <Input
            type="text"
            className="mx-4 py-none border border-slate-300 border-2 solid flex-1 top-1 relative"
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
