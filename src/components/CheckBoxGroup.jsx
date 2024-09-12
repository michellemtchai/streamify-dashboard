import { useState } from 'react';
import CheckBoxOption from './CheckBoxOption';

function CheckBoxGroup({
    name,
    labels,
    defaultValue,
    updateValue,
    components,
}) {
    let [selected, setSelected] = useState([]);
    let [inputs, setInputs] = useState({});

    const setValue = (index, input) => {
        let newVal = { ...inputs, [index]: input };
        setInputs(newVal);
        updateValue({ selected, inputs: newVal });
    };

    const onClick = (index) => {
        let copy = [...selected];
        if (selected.includes(index)) {
            let elementIndex = selected.indexOf(index);
            copy.splice(elementIndex, 1);
        } else {
            copy.push(index);
        }
        setSelected(copy);
    };

    return (
        <ul className="mx-4 block">
            {labels.map((entry, index) => (
                <CheckBoxOption
                    key={`${name}-${index}`}
                    id={`${name}-${index}`}
                    name={name}
                    label={entry}
                    value={index}
                    checked={selected.includes(index)}
                    child={components[index](
                        `${name}-${index}-child`,
                        (value) => setValue(index, value, inputs[index]),
                    )}
                    setValue={setValue}
                    setSelected={onClick}
                />
            ))}
        </ul>
    );
}

export default CheckBoxGroup;
