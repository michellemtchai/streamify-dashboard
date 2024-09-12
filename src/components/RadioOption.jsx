function RadioOption({ id, name, value, label, checked, onChange, child }) {
    return (
        <tr>
            <td className="my-2 w-40">
                <label className="h-8 align-middle cursor-pointer" htmlFor={id}>
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
            </td>
            <td>{checked && child}</td>
        </tr>
    );
}

export default RadioOption;
