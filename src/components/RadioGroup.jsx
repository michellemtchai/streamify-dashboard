import RadioOption from './RadioOption';

function RadioGroup({ name, data, defaultValue, updateValue, components }) {
    const onChange = (event) => {
        let value = event.target.value;
        updateValue(value);
    };
    return (
        <table className="my-2">
            <tbody>
                {data.map((entry, index) => (
                    <RadioOption
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
            </tbody>
        </table>
    );
}

export default RadioGroup;
