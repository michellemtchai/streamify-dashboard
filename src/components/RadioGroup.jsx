import React from 'react';
import RadioOption from './RadioOption';

function RadioGroup({
    testId,
    name,
    data,
    defaultValue,
    updateValue,
    components,
}) {
    const onChange = (event) => {
        let value = event.target.value;
        updateValue(value);
    };
    return (
        <ul data-testid={testId} className="my-2 flex-1">
            {data.map((entry, index) => (
                <RadioOption
                    testId={`${testId}-option-${index}`}
                    key={`${name}-${index}`}
                    id={`${name}-${index}`}
                    name={name}
                    label={entry}
                    value={index}
                    onChange={onChange}
                    checked={defaultValue == index}
                    child={components[index]}
                />
            ))}
        </ul>
    );
}

export default RadioGroup;
