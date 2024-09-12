function RadioOption({ id, name, value, label, checked, onChange, child }) {
    return (
        <li className="flex flex-1">
            <label
                className="my-2 w-40 h-8 align-middle cursor-pointer"
                htmlFor={id}
            >
                <input
                    className="h-8 mx-2 align-middle cursor-pointer"
                    type="radio"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked}
                />
                {label}
            </label>
            <div className="flex-1 my-3">{checked && child}</div>
        </li>
    );
}

export default RadioOption;
